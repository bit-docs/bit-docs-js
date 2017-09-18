var tags = require("./tags/tags");
var processJavaScript = require("./process/javascript");
var path = require("path");

/**
 * @parent bit-docs-js/modules
 * @module {bit-docs/types/plugin} bit-docs-js/bit-docs
 *
 * @description Register hooks to add tags, templates, and basic styles useful
 * for documenting JavaScript.
 * 
 * @signature `jsPlugin(bitDocs)`
 * 
 * @param {Object} bitDocs Configuration object with a `register` method.
 * 
 * @body
 * 
 * ## Use
 * 
 * Registers onto these hooks:
 *   - `tags`
 *   - `processor`
 *   - `html`
 * 
 * ### Tags
 * 
 * Registering the `tags` hook adds JavaScript-related tags:
 *   - [bit-docs-js/tag/function]
 *   - [bit-docs-js/tags/module @module]
 *   - [bit-docs-js/tags/option @option]
 *   - [bit-docs-js/tags/param @param]
 *   - [bit-docs-js/tags/property @property]
 *   - [bit-docs-js/tags/prototype @prototype]
 *   - [bit-docs-js/tags/return @return]
 *   - [bit-docs-js/tags/signature @signature]
 *   - [bit-docs-js/tags/typedef @typedef]
 * 
 * ### Processor
 * 
 * Registering the `processor` hook adds a processor for `*.js` files that gets
 * code comments in JavaScript, and processes tags like `@function` and
 * `@param` into [bit-docs/types/docObject]s that are subsequently added to the
 * [bit-docs/types/docMap].
 *
 * Comments above functions that do not include [bit-docs-js/types/tag]s
 * will still be processed as [bit-docs-js/types/tagBlock]s as the processor
 * extracts basic signature information such as parameters and/or return type
 * from the [bit-docs-js/types/codeLine].
 * 
 * ### HTML
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
