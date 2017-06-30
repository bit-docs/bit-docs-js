var getParent = require("bit-docs-process-tags/get-parent");
var tnd = require("bit-docs-type-annotate").typeNameDescription;

var funcMatch = /(?:([\w\.\$]+)|(["'][^"']+["']))\s*[=]\s*function\s?\(([^\)]*)/;
var codeMatch = /([\w\.\$]+?).extend\(\s*["']([^"']*)["']/;

/**
 * @parent bit-docs-js/tags
 * @module {bit-docs-process-tags/tag} bit-docs-js/tags/class @class
 * @hide
 * 
 * DEPRECATED: Gets converted to [bit-docs-js/tags/constructor].
 *
 * @signature `@class NAME [TITLE]`
 */
module.exports = {
	add: function(line, curData, scope, docMap){
		console.warn("Using the @class directive.  It is deprecated!");
		// it's possible this has already been matched as something else
		// ... clear parent

		this.type = "constructor";
		var data = tnd(line);
		if(data.name) {
			this.name = data.name;
		}

		this.title = data.description;
		return ["scope",this];
	}
};
