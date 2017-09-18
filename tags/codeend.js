/**
 * @parent bit-docs-js/modules
 * @module {bit-docs-process-tags/types/tag} bit-docs-js/tags/codeend
 * 
 * @description Use this module to add the [bit-docs-js/tag/codeend] tag.
 * 
 * @signature `require('./tags/codeend');`
 * 
 * @return {bit-docs-process-tags/types/tag} Tag object configured for the
 * [bit-docs-js/tag/codeend] tag.
 * 
 * @body
 */
module.exports =  {
	/**
	 * @signature `add(line, data)`
	 * 
	 * [bit-docs-process-tags/types/tag.add] for [bit-docs-js/tag/codeend].
	 * 
	 * @param {String} line Text from [bit-docs-js/tag/codeend] until the end
	 * of line.
	 * 
	 * For example:
	 * 
	 * @codestart javascript
	 * @@codeend
	 * @codeend
	 * 
	 * @param {Object} curData Custom data object hydrated by [bit-docs-js/tags/codestart].
	 * 
	 * For example:
	 * 
	 * ```js
	 * {
	 *     type: 'javascript',
	 *     lines: ['/**', ' * @demo demos/example.html 300', ' *|'],
	 *     last: {
	 *         code: '@demo PATH [HEIGHT]',
	 *         description: '\n',
	 *         params: []
	 *     },
	 *     _last: undefined
	 * }
	 * ```
	 * 
	 * @return {bit-docs-process-tags/types/processTagsCommand} `['poppop', '...']`.
	 * 
	 * For example:
	 * 
	 * @codestart javascript
	 * [
	 *   'poppop',
	 *   '```javascript\n/**\n * @demo demos/example.html 300\n *|\n```'
	 * ]
	 * @codeend
	 */
	add: function( line, data ) {
		if (!data.lines ) {
			console.warn('you probably have a @codeend without a @codestart')
		}

		var joined = data.lines.join("\n");

		if ( data.type == "javascript" || data.type == "js") { //convert comments
			joined = joined.replace(/\*\|/g, "*/")
		}

		var out = "```" + data.type + "\n"
			+ joined.replace(/&lt;/g,"<")
					.replace(/&gt;/g,">")
					.replace(/&amp;/g,"&") +
			"\n```";

		return ["poppop", out];
	},
	/**
	 * @property {Boolean} keepStack
	 * 
	 * [bit-docs-process-tags/types/tag.keepStack] set `true` for
	 * [bit-docs-js/tag/codeend].
	 */
	keepStack: true
};
