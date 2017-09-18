var getParent = require("bit-docs-process-tags/get-parent");
var tnd = require("bit-docs-type-annotate").typeNameDescription;

// a = function (b)
var funcMatch = /(?:([\w\.\$]+)|(["'][^"']+["']))\s*[=]\s*function\s?\(([^\)]*)/;

// $.extend("abc")
var codeMatch = /([\w\.\$]+?).extend\(\s*["']([^"']*)["']/;

/**
 * @parent bit-docs-js/modules
 * @module {bit-docs-process-tags/types/tag} bit-docs-js/tags/constructor
 * 
 * @description Use this module to add the [bit-docs-js/tag/constructor] tag.
 * 
 * @signature `require('./tags/constructor');`
 * 
 * @return {bit-docs-process-tags/types/tag} Tag object configured for the
 * [bit-docs-js/tag/constructor] tag.
 * 
 * @body
 * 
 * This page is hidden because using `@constructor` is not recommended.
 */
module.exports = {
	/**
	 * @signature `codeMatch(codeLine)`
	 * 
	 * [bit-docs-js/types/codeTag.codeMatch] for [bit-docs-js/tag/constructor].
	 * 
	 * @param {String} codeLine String of characters until newline.
	 * 
	 * For example:
	 * 
	 * ```js
	 * jQuery.extend( "myObj", {
	 * ```
	 * 
	 * Will be matched against this regex:
	 * 
	 * ```js
	 * /([\w\.\$]+?).extend\(\s*["']([^"']*)["']/ // code match
	 * ```
	 * 
	 * @return {Boolean} `true` if string matched regex, `false` if not.
	 */
	codeMatch: function(codeLine){
		return codeMatch.test(codeLine);
	},
	/**
	 * @signature `code(codeLine)`
	 * 
	 * [bit-docs-js/types/codeTag.code] for [bit-docs-js/tag/constructor].
	 * 
	 * @param {String} codeLine String of characters until newline.
	 * 
	 * For example:
	 * 
	 * ```js
	 * jQuery.extend( "myObj", {
	 * ```
	 * 
	 * This will be broken into parts and used to hydrate the current
	 * [bit-docs/types/docObject]:
	 * 
	 * @return {bit-docs/types/docObject} Properties that should be set on the
	 * current [bit-docs/types/docObject].
	 * 
	 * For example:
	 * 
	 * ```js
	 * { name: 'myObj', inherits: 'jQuery', type: 'constructor' }
	 * ```
	 */
	code: function( codeLine ) {

		var parts = codeLine.match(codeMatch);
		if ( parts ) {
			return {
				name: parts[2],
				inherits: parts[1].replace(/^\$./, "jQuery."),
				type: "constructor"
			};
		}
		parts = codeLine.match(funcMatch)

		if ( parts ) {
			return {
				name: parts[1] ? parts[1].replace(/^this\./, "") : parts[2],
				type: "constructor"
			};
		}
	},
	/**
	 * @property {Boolean} codeScope
	 * 
	 * [bit-docs-js/types/codeTag.codeScope] set `true` for [bit-docs-js/tag/constructor].
	 */
	codeScope: true,
	/**
	 * @signature `add(line, curData, scope, docMap)`
	 * 
	 * [bit-docs-process-tags/types/tag.add] for [bit-docs-js/tag/constructor].
	 * Sets `this.type` to `"constructor"`.
	 *
	 * Also sets `this.name` and `this.title` using [bit-docs-type-annotate].
	 *
	 * @param {String} line Text from [bit-docs-js/tag/constructor] until the
	 * end of line.
	 * 
	 * For example:
	 * 
	 * ```js
	 * @@constructor my-project/lib/index
	 * ```
	 * 
	 * @param {bit-docs/types/docObject} curData [bit-docs/types/docObject] for
	 * the block.
	 * 
	 * For example:
	 * 
	 * ```js
	 * {
	 *   src: {
	 *     path: 'lib/index.js'
	 *   },
	 *   body: '',
	 *   description: '',
	 *   parent: 'my-project/lib'
	 * }
	 * ```
	 * 
	 * @param {bit-docs/types/docObject} scope [bit-docs/types/docObject]
	 * representing current scope.
	 * 
	 * For example:
	 * 
	 * ```js
	 * {
	 *   type: 'script',
	 *   name: 'lib/index.js'
	 * }
	 * ``` 
	 * 
	 * @param {bit-docs/types/docMap} docMap [bit-docs/types/docMap] being added to.
	 * 
	 * @return {bit-docs-process-tags/types/processTagsCommand} `['scope', this]`.
	 */
	add: function(line, curData, scope, docMap){

		// it's possible this has already been matched as something else ... clear parent

		this.type = "constructor";
		var data = tnd(line);
		if(data.name) {
			this.name = data.name;
		}

		this.title = data.description;
		return ["scope",this];
	}
};
