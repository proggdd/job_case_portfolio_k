import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Модель данных — DESIGN.md, раздел 3 «Модель данных кейса».
// slug сознательно не в схеме: id страницы берётся из имени файла
// (Content Layer API, известная ловушка Astro 6/7 — slug заменён на id).
// video / poster / images — опциональны на MVP: медиа появится в Ф6.
const works = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/works' }),
	schema: z.object({
		title: z.string(),
		year: z.number(),
		summary: z.string(),
		role: z.string(),
		segment: z.string(),
		video: z.string().optional(),
		poster: z.string().optional(),
		images: z.array(z.string()).optional().default([]),
		featured: z.boolean(),
		order: z.number(),
	}),
});

export const collections = { works };
