var updateNameWithScope = require("../lib/updateNameAndParentWithScope");
var getParent = require("bit-docs-process-tags/get-parent");
var tnd = require("bit-docs-type-annotate").typeNameDescription;

// key: function() or key= function(){}
//(~)? is just a stupid way of making sure there are the right number of parts
keyFunction = /(?:([\w\.\$]+)|(["'][^"']+["']))\s*[:=].*function\s?\(([^\)]*)/;
namedFunction = /\s*function\s+([\w\.\$]+)\s*(~)?\(([^\)]*)/;

/**
 * @parent bit-docs-js/tags
 * @module {bit-docs-js/tag} bit-docs-js/tags/function @function
 *
 * @description Specifies the comment block is for a function. Use 
 * [bit-docs-js/tags/param] to specify the parameters of a function.
 *
 * @signature `@function [NAME] [TITLE]`
 *
 * @codestart javascript
 * /**
 *  * @module {{}} lib.component Component
 *  *|
 * 
 * /**
 *  * @function lib.Component.prototype.update update
 *  * @parent lib.Component
 *  *|
 * C.p.update = function(){ /* ... *| }
 * 
 * // resulting docObject
 * {
 *   "type": "function",
 *   "name": "lib.Component.prototype.update",
 *   "params": [],
 *   "parent": "lib.Component",
 *   "description": "\n",
 *   "title": "update",
 *   "pathToRoot": ".."
 * }
 * @codeend
 *
 * @param {String} [NAME] The name of the function. It should be supplied
 * if it cannot be determined from the code block following the comment.
 *
 * @param {String} [TITLE] The title to be used for display purposes.
 *
 * @body
 *
 * ## Code Matching
 *
 * The `@function` type can be inferred from code like the following:
 *
 * @codestart javascript
 * /**
 *  * The foo function exists
 *  *|
 * foo: function(){}
 * 
 * /**
 *  * The bar function exists
 *  *|
 * bar = function(buz, baz){
 *   return 'a string';
 * }
 * @codeend
 * 
 * The comment block above `foo` will automatically be associated with the
 * function `foo`. Essentially, as if it had been explicitly written as:
 * 
 * @codestart javascript
 * /**
 *  * @function lib.foo foo
 *  * @description The foo function exists
 *  *|
 * foo: function(){}
 * @codeend
 * 
 * The same is true for the comment block above `bar`, which translates to:
 * 
 * @codestart javascript
 * /**
 *  * @function lib.bar bar
 *  * @param {*} buz
 *  * @param {*} baz
 *  * @return {String}
 *  * @description The bar function exists
 *  *|
 * bar = function(buz, baz){
 *   return 'a string';
 * }
 * @codeend
 * 
 * Furthermore, the code matching can handle prototypes and methods like:
 * 
 * @codestart javascript
 * /**
 *  * @module {function} foo-bar
 *  *|
 * Foo = function(){};
 * Object.assign(Foo.prototype, {
 *   bar: function(arg1){}
 * });
 * module.exports = Foo;
 * @codeend
 * 
 * Which translates to:
 * 
 * @codestart javascript
 * /**
 *  * @module {function} foo-bar
 *  *|
 * Foo = function(){};
 * 
 * /**
 *  * @prototype
 *  *|
 * Object.assign(Foo.prototype, {
 * 
 *  /**
 *   * The bar function exists
 *   *|
 *   bar: function(arg1){}
 * 
 * });
 * 
 * module.exports = Foo;
 * @codeend
 */
module.exports = {
	codeMatch: /function(\s+[\w\.\$]+)?\s*\([^\)]*\)/,
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
