import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Модель данных — DESIGN.md, раздел 3 «Модель данных кейса».
// slug сознательно не в схеме: id страницы берётся из имени файла
// (Content Layer API, известная ловушка Astro 6/7 — slug заменён на id).
// video / poster / images — опциональны на MVP: медиа появится в Ф6.

/*
 * Тело страницы кейса — массив блоков, решение 02.09.2026 (DESIGN.md §3,
 * «Тело кейса — массив блоков, а не markdown»). Макет [552:1006] требует
 * тёмных карточек-цитат и панелей с рядами экранов; в чистом markdown они
 * не выражаются, а MDX означал бы новую зависимость и новую сборку.
 *
 * Размечено полем type через discriminatedUnion, а не по наличию полей:
 * так zod сообщает об опечатке в типе строкой «invalid discriminator»
 * вместо каскада ошибок по каждому необязательному полю.
 *
 * Кейс без blocks рендерится по-старому, из markdown-тела. Это не
 * переходная мера, а страховка: второй кейс (jobs) свою структуру ещё
 * не получил, и ломать его ради первого нельзя.
 */
const caseBlock = z.discriminatedUnion('type', [
	// Заголовок раздела 32 плюс абзац и/или маркированный список 20.
	// Без body и без items — одиночный заголовок («Финальный дизайн»,
	// «Гипотезы»): в макете за ним сразу идут карточки или сценарии.
	z.object({
		type: z.literal('section'),
		title: z.string(),
		body: z.string().optional(),
		items: z.array(z.string()).optional(),
	}),
	// Тёмные карточки-цитаты, по две в ряд.
	z.object({
		type: z.literal('cards'),
		items: z.array(z.string()),
	}),
	// Тёмная панель с рядом экранов приложения.
	z.object({
		type: z.literal('screens'),
		screens: z.array(z.string()),
		// Подпись для доступности: попадает в alt каждого экрана.
		// Без неё alt собирается из title кейса.
		label: z.string().optional(),
	}),
	// Сценарий: подзаголовок 22, абзац 20 и панель экранов под ними.
	z.object({
		type: z.literal('scenario'),
		title: z.string(),
		body: z.string(),
		screens: z.array(z.string()).default([]),
	}),
]);

const works = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
	schema: z.object({
		title: z.string(),
		// Заголовок страницы кейса, когда он не совпадает с подписью в ленте.
		// В макете это разные строки: карточка на главной [561:8023] говорит
		// «Цифровая аренда автомобилей IQ AUTO», H1 страницы [530:7114] —
		// «Цифровая аренда автомобилей премиум-класса». Не дубль, а два разных
		// обещания: в ленте важно имя продукта, на странице — его суть.
		// Пусто — берётся title.
		heading: z.string().optional(),
		year: z.number(),
		summary: z.string(),
		role: z.string(),
		segment: z.string(),
		video: z.string().optional(),
		poster: z.string().optional(),
		images: z.array(z.string()).optional().default([]),
		featured: z.boolean(),
		order: z.number(),
		// Строка «Время прочтения кейса ~7 минут» под hero-медиа, узел
		// [552:5599]. Необязательная: у кейса без неё блок просто не рисуется,
		// а вертикальный ритм собирается из flex-gap и не оставляет дыры.
		readingTime: z.string().optional(),
		blocks: z.array(caseBlock).optional().default([]),
	}),
});

export const collections = { works };
