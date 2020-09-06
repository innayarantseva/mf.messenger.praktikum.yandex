export const messageTemplate = `<section class="message message_direction_{{direction}}">
    <div>
        {{#if asset}}
            <img class="message__image" src="{{asset.src}}" alt="{{asset.alt}}">
        {{/if}}
        <p class="message__text">{{text}}</p>
    </div>
    <aside class="message__aside">
        <time class="message__time">{{time}}</time>
    </aside>
</section>`;