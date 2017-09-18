/**
 * @parent bit-docs-js/modules
 * @module {bit-docs-process-tags/types/tag} bit-docs-js/tags/codestart
 * 
 * @description Use this module to add the [bit-docs-js/tag/codestart] tag.
 * 
 * @signature `require('./tags/codestart');`
 * 
 * @return {bit-docs-process-tags/types/tag} Tag object configured for the
 * [bit-docs-js/tag/codestart] tag.
 * 
 * @body
 */
module.exports = {
	/**
	 * @signature `add(line, curData)`
	 * 
	 * [bit-docs-process-tags/types/tag.add] for [bit-docs-js/tag/codestart].
	 * 
	 * @param {String} line Text from [bit-docs-js/tag/codestart] until the end
	 * of line.
	 * 
	 * For example:
	 * 
	 * @codestart javascript
	 * @@codestart javascript
	 * @codeend
	 * 
	 * @param {bit-docs/types/docObject} curData [bit-docs/types/docObject] for
	 * the block.
	 * 
	 * For example:
	 * 
	 * ```js
	 * {
	 *     type: 'module',
	 *     name: 'my-project/lib/index',
	 *     params: [{
	 *         name: 'myParamString',
	 *         types: [Array]
	 *     }],
	 *     parent: 'my-project/lib',
	 *     src: {
	 *         line: 5,
	 *         codeLine: 22,
	 *         path: 'my-project/lib/index.js'
	 *     },
	 *     body: '\nJavaScript example using this module:\n\n',
	 *     description: 'Main lib module. \n',
	 *     title: '',
	 *     comment: ' '
	 * }
	 * ```
	 * 
	 * @return {Object} Custom object.
	 * 
	 * For example:
	 * 
	 * @codestart javascript
	 * {
	 *     type: 'javascript',
	 *     lines: [],
	 *     last: {
	 *         type: 'module',
	 *         name: 'my-project/lib/index',
	 *         params: [
	 *             [Object]
	 *         ],
	 *         parent: 'my-project/lib',
	 *         src: {
	 *             line: 5,
	 *             codeLine: 22,
	 *             path: 'my-project/lib/index.js'
	 *         },
	 *         body: '\nJavaScript example using this module:\n\n',
	 *         description: 'Main lib module. \n',
	 *         title: '',
	 *         comment: ' '
	 *     },
	 *     _last: undefined
	 * }
	 * @codeend
	 * 
	 * `lines` get added by [bit-docs-js/tags/codestart.addMore].
	 */
	add: function( line, curData ) {
		var m = line.match(/^\s*@codestart\s*([\w-]*)\s*(.*)/)

		if ( m ) {
			return {
				type: m[1] ? m[1].toLowerCase() : 'js',
				lines: [],
				last: curData,
				_last: this._last
			};
		}
	},
	/**
	 * @signature `addMore(line, curData)`
	 * 
	 * [bit-docs-process-tags/types/tag.addMore] for [bit-docs-js/tag/codestart].
	 * 
	 * @param {String} line String of characters until newline.
	 * 
	 * For example:
	 * 
	 * ```js
	 * console.log(myLib('hello'));
	 * ```
	 * 
	 * @param {String} curData Custom object.
	 * 
	 * For example:
	 * 
	 * ```js
	 * {
	 *     type: 'javascript',
	 *     lines: ['// first, we need to require the module',
	 *         'var myLib = require(\'my-project/lib\');',
	 *         '',
	 *         '// then we can use it!'
	 *     ],
	 *     last: {
	 *         type: 'module',
	 *         name: 'my-project/lib/index',
	 *         params: [
	 *             [Object]
	 *         ],
	 *         parent: 'my-project/lib',
	 *         src: {
	 *             line: 5,
	 *             codeLine: 22,
	 *             path: 'my-project/lib/index.js'
	 *         },
	 *         body: '\nJavaScript example using this module:\n\n',
	 *         description: 'Main lib module. \n',
	 *         title: '',
	 *         comment: ' '
	 *     },
	 *     _last: undefined
	 * }
	 * ```
	 * 
	 * `console.log(myLib('hello'));` will be added to the end of `lines`.
	 */
	addMore: function( line, curData ) {
		curData.lines.push(line);
	},
	/**
	 * @property {Boolean} keepStack
	 * 
	 * [bit-docs-process-tags/types/tag.keepStack] set `true` for [bit-docs-js/tag/codestart].
	 */
	keepStack: true
};
