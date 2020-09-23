export const template = `<section class="authorization__layout">
    <h1 class="authorization__heading">{{heading}}</h1>

    {{ form }}

    <span>
        <span>{{secondaryAction.info}}</span>
        <a class="authorization__secondary-action" href="{{secondaryAction.href}}">{{secondaryAction.linkText}}</a>
    </span>
</section>`;
