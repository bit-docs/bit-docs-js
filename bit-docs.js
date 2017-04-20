var tags = require("./tags/tags");
var processJavaScript = require("./process/javascript");
var path = require("path");

/**
 * @module {function} bit-docs-js
 * @parent plugins
 *
 * @description A collection of tags, templates, and basic styles for JavaScript applications.
 *
 * @body
 *
 * TBD
 */
module.exports = function(bitDocs){
    // register your tags
    bitDocs.register("tags", tags);
    bitDocs.register("processor", processJavaScript);

    bitDocs.register("html", {
        templates: path.join(__dirname, "templates")
    });

};
