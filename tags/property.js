var getParent = require("bit-docs-process-tags/get-parent");
var tnd = require("bit-docs-type-annotate").typeNameDescription;
var updateNameWithScope = require("../lib/updateNameAndParentWithScope");

/**
 * @parent bit-docs-js/tags
 * @module {bit-docs-process-tags/types/tag} bit-docs-js/tags/property @property
 *
 * Documents a property of a parent object.
 *
 * @signature `@property {TYPE} NAME [TITLE]` Documents a property named `NAME`
 * of type `{TYPE}`.
 *
 * @codestart
 * /**
 *  * @@property {Number} delay
 *  * Sets the delay in milliseconds between an ajax request is made and
 *  * the success and complete handlers are called.  This only sets
 *  * functional fixtures.  By default, the delay is 200ms.
 *  *|
 * $.fixture.delay = 200
 * @codeend
 *
 * @param {bit-docs-type-annotate/types/typeExpression} [TYPE] An optional type like `{Object}`.
 * @param {bit-docs-type-annotate/types/nameExpression} [NAME] The name of the property.
 * This maybe inferred from the code block immediately following the comment.
 * @param {STRING} [TITLE] The display title of the property.
 *
 * @signature `["']?(\w+)["']?\s*[:=]\s*`
 *
 * If code matches the above regular expression and is not a function, it is
 * automatically assumed to be a property.
 * 
 * @return {bit-docs-process-tags/types/tag} Object with functions that compose the
 * [bit-docs-js/tags/property] tag.
 */
module.exports = {
	codeMatch: function( code ) {
		return code.match(/["']?(\w+)["']?\s*[:=]\s*/) && !code.match(/["']?(\w+)["']?\s*[:=]\s*function\(([^\)]*)/);
	},
	code: function( code, scope, docMap ) {
		var parts = code.match(/["']?(\w+)["']?\s*[:=]\s*/);

		if ( parts ) {
			var props = {
				name: parts[1],
				type: "property"
			};

			if(scope && docMap) {
				var parentAndName = getParent.andName({
					parents: "*",
					useName: ["constructor", "static", "prototype", "function", "module"],
					scope: scope,
					docMap: docMap,
					name: props.name
				});

				props.name = parentAndName.name;
				props.parent = parentAndName.parent;
			}

			return props;
		}
	},
	add: function(line, curData, scope, docMap){
		var data = tnd(line);
		this.types = data.types

		this.title = data.description;
		if(data.name){
			this.name = data.name;
		}
		updateNameWithScope(this, scope, docMap);
		this.type = "property";
	}
};
