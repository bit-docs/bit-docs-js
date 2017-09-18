@parent bit-docs-js/tags
@constructor bit-docs-js/tag/codestart @codestart

@description Starts a code block.  

@signature `@codestart [LANGUAGE]`

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

@param {String} [LANGUAGE] Language of the code block.

See [bit-docs-prettify] for supported languages.

@body

## Use

Matches multiple lines. Must end with [bit-docs-js/tag/codeend].
