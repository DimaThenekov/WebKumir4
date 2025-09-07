# webКумир
**webКумир** - ПО для проведения соревнования и обучения на языке программирования КуМир

# Ознакомительная версия

Вы можете посмотреть в демо режиме возможности системы:<br/>
https://dimathenekov.github.io/WebKumir4/project/index/login.html
<br/>
<br/>
В системе уже есть 2 аккаунта:<br/>
логин: `admin` <br/>
пароль: `test` <br/><br/>
логин: `user` <br/>
пароль: `pass`<br/>
<br/>
Так же есть возможность регистрации нового пользователя

В демо режиме рейтинг отображает только локальные результаты!

# Административная панель
Административная панель находится по адресу: <br/>
Для демо режима: https://dimathenekov.github.io/WebKumir4/project/index/editor/index.html<br/>
Для локального запуска: http://localhost/editor/index.html

# Запуск

### Способ 1 (Windows)
1. Скачать релиз Releases -> Source code (zip)
2. Разархивировать
3. Запустить AUTORUN.bat

### Способ 1 (Debian/Ubuntu/Fedora/RHEL/Arch Linux/openSUSE/macOS)
1. Скачать релиз Releases -> Source code (zip) / Source code (tar.gz)
2. Разархивировать
3. Запустить UNIX_AUTORUN

### Способ 2 (Если установлен Node.js)
1. Скачать релиз Releases -> Source code (zip) / Source code (tar.gz)
2. Разархивировать
3. Выполнить (cmd / bash):
```
node launcher_v2.js
```

### Способ 3 (Docker)
1. Скачать релиз Releases -> Source code (zip) / Source code (tar.gz)
2. Разархивировать
3. Выполнить (cmd / bash):
```
# Сборка образа из Dockerfile в текущей директории
docker build -t web-kumir .

# Создание директории для volume
mkdir data

# Запуск контейнера
docker run -d -p 80:80 -v data:/app/project --name webKumir web-kumir

# Для остановки контейнера (добавить в раздел):
docker stop webKumir
```

# Структура
- \/project – Рабочая папка со всеми файлами
    - \/index
        - \/editor
            - font-awesome_6-0-0.css
            - fil.html
            - index.html
            - map.html
            - project.html
            - settings.html
            - table-turnir.html
            - task.html
            - turnir.html
            - user.html
        - \/images
        - \/js
            - index.css
            - js.js – Всё связанное с клиентом, отрисовка карты + редактор и тд
            - kumir.js – Транслятор + лаунчер
            - kumir_helper.js – Все функции для лаунчера (подгружается динамически в kumir.js)
            - loader.js
            - login_css.css
            - login_js.js
            - select_server_css.css
            - select_server_js.js
        - \/lib – Библиотеки для редактора
            - codemirror.css
            - codemirror.js
            - codemirror2.js
            - FileSaver.js
            - jszip.js
            - lint.css
            - lint.js
            - match-highlighter.js
            - show-hint.css
            - show-hint.js
        - \/public_server
            - api.js
            - frontend_demo.js
            - sjot-fast.js
        - \/split – Используется в редакторе, возможно, будет удалено когда-нибудь
            - line.js
        - \/tileset – Файлы для клиента, изображения + видео
        - \/trackbar – Используется в редакторе, возможно, будет удалено когда-нибудь
            - boxsizing.htc
            - slider.js
            - winclassic.css
        - \/webfonts
            - fa-solid-900.woff2
        - index.html – Всё связанное с клиентом, отрисовка карты + редактор и тд
        - login.html – Тут и так всё понятно
        - register.html – Регистрация
        - select_server.html – Выбор сервера
        - top.html
        - whatisfine.html
        - whatissolution.html
    - all_data.json
    - all_data_backup.json
    - index.js
    - static_data.json
    - tester.js
    - version.json
- \/v3_to_v4
    - png-node.js
    - update.js
- \/.github
    - \/workflows
        - jekyll-gh-pages.yml
- .gitignore
- LICENSE
- README.md
- AUTORUN.bat
- UNIX_AUTORUN
- Dockerfile
- launcher_v2.js
- settings.json

# Лицензия
Данный проект лицензирован по лицензии MIT — подробности см. в файле LICENSE.

# Улучшения связаные с переходом V3 на V4
1. Возможность редактирования проектов (карт, задач, тестов).
2. Редактирование прав у групп пользователей.
3. Frontend demo режим, так как API написан на js.
4. Упрощение API.
5. Поддержка webSocket.
6. Node.js позволяет редактировать исходники в "полевых" условиях.
7. Отсутствие проблем связанных с многопоточностью.
8. Ускорение загрузки проекта в несколько раз.
