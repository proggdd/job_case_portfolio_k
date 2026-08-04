/*
 * Единый источник контактов — DESIGN.md §3 «Контакты — один источник».
 * Шапка и подвал читают отсюда, разметка не дублируется.
 * Реальных адресов ещё нет (K-2) — подстановка станет правкой этого файла.
 */

export interface Contact {
  /** Подпись пилюли */
  label: string;
  /** Адрес; заглушка "#" до ответа дизайнера (K-2) */
  href: string;
  /** Ведёт ли ссылка за пределы сайта (target="_blank" + пометка для скринридера) */
  external: boolean;
}

export const contacts: Contact[] = [
  { label: 'Телеграм', href: '#', external: true },
  { label: 'Email', href: '#', external: true },
  { label: 'Резюме', href: '#', external: true },
];
