#graffiti_map [![Build Status](https://travis-ci.org/stleon/graffiti_map.svg?branch=master)](https://travis-ci.org/stleon/graffiti_map) [![Coverage Status](https://coveralls.io/repos/stleon/graffiti_map/badge.svg?branch=travis_notifications&service=github)](https://coveralls.io/github/stleon/graffiti_map?branch=travis_notifications)

##Основная идея
Вы можете размещать фото граффити на карте и добавлять к этому фото географические координаты. Также есть карта со всеми граффити, которые добавили другие люди.

Проще говоря, **graffiti_map** - это:

- Способ самовыражения
- Энциклопедия местного стритарта
- Живой город
- Идеи, эмоции
- Маршруты прогулок (для туристов тоже)

Приложение создано при поддержке [Теплицы социальных технологий](http://te-st.ru). На хакатоне «Делай Город» проекту было присуждено первое место - [анонс](http://te-st.ru/2015/06/02/make-city-hackathon-results/).

На данный момент ведется активная разработка, **graffiti_map** будет интегрирована с [Партизанинг](http://partizaning.org) (cайт об уличном искусстве, городе и человеческих взаимодействиях).

##Демо

Видео

Больше роликов на нашей странице

##Запросы к API

Данные **graffiti_map** могут быть использованы абсолютно всеми. Они нужны, например, для генерации карт или сбора любой другой стастики.

###Общая информация

- В ответе получаете **JSON**
- Разрешено 10 запросов в минуту

###Условные обозначения

- `req_to_server` - запрос от клиента к серверу
- `res_to_client` - ответ от сервера клиенту

###Техническая информация

Для использования **API** следует использовать соединение по **http** протоколу по адресу:

```
http://site.ru/api/
```

###Описание методов API

####api

Возвращает список методов для работы с данными **graffiti_map**:

```
//req_to_server

GET http://site.ru/api/

//res_to_client
{
    "graffities": "http://site.ru/api/graffities/"
}
```

####graffities

Возвращает список граффити, на данный момент без **pagination**:

```
//req_to_server

GET http://site.ru/api/graffities/

//res_to_client
[
    {
        "id": 1,
        "photo": "http://site.ru/datastore/users_img/6dae1362-11d5-4c7e-95a4-ed59a6297804.jpg",
        "name": "Test name",
        "comment": "Test comment",
        "lat": 55.739701,
        "lon": 37.664635,
        "graffiti_type": "gr",
        "date_created": "2015-06-28T15:24:35.869411Z",
        "date_updated": "2015-06-28T15:24:35.869528Z"
    }
]
```

##Sitemap

Карта сайта (нужна для поисковиков) генерируется автоматически и доступна по адресу `/sitemap.xml`.

Используется [индексный файл sitemap](http://www.sitemaps.org/ru/protocol.html#index).

##Участие в разработке

Чтобы ваш **pull request** был принят, нужно чтобы он соответствовал следующим правилам:

- Прежде чем приступать к работе, ее надо обсудить
- Каждый патч должен делать одно логическое изменение
- Код должен быть оформлен по PEP 8. 4 пробела, а не табы
- Код должен тестироваться. 100% покрытие не нужно, но лениться тоже не надо

##Что дальше

Нам очень нужен грамотный **Front-end Developer**!

Bootstrap - это хорошо, но я ниразу не дизайнер, так что если кто захочет нарисовать крутой дизайн, сверстайте его, пожалуйста.

##Инструкции по локальному запуску

Ниже описаны действия для людей, которые не знают о **git clone** и т.д.

Если вы захотели потестрировать у себя дома, то вот последовательность действий (для версий выше **0.0.1**):

- Установаем [Python](https://www.python.org/downloads/), не ниже версии 3.5
- Устанавливаем [Redis](http://redis.io) и настраиваем **conf**-файл, в зависимости от своей машины и предпочтений. Запускаем **Redis** командой `redis-server ~/redis.conf`, где **~/redis.conf** - пример пути до файла конфигурации.
- Скачиваем последнюю версию **graffiti_map**. [Стабильная](https://github.com/stleon/graffiti_map/archive/master.zip). Или выбираете интересующую вас ветку из [списка](https://github.com/stleon/graffiti_map/branches), щелкаете на нее и жмете **Clone in Desktop** или **Download ZIP** (не забудьте разархивировать)
- Далее, в зависимости от того, что вы будете использовать - .bashrc, .bash_profile, .profile или [venv](https://docs.python.org/3/library/venv.html), надо сохранить системные переменные.

Если используете последний вариант, то в терминале/командной строке переходите в директорию проекта:

```
cd Downloads/graffiti_map // мой вариант, у вас может отличаться
pyvenv env
```

Все дальнейшие действия делаются именно в терминале/командной строке из папки проекта.

Добавляем системные переменные в  **env/bin/activate** (не забываем записать свои значения):

```
export SECRET_KEY=key
export DB_NAME=name
export DB_USER=user
export DB_PASSWORD=pass
export DB_HOST=host
export DB_PORT=port
export RECAPTCHA_PUBLIC_KEY=key
export RECAPTCHA_PRIVATE_KEY=key
export MANDRILL_API_KEY=key
export ADMIN_URL='url'
export THUMBNAIL_REDIS_HOST=host
export THUMBNAIL_REDIS_PORT=port
export THUMBNAIL_REDIS_DB=0-16
export THUMBNAIL_REDIS_PASSWORD=pass
export SESSION_REDIS_HOST=host
export SESSION_REDIS_PORT=port
export SESSION_REDIS_DB=0-16
export SESSION_REDIS_PASSWORD=pass
export SESSION_REDIS_PREFIX=prefix
export SERVER_IP=ip
```
- надо создать свой **redis.conf**
- Активируем виртуальное окружение `source env/bin/activate`
- Выполняем `pip install -r requirements.txt`
- После этого надо выполнить `python manage.py migrate`, `python manage.py createsuperuser`
- Открываем файл **settings.py** и проверяем **DEBUG = True**
- Если во всех пунктах ошибок не возникло, то `python manage.py runserver`
- Читаете внимательно лог, скорее всего в браузере ресурс будет доступен по адресу `http://127.0.0.1:8000`

На каждой платформе могут быть свои специфические ситуации, если что-то не завелось, гуглите, а если не помогло, пишите в [Issues](https://github.com/stleon/graffiti_map/issues).

##Рекомендации по установке на production

По поводу деплоя - это отдельная тема, и обязателен к прочтению весь раздел [Deploying Django](https://docs.djangoproject.com/en/1.8/howto/deployment/).

Рекомендуется использовать **uWSGI** + **nginx-full**, не забываем правильно настроить фаервол.

Во всем остальном инструкции одинаковые с локальным запуском, желательно установить **git** на сервер и, например, **redis** запускать в качестве демона.

Вы можете разместить все на одном сервере, или использовать несколько серверов. На данный момент нагрузка на проект небольшая, поэтому сейчас не используются распределенные асинхронные очереди заданий, однако, их можно было бы использовать, например, при загрузке и обработке изображений.

Поэтому при выборе технологий, инстансов и всего прочего - исходите из вопроса, какая будет нагрузка и сколько вы готовы отдать за хостинг или за улучшение кода.

##FAQ

###У меня есть идея/найденный баг/вопрос. Куда мне обратиться?

Для этого есть [Issues](https://github.com/stleon/graffiti_map/issues). Изучите уже созданные, добавляйте свои, старайтесь использовать развернутое описание, чтобы можно было понять, чего вы хотите.

##Что было сделано

###Релиз 1.0.2

Добавлена интеграция с:

- [x] [Travis CI](https://travis-ci.org)
- [x] [Coveralls](https://coveralls.io)

Зависимости обновлены:

- [x] Python 3.5
- [x] Django 1.8.6

###Релиз 1.0.1

- [x] Логотип Теплицы Социальных Технологий в футере
- [x] Дополнения по установке на продакшн
- [x] Унификация вывода формата координат
- [x] Определение текущей гео-позиции
- [x] Уведомление о возможности загрузки только **jpg**-изображений
- [x] Новые категории граффити
- [x] Отправка оповещений модераторам с ссылкой на администраторский интерфейс

###Релиз 1.0.0

- [x] Переход с Bottle на **Django**
- [x] Настройка раздела администрирования
- [x] Страница добавления граффити (карта и форма)
- [x] Добавление **Google ReCaptcha** на форму добавления граффити
- [x] API для чтения (get) информации о всех граффити
- [x] Автоматически генерируемый **sitemap**
- [x] Интеграция с [Mandrill](http://habrahabr.ru/post/256055/) для отправки уведомлений (если что-то поломалось и когда добавлены новые граффити)
- [x] Отображение карты при в админке при добавлении/редактировании граффити
- [x] Код вставки карты на свой сайт/блог
- [x] Конвертация фото граффити в jpg с максимальной шириной 1024
- [x] Легальные/Нелегальные граффити

###Релиз 0.0.1

![С хакатона](https://raw.githubusercontent.com/stleon/stleon.github.io/master/downloads/graffiti.png)

За время хакатона реализовано:

- Список граффити, сортируются по дате добавления
- Страница граффити с комментариями от Disqus
- Карта с кластеризацией на основе Yandex Maps API

Использовались:

- Python 3
- Bottle
- Pony ORM
- Bootstrap
- Yandex Maps API

##Пожертвования

**graffiti_map** является результатом многочисленных часов работы энтузиастов. Проект некоммерческий и хостинг мы оплачиваем сами. Если вы оценили нашу работу, и вы хотите поддержать **graffiti_map**, пожалуйста, подумайте о [внесении пожертвований](http://yasobe.ru/na/graffiti_map).

##Лицензия

Copyright © 2015 by Tonkikh Lev Igorevich. All rights reserved.

Эта программа является свободным программным обеспечением; вы можете распространять и/или изменять его в соответствии с условиями GNU General Public License, опубликованной Фондом свободного программного обеспечения, Версия 3 (или более поздней) с уточнениями и исключениями, описанными в файле лицензии. Это гарантирует ваше право использовать, модифицировать и распространять это программное обеспечение при определенных условиях.

Также желательно указывать ссылку на данный репозиторий.

##Разработчики

- [ST LEON](mailto:leonst998@gmail.com) ([@STLEON](https://twitter.com/inquisb))

##
