# Конвертер валют

## [Онлайн пример на Codesandbox](https://codesandbox.io/s/github/GamaRayL/simple-currency-converter/?file=/src/App.tsx)

## Стек технологий

React, Typescript, Material UI

#### Использованы хуки:

useState, useEffect

## Описание

- Валюта конвертится при вводе цифр в поле "Ввести сумму"
- По стандарту валюта в которую конвертится зависит от языка браузера (взаимодействует с API, что преобразует код - языка в код валюты)
- Кнопка "Swap" меняет выбранные валюты между собой
- API взят с https://github.com/fawazahmed0/currency-api. Запросы проходят без лимита
- Флаг (в меню выбора валюты) получает класс из хардкода и отражает его
- При получении ошибки с API запроса обновляется страница и выводит ошибку

## Запуск

- Прежде нужно установить зависимости `npm install` `ом
- Далее запуск приложения происходит обычным `npm start` в режиме разработки
- Для его просмотра откройте http://localhost:3000 в своём браузере
- Страница будет перезапускаться, когда вы вносите изменения
- Вы также можете увидете ошибки в консоли


