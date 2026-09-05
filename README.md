# job_case_portfolio_k

Портфолио-сайт UX/UI-дизайнера: главная, страницы кейсов, контакты. Клиентский проект, разработка и деплой — мои.

**Живой сайт:** https://proggdd.github.io/job_case_portfolio_k

## Стек

- **Astro 7** — статическая генерация, content collections для кейсов
- **Собственный markdown-процессор** (`satteri`) с плагином расстановки неразрывных пробелов в русском тексте
- **CSS** без фреймворка, иконки `lucide` и `morphicons`
- **GitHub Actions** — сборка и публикация на GitHub Pages при пуше в основную ветку

## Структура

```
src/
  pages/          главная, контакты, страницы кейсов, 404
  content/        кейсы как content collection
  components/     переиспользуемые блоки
  layouts/        каркасы страниц
  data/           данные сайта
  lib/            утилиты
  styles/         стили
.github/workflows/deploy.yml   сборка и деплой на Pages
```

## Локальный запуск

```sh
npm install
npm run dev      # дев-сервер
npm run build    # продакшен-сборка в dist/
npm run preview  # локальный просмотр собранного
```

Требуется Node ≥ 22.12.

## Заметка

Контент кейсов принадлежит заказчику. Здесь публичны разработка, вёрстка и конвейер деплоя.
