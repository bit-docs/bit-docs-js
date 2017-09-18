var getParent = require("bit-docs-process-tags/get-parent");
var tnd = require("bit-docs-type-annotate").typeNameDescription;

var funcMatch = /(?:([\w\.\$]+)|(["'][^"']+["']))\s*[=]\s*function\s?\(([^\)]*)/;
var codeMatch = /([\w\.\$]+?).extend\(\s*["']([^"']*)["']/;

/**
 * @parent bit-docs-js/modules
 * @module {bit-docs-process-tags/types/tag} bit-docs-js/tags/class
 * 
 * @description Deprecated. Use [bit-docs-js/tags/constructor] instead.
 * 
 * @signature `require('./tags/class');`
 * 
 * @return {bit-docs-process-tags/types/tag} Tag object configured for the
 * [bit-docs-js/tag/class] tag.
 * 
 * @body
 * 
 * Gets converted to [bit-docs-js/tags/constructor].
 */
module.exports = {
	/**
	 * @signature `add(line)`
	 * 
	 * [bit-docs-process-tags/types/tag.add] for [bit-docs-js/tag/class].
	 * 
	 * Simply converts the scope into that of [bit-docs-js/tags/constructor].
	 * 
	 * @param {String} line Text from [bit-docs-js/tag/class] until the end
	 * of line.
	 * 
	 * For example:
	 * 
	 * @codestart javascript
	 * @@class my-project/lib/index
	 * @codeend
	 * 
	 * @return {bit-docs-process-tags/types/processTagsCommand} `['scope', this]`
	 */
	add: function(line){
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
