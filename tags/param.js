var tnd = require("bit-docs-type-annotate").typeNameDescription;

var ordered = function (params) {
	var arr = [];
	for (var n in params) {
		var param = params[n];
		arr[param.order] = param;
	}
	return arr;
};

var indexOf = function (arr, name) {
	return arr.map(function (item) { return item.name }).indexOf(name);
};

var getFunctionParams = function (tagData) {
	if (tagData.types) {
		for (var i = 0; i < tagData.types.length; i++) {
			if (tagData.types[i].type === "function") {
				return tagData.types[i].params;
			}
		}
	}
};

var addParam = function (param, params) {
	if (indexOf(params, param.name) != -1) {
		// probably needs to swap
		params.splice(indexOf(params, param.name), 1, param);
	} else {
		// add to params
		params.push(param);
	}
};

/**
 * @module {Object} bit-docs-js/tags/param @param
 * @parent bit-docs-js/tags
 *
 * Specifies parameter information for [bit-docs-js/tags/function] or
 * [bit-docs-js/tags/signature].
 * 
 * A "parameter" is a method definition variable, like `a` in `function(a)`.
 *
 * @signature `@param {TYPE} NAME [DESCRIPTION]`
 * 
 * @codestart javascript
 * /**
 *  * Finds an order by id.
 *  * @param {String} [id=0] Order identification number.
 *  * @param {function(Order)} [success(order)] Callback function.
 *  *|
 * findById: function( id, success ) {
 * @codeend
 *
 * Use `@param` within a [bit-docs-js/tags/function] comment block, or after
 * an [bit-docs-js/tags/signature] tag.
 *
 * @param {bit-docs-js/typeExpression} TYPE A [bit-docs-js/typeExpression type expression].
 *
 * Use [bit-docs-js/tags/option @option] to describe a function's arguments,
 * or an object's properties.
 *
 * @param {bit-docs-js/nameExpression} NAME A [bit-docs-js/nameExpression name expression].
 *
 * @body
 *
 * ## Use within a comment block
 *
 * If the comment block precedes a function declaration, like:
 *
 * @codestart javascript
 * /**
 *  * Finds an order by id.
 *  * @param {String} [id=0] Order identification number.
 *  * @param {function(Order)} [success(order)] Filter order search by this.
 *  *|
 * findById: function( id, success ) {
 * @codeend
 *
 * Then bit-docs will automatically set the type to function for the
 * [bit-docs-js/DocObject] representing that comment, and create params with
 * names only (in this case `id` and `success`, and no description).
 *
 * The comment's `@param`s tags should use the same names as the function.
 * Any param that specifies a name that isn't present is added at the end of
 * the arguments.
 *
 * ## Use after @signature
 *
 * Use `@param` to specify the parameter variables of a signature.
 *
 * @codestart javascript
 * /**
 *  * Finds an order by id.
 *  *
 *  * @signature `Order.findById(id=0,[success])`
 *  *
 *  * @param {String} [id=0] Order identification number.
 *  * @param {function(Order)} [success(order)] Callback function.
 *  *|
 * findById: function( id, success ) {
 * @codeend
 *
 * When a `@signature` is used, any params automatically created from code
 * are overwritten.
 */
module.exports = {
	addMore: function (line, last) {
		if (last) last.description += "\n" + line;
	},
	add: function (line, tagData) {
		var param = tnd(line);
		/* TODO no print statements
		if(!param.type && !param.name){
			print("LINE: \n" + line + "\n does not match @param {TYPE} NAME DESCRIPTION");
		}
		*/
		// only do nested lookup if actually nested
		if (tagData && tagData !== this) {
			var params = getFunctionParams(tagData);
			if (params) {
				addParam(param, params);
				return param;
			}
		}

		// if we have a signiture, add this param to the last
		// signiture
		if (this.signatures) {
			this.signatures[this.signatures.length - 1].params.push(param);
		} else {
			var params = getFunctionParams(this);
			// check types (created by typedef) for a function type

			// params not found
			if (!params) {
				// create a params directly on the current object
				if (!this.params) {
					this.params = [];
				}
				params = this.params;
			}

			// we are the _body's_ param
			// check if one by the same name hasn't already been created
			addParam(param, params);
		}

		this._curParam = param;

		return param;
	},
	done: function () {
		// recursively look for description properties
		var findDescriptions = function (obj) {
			for (var prop in obj) {
				var val = obj[prop]
				isObject = val && typeof val === "object"
				if (prop === "description") {
					obj.description = obj.description.trim();
				} else if (isObject && obj[prop].forEach) {
					obj[prop].forEach(findDescriptions);
				} else if (isObject) {
					findDescriptions(val);
				}
			}
		};

		findDescriptions(this);

		delete this._curParam;
	}
};