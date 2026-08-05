/*
 * Единая склейка путей с базовым адресом сайта.
 *
 * Причина существования файла: сайт живёт в подкаталоге
 * (`base: '/job_case_portfolio_k'`), и `import.meta.env.BASE_URL` отдаёт
 * этот путь БЕЗ завершающего слеша. Наивная склейка `${base}media/x.webp`
 * даёт `/job_case_portfolio_kmedia/x.webp` — молчаливый 404 на проде при
 * полностью рабочей локальной сборке. Ровно это и случилось 05.08.2026
 * с обложками кейсов, переходами между кейсами и фавиконками.
 *
 * Правило проекта: ни один компонент не склеивает пути сам — только через
 * withBase(). Тогда ошибка исправляется в одном месте, а не в шести.
 */

/** Базовый путь, всегда с завершающим слешем. */
export const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

/**
 * Превращает путь из данных или разметки в адрес, пригодный для прода.
 * Ведущий слеш во входном пути допускается и срезается.
 */
export function withBase(path: string): string;
export function withBase(path: undefined): undefined;
export function withBase(path?: string): string | undefined;
export function withBase(path?: string): string | undefined {
	if (path === undefined || path === null) return undefined;
	// Пустая строка — валидный вход: это ссылка на корень сайта.
	// Проверка на falsy здесь была дефектом: href у кнопок «На главную»
	// не рендерился вовсе, и ссылки не работали (найдено 05.08.2026).
	return `${base}${path.replace(/^\//, '')}`;
}
