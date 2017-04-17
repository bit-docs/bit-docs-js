var tags = require("./tags/tags");
var processJavaScript = require("./process/javascript");
var path = require("path");

/**
 * @module {function} bit-docs-js
 * @parent plugins
 * @group bit-docs-js/tags
 *
 * @description A collection of tags, templates, and basic styles for JavaScript applications.
 *
 * @param {Object} [bitDocs] The configuration object passed by `bit-docs` at runtime. 
 * 
 * @body
 *
 * This plugin registers onto these hooks:
 *   - tags
 *   - processor
 *   - html
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
