export const formfieldTemplate = `<label class="formfield">
    <span class="formfield__label">{{label}}</span>
    <input class="formfield__input" type="{{type}}" placeholder="{{placeholder}}" value="{{value}}" data-field-name="{{field}}" required={{isRequired}}>
    <div class="formfield__error"></div>
</label>`;