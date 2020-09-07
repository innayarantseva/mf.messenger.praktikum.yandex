export const layoutTemplate = `<section class="authorization__layout">
    <h1 class="authorization__heading">{{heading}}</h1>

    {{> Form form }}

    <a class="authorization__secondary-action" href="{{secondaryAction.href}}">{{secondaryAction.text}}</a>
</section>`;