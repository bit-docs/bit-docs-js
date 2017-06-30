var tags = require("./tags/tags");
var processJavaScript = require("./process/javascript");
var path = require("path");

/**
 * @parent plugins
 * @module {function} bit-docs-js
 * @group bit-docs-js/modules modules
 * @group bit-docs-js/tags tags
 * @group bit-docs-js/templates templates
 *
 * @description Tags, templates, and basic styles for JavaScript.
 *
 * @param {Object} [bitDocs] The configuration object passed by `bit-docs` at
 * runtime. 
 * 
 * @body
 * 
 * This plugin registers onto these hooks:
 *   - `tags`
 *   - `processor`
 *   - `html`
 * 
 * Registering the `tags` hook adds JavaScript-related tags:
 *   - [bit-docs-js/tags/codeend @codeend]
 *   - [bit-docs-js/tags/codestart @codestart]
 *   - [bit-docs-js/tags/function @function]
 *   - [bit-docs-js/tags/module @module]
 *   - [bit-docs-js/tags/option @option]
 *   - [bit-docs-js/tags/param @param]
 *   - [bit-docs-js/tags/property @property]
 *   - [bit-docs-js/tags/prototype @prototype]
 *   - [bit-docs-js/tags/return @return]
 *   - [bit-docs-js/tags/signature @signature]
 *   - [bit-docs-js/tags/static @static]
 *   - [bit-docs-js/tags/typedef @typedef]
 * 
 * Registering the `processor` hook adds a processor for `*.js` files that gets
 * code comments in JavaScript, and processes tags like `@function` and
 * `@param` into docObjects that are subsequently added to the docMap.
 *
 * The processor is also smart enough process regular comments above functions
 * that have not explicitly been documented with closure type annotations, and
 * extracts basic signature information such as parameters and/or return type.
 * 
 * Registering the `html` hook adds a mustache template used to generate the
 * HTML for the tags added by this plugin.
 */
module.exports = function(bitDocs){
    // register your tags
    bitDocs.register("tags", tags);
    bitDocs.register("processor", processJavaScript);

    bitDocs.register("html", {
        templates: path.join(__dirname, "templates")
    });

};
