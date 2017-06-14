@parent bit-docs-js/templates
@page bit-docs-js/templates/signature signature

@description The function signature template.

@body

The `signature.mustache` template outputs a function signature.

For tips on adding this template to your custom theme, see
[bit-docs-generate-html/theme/templates/content].

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
