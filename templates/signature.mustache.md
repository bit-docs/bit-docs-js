@parent bit-docs-js/theme
@module bit-docs-js/site/templates/signature.mustache signature.mustache

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
