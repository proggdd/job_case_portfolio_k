// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { defineMdastPlugin } from 'satteri';
import { typo } from './src/lib/typo.ts';

/*
 * Неразрывные пробелы в markdown-теле кейса (<Content />) — DESIGN.md §2,
 * подраздел «Неразрывные пробелы» (02.09.2026), бриф P12-R2 §3.3.
 *
 * Собственный плагин AST, а не внешний пакет. Markdown в проекте рендерит
 * Sätteri (это и есть «Sätteri» из прежней заметки CLAUDE.md), у него свой
 * механизм плагинов вместо remark — visitor по типам узлов mdast. Пакеты
 * `@astrojs/markdown-satteri` и `satteri` уже стоят как процессор по
 * умолчанию; ничего не устанавливается.
 *
 * Visitor `text` не вызывается на `inlineCode` / `code` (у них свои ключи),
 * поэтому подсветка и код в бэктиках не трогаются. Та же чистая функция
 * typo(), что и в разметке, — правка переживает редактуру текстов
 * (`&nbsp;` руками не расставляем).
 */
const nbspMdastPlugin = defineMdastPlugin({
  name: 'nbsp-typo',
  text(node) {
    const next = typo(node.value);
    return next === node.value ? undefined : { ...node, value: next };
  },
});

// https://astro.build/config
export default defineConfig({
  site: 'https://proggdd.github.io',
  base: '/job_case_portfolio_k',

  markdown: {
    processor: satteri({ mdastPlugins: [nbspMdastPlugin] }),
  },

  build: {
    /*
     * Стили встраиваются в каждую страницу, а не подключаются отдельным файлом.
     * Правка 09.08.2026 по замечанию заказчика: при переходе по карточке
     * страница открывалась без стилей, пока её не обновишь.
     *
     * Причина не в коде. GitHub Pages отдаёт HTML с Cache-Control: max-age=600,
     * а имя файла стилей содержит хеш содержимого. Браузер держит HTML страницы
     * до десяти минут; если за это время выйдет новый деплой, старый CSS
     * удаляется, и закешированный HTML ссылается на файл, которого больше нет —
     * проверено, все прежние хеши отдают 404. Обновление страницы подтягивает
     * свежий HTML и всё чинит, отсюда и «пока не обновишь».
     *
     * Встроенные стили делают каждую страницу самодостаточной: устаревший HTML
     * остаётся рабочим, потому что несёт свои стили с собой. Цена — около 11 КБ
     * на страницу без общего кеша между страницами; на сайте из пяти страниц
     * это дешевле, чем сломанная вёрстка после каждого деплоя. Заодно уходит
     * один блокирующий отрисовку запрос.
     */
    inlineStylesheets: 'always',
  },
});
