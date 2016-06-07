var tags = require("./tags/tags");
var processJavaScript = require("./process/javascript");
var path = require("path");

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
