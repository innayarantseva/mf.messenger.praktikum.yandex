export const template = `<section class="chat-settings__layout">
    <header class="chat-settings__header">
        <h3 class="chat-settings__title">{{title}}</h3>
        <aside>
            {{avatar}}
        </aside>
    </header>

    <main>
        <section class="chat-settings__section">
            <h4 class="chat-settings__section-title">Участники чата</h4>
            <ul class="chat-settings__users">
                {{usersList}}
            </ul>
        </section>

        <section class="chat-settings__section">
            {{addUserContainer}}
        </section>
    </main>
</section>`;

export const searchUserTemplate = `<div>
    <h4 class="chat-settings__section-title">Добавить нового участника</h4>
    {{searchUserForm}}
</div>`;

export const foundUsersTemplate = `<div>
    <h4 class="chat-settings__section-title">По запросу нашлись:</h4>
    <ul class="chat-settings__users">
        {{foundUsers}}
    </ul>
    {{cancelButton}}
</div>`;

export const chatUserTemplate = `<div class="chat-user__layout">
    {{avatar}}

    <div>{{name}}</div>

    <div class="chat-user__action chat-user__action-disabled-{{disabled}}">{{action}}</div>
</div>`;