/*
 * Единый источник контактов — DESIGN.md §3 «Контакты — один источник».
 * Шапка и подвал читают отсюда, разметка не дублируется.
 * Реальных адресов ещё нет (K-2) — подстановка станет правкой этого файла.
 */

/** Какой значок рисует ContactPills; сами пути — там же, в одном месте. */
export type ContactIcon = 'telegram' | 'email' | 'resume';

export interface Contact {
  /** Подпись пилюли */
  label: string;
  /** Адрес; заглушка "#" до ответа дизайнера (K-2) */
  href: string;
  /** Ведёт ли ссылка за пределы сайта (target="_blank" + пометка для скринридера) */
  external: boolean;
  /** Значок для режима без подписей (шапка), добавлено 09.08.2026 */
  icon: ContactIcon;
}

export const contacts: Contact[] = [
  { label: 'Телеграм', href: '#', external: true, icon: 'telegram' },
  { label: 'Email', href: '#', external: true, icon: 'email' },
  { label: 'Резюме', href: '#', external: true, icon: 'resume' },
];
