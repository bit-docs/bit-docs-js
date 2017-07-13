var processCode = require("./code");
var processTags = require("bit-docs-process-tags");

var typeCheckReg = /^\s*@(\w+)/;

/**
 * @parent bit-docs-js/modules
 * @module {function} bit-docs-js/process/codeAndComment
 *
 * @signature `processCodeAndComment(options, callback)`
 *
 * Processes a code suggestion and then a comment and produces a
 * [bit-docs/types/docObject].
 *
 * @param {bit-docs/types/processOptions} options An options object that
 * contains the code and comment to process.
 *
 * @param {function(bit-docs/types/docObject,bit-docs/types/docObject)} callback(newDoc,newScope)
 *
 * A function that is called back with a [bit-docs/types/docObject] created
 * from the code and the scope `docObject`. If no [bit-docs/types/docObject] is
 * created, `newDoc` will be null.
 *
 * @option newDoc the new documentation object
 * @option newScope the new scope
 */
module.exports = function(options, callback){
	var self = this;
	var comment = options.comment;

	var firstLine = (typeof comment == 'string' ? comment : comment[0]) || "";
	var check = firstLine.match(typeCheckReg);

	if(check){
		if(!options.docObject){
			options.docObject = {};
		}
		options.docObject.type = check[1].toLowerCase();
	}

	if(options.code){
		processCode(options, function(newDoc, newScope){
			processTags({
				comment: options.comment,
				scope: newScope || options.scope,
				docMap: options.docMap,
				docObject: newDoc || options.docObject || {},
				tags: options.tags || {}
			}, function(newDoc, newScope){
				callback(newDoc, newScope);
			});


		});
	} else {
		processTags({
			comment: options.comment,
			scope: options.scope,
			docMap: options.docMap,
			docObject:  {},
			tags: options.tags || {}
		}, function(newDoc, newScope){
			callback(newDoc, newScope);
		});
	}
};
