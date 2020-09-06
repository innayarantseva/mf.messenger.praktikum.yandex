export const layoutTemplate = `<section class="authorization__layout">
    <h1 class="authorization__heading">{{heading}}</h1>

    <form class="authorization__form">
        {{#formfields}}
            {{> Formfield}}
        {{/formfields}}

        <div class="authorization__error"></div>

        {{> Button submitButton }}
    </form>

    <a class="authorization__secondary-action" href="{{secondaryAction.href}}">{{secondaryAction.text}}</a>
</section>`;