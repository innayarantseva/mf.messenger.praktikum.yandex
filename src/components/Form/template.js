export const formTemplate = `<form class="form">
    {{#formfields}}
        {{> Formfield}}
    {{/formfields}}

    <div class="form__error"></div>

    {{> Button submitButton }}
</form>`;

export const template = `<form class="form">
    {{fields}}

    <div class="form__error"></div>

    {{button}}
</form>`;
