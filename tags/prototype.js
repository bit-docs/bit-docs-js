var getParent = require("bit-docs-process-tags/get-parent"),
	tnd = require("bit-docs-type-annotate").typeNameDescription;

/**
 * @module {bit-docs-process-tags/tag} bit-docs-js/tags/prototype @prototype
 * @parent bit-docs-js/tags
 *
 * Declares that [bit-docs-js/tags/property] and [bit-docs-js/tags/function]
 * tags belong to the preceeding [bit-docs-js/tags/function]'s prototype
 * object.
 *
 * @signature `@prototype`
 *
 * @codestart javascript
 * /**
 *  * @@function
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
 */
	module.exports = {
		add: function(line, curData, scope, docMap){

			if(scope){

				var parentAndName = getParent.andName({
					parents: ["constructor","function","module","add"],
					useName: ["constructor","function","module","add"],
					scope: scope,
					docMap: docMap,
					name: "prototype",
					title: "prototype"
				});
				// if people are putting @prototype on something that already has a name
				if(this.name && docMap[this.name]) {
					return ['add',{
						type: "prototype",
						name: parentAndName.name,
						parent: parentAndName.parent,
						title: "prototype"
					}];
				} else {
					this.type= "prototype";
					this.name= parentAndName.name;
					this.parent= parentAndName.parent;
					this.title = "prototype";
					return ['scope',this];
				}

			}

		}
	};
