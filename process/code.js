var _ = require("lodash");

/**
 * @parent bit-docs-js/modules
 * @module {function} bit-docs-js/process/code
 *
 * Process a code hint into properties on a [bit-docs/types/docObject].
 *
 * @signature `processCode(options, callback)`
 *
 * Using the `options.code`, and `options.tags`, processes the code into
 * properties on a [bit-docs/types/docObject].
 * 
 * The `callback` is called with the new [bit-docs/types/docObject].
 *
 * @param {bit-docs/types/processOptions} options An options object that
 * contains the code to process.
 *
 * @param {function(bit-docs/types/docObject,bit-docs/types/docObject)} callback(newDoc,newScope)
 *
 * A function that is called back with a [bit-docs/types/docObject] created
 * from the code and the scope `docObject`. If no [bit-docs/types/docObject] is
 * created, `newDoc` will be null.
 *
 * @body
 *
 * ## Use
 *
 *     process.code(
 * 	      {code: "foo: function(){"},
 *        function(newDoc){
 *          newDoc.type //-> "function"
 *        }
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
