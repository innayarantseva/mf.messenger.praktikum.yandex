export const formTemplate = `<form class="form">
    {{#formfields}}
        {{> Formfield}}
    {{/formfields}}

    <div class="form__error"></div>

    {{> Button submitButton }}
</form>`;