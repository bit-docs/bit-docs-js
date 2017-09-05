var tags = require("./tags/tags");
var processJavaScript = require("./process/javascript");
var path = require("path");

/**
 * @module {function} bit-docs-js
 * @parent plugins
 * @group bit-docs-js/static static
 *
 * @description A collection of tags, templates, and basic styles for JavaScript applications.
 *
 * @body
 *
 * TBD
 */
module.exports = function(bitDocs){
    var pkg = require("./package.json");
    var dependencies = {};
    dependencies[pkg.name] = pkg.version;

    // register your tags
    bitDocs.register("tags", tags);
    bitDocs.register("processor", processJavaScript);

    bitDocs.register("html", {
        templates: path.join(__dirname, "templates"),
        dependencies: dependencies
    });
};
