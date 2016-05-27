var getParent = require("bit-docs-process-tags/get-parent");
var tnd = require("bit-docs-type-annotate").typeNameDescription;

module.exports = {
    codeMatch: function( code ) {
        return code.match(/(\w+)\s*[:=]\s*/) && !code.match(/(\w+)\s*[:=]\s*function\(([^\)]*)/);
    },
    code: function( code, scope, docMap ) {
        var parts = code.match(/(\w+)\s*[:=]\s*/);
        if ( parts ) {
            var parentAndName = getParent.andName({
                parents: "*",
                useName: ["constructor","static","prototype","function"],
                scope: scope,
                docMap: docMap,
                name: parts[1]
            });
            return {
                name: parentAndName.name,
                parent: parentAndName.parent,
                type: "property"
            };
        }
    },
    add: function(line, curData, scope, docMap){
        var data = tnd(line);
        this.types = data.types
        this.description = data.description;

        var parentAndName = getParent.andName({
            parents: "*",
            useName: ["constructor","static","prototype","function"],
            scope: scope,
            docMap: docMap,
            name: data.name
        });
        this.name = parentAndName.name;
        this.parent = parentAndName.parent;
        this.type = "property";
    },
    parentTypes: ["constructor"],
    useName: true
};
