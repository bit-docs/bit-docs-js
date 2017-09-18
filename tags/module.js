var getParent = require("bit-docs-process-tags/get-parent");
var tnd = require("bit-docs-type-annotate").typeNameDescription;

/**
 * @parent bit-docs-js/modules
 * @module {bit-docs-process-tags/types/tag} bit-docs-js/tags/module
 *
 * @description Module that implements the [bit-docs-js/tag/module] tag.
 * 
 * @body
 */
module.exports = {
	/**
	 * @signature `add(line, curData, scope, docMap)`
	 *
	 * @param {String} line The line.
	 * @param {bit-docs/types/docMap} docMap The [bit-docs/types/docMap].
	 */
	add: function( line ) {
		var prevParam = this;
		// start processing

		var data = tnd(line);
		if(!data.name){
			print("LINE: \n" + line + "\n does not match @typedef [{TYPE}] NAME TITLE");
		}
		this.type = "module";
		this.title = data.description;
		delete data.description;

		for(var prop in data){
			this[prop] =  data[prop];
		}
		return ["scope", this];
	}
};
