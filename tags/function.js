var updateNameWithScope = require("../lib/updateNameAndParentWithScope");
var getParent = require("bit-docs-process-tags/get-parent");
var tnd = require("bit-docs-type-annotate").typeNameDescription;

// key: function() or key= function(){}
//(~)? is just a stupid way of making sure there are the right number of parts
keyFunction = /(?:([\w\.\$]+)|(["'][^"']+["']))\s*[:=].*function\s?\(([^\)]*)/;
namedFunction = /\s*function\s+([\w\.\$]+)\s*(~)?\(([^\)]*)/;

/**
 * @parent bit-docs-js/modules
 * @module {bit-docs-process-tags/types/tag} bit-docs-js/tags/function
 *
 * @description Module that implements the [bit-docs-js/tag/function] tag.
 * 
 * @body
 */
module.exports = {
	codeMatch: /function(\s+[\w\.\$]+)?\s*\([^\)]*\)/,
	/**
	 * @signature `code(code, scope, docMap)`
	 *
	 * @param {String} code The code.
	 * @param {String} scope The scope.
	 * @param {bit-docs/types/docMap} docMap The [bit-docs/types/docMap].
	 * @return {Object} Extracted information about the code.
	 */
	code: function (code, scope, docMap) {
		var parts = code.match(keyFunction);

		if (!parts) {
			parts = code.match(namedFunction);
		}

		var data = {
			type: "function"
		};

		if (!parts) {
			return;
		}

		data.name = parts[1] ? parts[1].replace(/^this\./, "")
			.replace(/^exports\./, "")
			.replace(/^\$./, "jQuery.") : parts[2];

		data.params = [];
		var params = parts[3].match(/\w+/g);

		if (params) {
			for (var i = 0; i < params.length; i++) {
				data.params.push({
					name: params[i],
					types: [{ type: "*" }]
				});
			}
		}

		// assign name and parent
		if (scope && docMap) {
			var parentAndName = getParent.andName({
				parents: "*",
				useName: ["constructor", "static", "prototype", "add", "module"],
				scope: scope,
				docMap: docMap,
				name: data.name
			});

			data.parent = parentAndName.parent;
			data.name = parentAndName.name;
		}

		return data;
	},
	/**
	 * @signature `add(line, curData, scope, docMap)`
	 *
	 * @param {String} line The line.
	 * @param {String} curData The data.
	 * @param {String} scope The scope.
	 * @param {bit-docs/types/docMap} docMap The [bit-docs/types/docMap].
	 */
	add: function (line, curData, scope, docMap) {
		var data = tnd(line);
		this.title = data.description;

		if (data.name) {
			this.name = data.name;
		}

		updateNameWithScope(this, scope, docMap);

		if (this.name) {
			this.type = "function";
		}

		if (!data.params) {
			data.params = [];
		}
	}
};
