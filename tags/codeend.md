@parent bit-docs-js/tags
@constructor {bit-docs-process-tags/types/tag} bit-docs-js/tag/codeend @codeend

@description Stops a code block.

@signature `@codeend`

@body

### Example:

```
/**
 * @codestart
 * /* @signature `Person(name)`
 *  * @param {String} name A person's name.
 *  *|
 * Person = function(name){
 *   this.name = name
 *   Person.count++;
 * }
 *
 * /* @prototype *|
 * Person.prototype = {
 *   /* Returns a formal name 
 *    * @return {String} The name with "Mrs." added.
 *    *|
 *   fancyName: function(){
 *     return "Mrs. " + this.name;
 *   }
 * }
 * @codeend
 */
```
