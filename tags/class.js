var getParent = require("bit-docs-process-tags/get-parent"),
	tnd = require("bit-docs-type-annotate").typeNameDescription;

	var funcMatch = /(?:([\w\.\$]+)|(["'][^"']+["']))\s*[=]\s*function\s?\(([^\)]*)/,
		codeMatch = /([\w\.\$]+?).extend\(\s*["']([^"']*)["']/;

/**
 * @module {bit-docs-process-tags/tag} bit-docs-js/tags/constructor @constructor
 * @parent bit-docs-js/tags
 * @hide
 * 
 * Document a constructor function.
 *
 * @signature `@constructor NAME [TITLE]`
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
