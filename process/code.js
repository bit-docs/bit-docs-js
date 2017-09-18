var _ = require("lodash");

/**
 * @parent bit-docs-js/modules
 * @module {function} bit-docs-js/process/code
 *
 * Process a line of code to add properties on a [bit-docs/types/docObject].
 *
 * @signature `processCode(options, callback)`
 *
 * @param {bit-docs-js/types/processCodeOptions} options
 * 
 * Options object that includes the [bit-docs-process-tags/types/tagBlock] and
 * any line of code that immediately followed the block.
 * 
 * @param {bit-docs/types/processorCallback} callback
 *
 * Callback to call with the new [bit-docs/types/docObject].
 *
 * @body
 *
 * ## Use
 *
 *     processCode({
 *         code: "foo: function(){"
 *       },
 *       function(newDoc) {
 *         newDoc.type //-> "function"
 *       }
 *     )
 */
module.exports = function(options, callback){
	var tag = guessTag(options.tags, options.code, options.docObject && options.docObject.type, options.scope),
		docObject;
	if(tag){
		docObject = tag.code(options.code, options.scope, options.docMap);
	}
	if(docObject && options.docObject) {
		_.defaults(docObject, options.docObject);
	}
	callback(docObject, docObject && tag.codeScope ? docObject : options.scope);
};

var guessTag = function( tags, code, firstGuess, scope ) {
	var matches = function(tag, code){
		if ( tags[tag] &&
			 tags[tag].codeMatch &&
			(typeof tags[tag].codeMatch == 'function' ?
				tags[tag].codeMatch(code) :
				tags[tag].codeMatch.test(code) ) ) {
			return tags[tag];
		}
	},
		res;


	if(firstGuess &&  (res = matches(firstGuess,code))){
		return res
	}
	// if the scope is static or prototype, favor function
	if(scope && /static|prototype/.test(scope.type) && (res = matches('function',code))  ){
		return res;
	}

	for ( var type in tags ) {
		if( res = matches(type,code)) {
			return tags[type];
		}
	}

	return null;
};
