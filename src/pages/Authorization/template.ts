export const template = `<article class="authorization">
    <section class="authorization__layout">
        <h1 class="authorization__heading">{{heading}}</h1>

        {{ form }}

        <span class="authorization__secondary-action">
            <span class="authorization__secondary-action-desc">{{secondaryActionText}}</span>
            {{navLink}}
        </span>
    </section>
</article>`;