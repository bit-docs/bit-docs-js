var getParent = require("bit-docs-process-tags/get-parent");
var tnd = require("bit-docs-type-annotate").typeNameDescription;

/**
 * @hide
 * @parent bit-docs-js/tags
 * @module {bit-docs/types/tag} bit-docs-js/tags/static @static
 *
 * Declares that [bit-docs-js/tags/property @property] and
 * [bit-docs-js/tags/function @function] tags belong to the preceeding
 * [bit-docs-js/tags/function @constructor].
 *
 * @signature `@prototype`
 *
 * @codestart
 * /**
 *  * @@constructor
 *  * Creates an Animal
 *  *|
 * Animal = function(){ ... }
 * /** @@prototype *|
 * Animal.prototype = {
 *    /**
 *     * Eats another animal.
 *     *|
 *     eat: function(animal){ ... }
 * }
 * @codeend
 *
 */
module.exports = {
	add: function(line, curData, scope, docMap){
		if(scope){

			var parentAndName = getParent.andName({
				parents: ["constructor","function","module","add"],
				useName: ["constructor","function","module","add"],
				scope: scope,
				docMap: docMap,
				name: "static",
				title: "static"
			});

			// if people are putting @static on something that already has a name
			if(this.name && docMap[this.name]) {
				return ['add',{
					type: "static",
					name: parentAndName.name,
					parent: parentAndName.parent,
					title: "static"
				}];
			} else {
				this.type= "static";
				this.name= parentAndName.name;
				this.parent= parentAndName.parent;
				this.title = "static";
				return ['scope',this];
			}
		}

	}
};
