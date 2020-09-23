export const errorTemplate = `<section class="error__layout">
    <nav>
        <a href="{{navLink.href}}">{{navLink.text}}</a>
    </nav>
    <main class="error__message">
        <h5 class="error__message-heading">{{code}}</h5>
        <p class="error__message-text">{{message}}</p>
    </main>
</section>`;