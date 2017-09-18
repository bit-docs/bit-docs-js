var processCode = require("./code");
var processTags = require("bit-docs-process-tags");

var typeCheckReg = /^\s*@(\w+)/;

/**
 * @parent bit-docs-js/modules
 * @module {function} bit-docs-js/process/codeAndComment
 *
 * @signature `processCodeAndComment(options, callback)`
 *
 * Processes a [bit-docs-js/types/codeTagBlock] and the
 * [bit-docs-js/types/codeLine] immediately following the
 * [bit-docs-js/types/codeTagBlock] to produce a new
 * [bit-docs/types/docObject].
 *
 * @param {bit-docs-js/types/processCodeOptions} options
 * 
 * Options object that includes the [bit-docs-js/types/codeTagBlock] and any
 * [bit-docs-js/types/codeLine] that immediately followed the
 * [bit-docs-js/types/codeTagBlock].
 *
 * @param {bit-docs/types/processorCallback} callback
 *
 * Callback to call with the new [bit-docs/types/docObject].
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
