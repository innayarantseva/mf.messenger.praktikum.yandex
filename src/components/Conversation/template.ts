export const template = `<section class="conversation">
    <header class="conversation__header">
        <div>{{avatar}}</div>

        <div class="conversation__info">
            <h3 class="conversation__title">{{title}}</h3>
            <p class="conversation__users">{{users}}</p>
        </div>

        <div class="conversation__options">
            <div class="conversation__options-icon">
                <i class="material-icons">settings</i>
            </div>
        </div>
    </header>

    <main class="conversation__messages">
        <p class="sorry">
            Нам очень жаль, но переписываться пока что нельзя. У всего есть свои недостатки!
        </p>
    </main>

    <footer class="conversation__footer">
        <textarea class="conversation__new-message" placeholder="Напишите сообщение..."></textarea>

        <div class="conversation__send">
            <i class="material-icons">arrow_forward</i>
        </div>
    </footer>
</section class="">`;
