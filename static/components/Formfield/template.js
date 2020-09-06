export const formfieldTemplate = `<label class="formfield">
    <span class="formfield__label">{{label}}</span>
    <input class="formfield__input" type="{{type}}" placeholder="{{placeholder}}" value="{{value}}" required={{isRequired}}>
    {{#if error}}
        <div class="formfield__error">{{error}}</div>
    {{/if}}
</label>`;