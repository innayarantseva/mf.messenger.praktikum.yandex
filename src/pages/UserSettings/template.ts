// FIXME: убрать дублирование кода в параметрах
export const userSettingsTemplate = `<article class="user-profile">
    <section class="user-profile__layout">
        <nav>
            {{chatsLink}}
        </nav>

        <main class="user-profile__dashboard">
            <header class="user-profile__header">
                <div class="user-profile__user-data">
                    <h1 class="user-profile__heading">{{name}}</h1>
                    <h3 class="user-profile__name">{{displayName}}</h3>

                    <ul class="user-profile__options">
                        <li class="user-profile__option">
                            {{settingsLink}}
                        </li>
                        <li class="user-profile__option">
                            {{signInLink}}
                        </li>
                    </ul>
                </div>

                <aside>
                    {{avatar}}
                    <input class="user-profile__select-avatar-image" type="file" accept="image/jpeg">
                </aside>
            </header>

            <ul class="user-profile__parameters">
                <li class="user-profile__parameter">
                    <p class="user-profile__label">Логин</p>
                    <p class="user-profile__value">{{login}}</p>
                </li>
                <li class="user-profile__parameter">
                    <p class="user-profile__label">Почта</p>
                    <p class="user-profile__value">{{email}}</p>
                </li>
                <li class="user-profile__parameter">
                    <p class="user-profile__label">Телефон</p>
                    <p class="user-profile__value">{{phone}}</p>
                </li>
            </ul>
        </main>
    </section>
</article>`;

export const changeUserSettings = `<article class="user-profile">
    <section class="user-profile__layout">
        <nav>
            {{chatsLink}}
        </nav>

        <main class="user-profile__dashboard">
            <h1 class="user-profile__change-heading">Изменить данные</h1>
            {{ form }}
            {{profileLink}}
        </main>
    </section>
</article>`;