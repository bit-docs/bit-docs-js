@parent bit-docs-js/templates
@module bit-docs-js/templates/signature.mustache

@description The function signature template.

@body

The `signature.mustache` template outputs a function signature.

For tips on adding this template to your custom theme, see
[bit-docs-generate-html/site/default/templates/content.mustache].

You can use the following snippet:

```
{{#if signatures}}
    {{#each signatures}}
        {{> signature.mustache}}
    {{/each}}
{{else}}
    {{#types}}
        {{> signature.mustache}}
    {{/types}}
{{/if}}
```
