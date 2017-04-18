var tags = require("./tags/tags");
var processJavaScript = require("./process/javascript");
var path = require("path");

/**
 * @module {function} bit-docs-js
 * @parent plugins
 * @group bit-docs-js/tags tags
 *
 * @description Tags, templates, and basic styles for JavaScript.
 *
 * @param {Object} [bitDocs] The configuration object passed by `bit-docs` at runtime. 
 * 
 * @body
 * 
 * This plugin registers onto these hooks:
 *   - `tags`
 *   - `processor`
 *   - `html`
 * 
 * Registering the `tag` hook adds JavaScript-related tags:
 *   - [bit-docs-js/tags/function @function]
 *   - [bit-docs-js/tags/param @param]
 *   - [bit-docs-js/tags/signature @signature] (has mustache template)
 *   - ...
 * 
 * Registering the `processor` hook adds a processor for `*.js` files that gets
 * code comments in JavaScript, and processes tags like `@function` and `@param`
 * into docObjects that are subsequently added to the docMap. The processor is
 * also smart enough process regular comments above functions that have not
 * explicitly been documented with closure type annotations to extract basic
 * signature information such as parameters and return type.
 * 
 * Registering the `html` hook adds mustache templates used for generation of
 * HTML related to those tags added by this plugin. Currently it's one big
 * template used to nicely format all the tag information.
 */
module.exports = function(bitDocs){
    // register your tags
    bitDocs.register("tags", tags);
    bitDocs.register("processor", processJavaScript);

    var dependencies = {},
        pack = require("./package.json");
    dependencies[pack.name] = pack.version;

    bitDocs.register("html", {
        dependencies: dependencies,
        templates: path.join(__dirname, "templates")
    });

};
