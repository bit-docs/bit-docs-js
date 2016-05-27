var tags = require("./tags/tags");
var processJavaScript = require("./process/javascript");
module.exports = function(bitDocs){
    // register your tags
    bitDocs.register("tags", tags);
    bitDocs.register("process", processJavaScript);

    var dependencies = {},
        pack = require("./package.json");
    dependencies[pack.name] = pack.version;

    bitDocs.register("html", {
        dependencies: dependencies,
        templates: __dirname+"/templates"
    });

});
