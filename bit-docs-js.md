@parent plugins
@module bit-docs-js
@group bit-docs-js/types types
@group bit-docs-js/tags tags
@group bit-docs-js/templates templates
@group bit-docs-js/static static
@group bit-docs-js/modules modules

@description Plugin to process `.js` files and help document JavaScript code.

@body

## Use this plugin

Add this plugin to your project `package.json`:

```json
{
  "name": "my-project",
  ---snip---
  "bit-docs": {
    "dependencies": {
      ---snip---
      "bit-docs-js": "*",
      ---snip---
    },
    ---snip---
  }
}
```

Once added, this plugin allows you to document `.js` files like:

```js
/**
 * @module {{}} example/settings settings
 * @parent example
 * @option {String} environment Production, development, or staging.
 * @option {Number} requestTimeout How long to wait between requests.
 */
export default {
    environment: "production",
    requestTimeout: 100
}
```

 Using [bit-docs-js/templates/signature.mustache signature.mustache] in the
 [bit-docs-generate-html/site/default/templates/content.mustache default theme],
 this example renders like:

<img src="https://user-images.githubusercontent.com/990216/30096690-7e01d47c-929f-11e7-9eac-bbe97f4f1a7f.png" width="50%" />

### See next

- Back-end hooks: [bit-docs-js/bit-docs].
- Front-end assets: [bit-docs-js/index.js].
