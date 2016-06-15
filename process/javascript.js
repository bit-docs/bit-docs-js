var path = require("path");
var getComments =  require("./get_comments");
var processCodeAndComment = require("./code_and_comment");

// A processor function
module.exports = function(filename, source, docMap, siteConfig, addDocObjectToDocMap){

    // Make sure the extensions are right
    var extname = path.extname(filename).substr(1);
    if(!siteConfig.js) {
        siteConfig.js = {extensions: ["js"]};
    }
    if(!siteConfig.js.extensions) {
        siteConfig.js.extensions = ["js"];
    }

    var allowedExtensions = siteConfig.js.extensions;

    if( allowedExtensions.indexOf(extname) !== -1) {
        var scope = {
			type: "script",
			name: filename + ""
		};

        getComments(source).map(function(comment){
            processCodeAndComment({
                code: comment.code,
                comment: comment.comment,
                docMap: docMap,
                scope: scope,
                tags: siteConfig.tags,
                docObject: {src: {line: comment.line, codeLine: comment.codeLine, path: filename}}
            }, function(docObject, newScope){
                if(docObject) {
                    addDocObjectToDocMap(docObject);
                }
                if (newScope) {
        			scope = newScope;
        		}
            });
        });
        // prevents trying to process .js as something else
        return true;
    }

}
