# Cinema admin panel

## Запуск проекта

```
git clone https://github.com/sofialapteva/cinema-admin-panel
cd cinema-admin-panel
npm install
npm run dev
```

## Запуск тестов

```
git clone https://github.com/sofialapteva/cinema-admin-panel
cd cinema-admin-panel
npm install
npm run test
```

Или же, в случае наличествуюшей предварительной установки:

```
npm run test
```

## Структура сущностей

- фильм
  - id в базе данных
  - название
- категория
  - id в базе данных. Новые категории не имеют id (или id = null) до сохранения на сервере
  - название
  - массив подкатегорий
    - id в базе данных. Новые подкатегории не имеют id (или id = null) до сохранения на сервере
    - название
    - массив id фильмов отнесенных в эту подкатегорию
