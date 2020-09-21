export const userSettingsTemplate = `<section class="user-settings__layout">
    <nav>
        <a href="../ChatList/chatlist.html">← Все чаты</a>
    </nav>

    <main class="user-settings__dashboard">
        <header class="user-settings__header">
            <aside class="user-settings__avatar"></aside>

            <div class="user-settings__user-data">
                <h1 class="user-settings__heading">{{displayName}}</h1>
                <h3 class="user-settings__name">{{name}}</h3>

                <ul class="user-settings__options">
                    <li class="user-settings__option">
                        {{button}}
                    </li>
                    <li class="user-settings__option">
                        <a class="user-settings__log-out" href="../Authorization/authorization.html">Выйти</a>
                    </li>
                </ul>
            </div>
        </header>

        <ul class="user-settings__parameters">
            <li class="user-settings__parameter">
                <p class="user-settings__label">Логин</p>
                <p class="user-settings__value">{{login}}</p>
            </li>
            <li class="user-settings__parameter">
                <p class="user-settings__label">Почта</p>
                <p class="user-settings__value">{{email}}</p>
            </li>
        </ul>
    </main>
</section>`;

export const changeUserSettings = `<section class="user-settings__layout">
    <nav>
        <a href="../ChatList/chatlist.html">← Все чаты</a>
    </nav>

    <main class="user-settings__dashboard">
        <h1>Изменить данные</h1>
        {{ form }}
    </main>
</section>`;
