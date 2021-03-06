# Мессенджер

Самостоятельный учебный проект, выполненный в рамках [Яндекс.Практикума](https://praktikum.yandex.ru/), трек "Мидл фронтенд-разработчик". Цель проекта — научиться применять высокоуровневые технологии, зная, на чём они основаны.

Проект находится в стадии разработки 👩‍💻

Актуальная версия приложения задеплоена на [Хероку](https://praktikum-messenger.herokuapp.com/).

Старая версия приложения в виде статических шаблнов задеплоена на [Нетлифай](https://praktikum-messenger.netlify.app/).

### Локальный запуск проекта

```
git clone https://github.com/innayarantseva/mf.messenger.praktikum.yandex.git
cd mf.messenger.praktikum.yandex
npm i
npm run start:dev
```

После запуска приложение доступно на [http://localhost:4000/](http://localhost:4000/).

Другие полезные команды:

- `npm run build` — сборка проекта без запуска сервера.
- `npm run start:prod` — запуск сервера для раздачи статичных файлов из папки `dist`, сформированной в результате последней сборки.
- `npm run test` — запуск тестов.
- `npm run test:coverage` — запуск тестов с отчётом по покрытию.
- `npm run lint` — линтинг кода в директории `src`.
- `npm run lint:fix` — линтинг и автоматическое исправление кода в директории `src`.

### Использование проекта

<!-- Открыла репозиторий. Наверное, уже можно :) -->
Активные задачи к проекту находятся в [Issues](https://github.com/innayarantseva/mf.messenger.praktikum.yandex/issues). Добавляйте туда задачи и баг-репорты по проекту.

Активные ветки:
- `master`: основная ветка разработки. Релизы на Хероку происходят из этой ветки в ручном режиме.
- `deploy`: последняя версия статики, развёрнутая на Netlify

Остальные ветки являются временными, на время решения той или иной задачи.

Основная разработка ведётся в ветке `master`. Присылайте пулл-реквесты к этой ветке.

Деплой статики из ветки `deploy` осуществляется при любом обновлении ветки. Релизный процесс представляет из себя мёрж в ветку `deploy`.

Деплой Docker-образа с приложением на Хероку происходит в ручном режиме. Для деплоя необходимо выполнить следующие команды:

```
# пуш докер-образа из репозитория
heroku container:push web

# релиз версии
heroku container:release web

# открыть приложение
heroku open

# другие команды
heroku logs # посмотреть логи
heroku restart # перезапустить сервис
heroku releases # релизы
```

### Ход работы над проектом
#### Первый спринт
- Собрала прототипы со страницами приложения в [Фигме](https://www.figma.com/file/xBenYXJh9KhKgsoJy6NrWR/%D0%9C%D0%B5%D1%81%D1%81%D0%B5%D0%BD%D0%B4%D0%B6%D0%B5%D1%80?node-id=3%3A4)
- Сверстала статичные шаблоны страниц, используя только нативные HTML и CSS

#### Второй спринт
- Подключила шаблонизатор [Handlebars](https://handlebarsjs.com/) в виде статики, перевела свёрстанные шаблоны на него
- Провела рефакторинг нейминга: названия классов перевела из PascalCase в kebab-case
- Добавила валидацию форм

#### Третий спринт
- Настроила сборку проекта без использования бандлеров и сборщиков: на этапе сборки происходит транспиляция кода на Тайпскрипте и процессинг стилей с применением PostCSS, все файлы копируются в папку `dist`, из которой и раздаются статичные файлы
- Написала собственную, немного багованную реализацию блока и шаблонизатора. Перевела код на Тайпскрипт и блочную реализацию
- Добавила роутинг в проект
- Написала тесты к основной функциональности библиотеки

#### Четвёртый спринт
- Настроила сборку с помощью Вебпака, добавила основные инструменты для проверки стабильности и читаемости кода: eslint, stylelint, editorconfig, precommit с помощью husky
- Создала Docker-образ приложения и задеплоила его на Heroku

