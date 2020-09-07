export const userSettingsTemplate = `<section class="user-settings__layout">
    <nav>
        <a href="../ChatList/chatlist.html">← Все чаты</a>
    </nav>

    <main class="user-settings__dashboard">
        {{#if readMode}}
            <header class="user-settings__header">
                <aside class="user-settings__avatar"></aside>

                <div class="user-settings__user-data">
                    <h1 class="user-settings__heading">{{userData.displayName}}</h1>
                    <h3 class="user-settings__name">{{userData.firstName}} {{userData.lastName}}</h3>

                    <ul class="user-settings__options">
                        <li class="user-settings__option">
                            <a class="user-settings__change-data" href="#">Изменить данные</a>
                        </li>
                        <li class="user-settings__option">
                            <a class="user-settings__log-out" href="../Authorization/authorization.html">Выйти</a>
                        </li>
                    </ul>
                </div>
            </header>
        {{else}}
            <h1 class="user-settings__heading user-settings__change-heading">Изменить данные</h1>
        {{/if}}

        {{#if readMode}}
            <ul class="user-settings__parameters">
                <li class="user-settings__parameter">
                    <p class="user-settings__label">Логин</p>
                    <p class="user-settings__value">{{userData.login}}</p>
                </li>
                <li class="user-settings__parameter">
                    <p class="user-settings__label">Почта</p>
                    <p class="user-settings__value">{{userData.email}}</p>
                </li>
            </ul>
        {{else}}
            {{> Form form }}

            <a class="user-settings__cancel-data-change" href="#">Отмена</a>
        {{/if}}
    </main>
</section>`;