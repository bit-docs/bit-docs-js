@parent bit-docs-js/tags
@constructor bit-docs-js/tag/function @function

@description Specifies the comment block is for a function. To specify
function parameters, use [bit-docs-js/tags/param].

@signature `@function [NAME] [TITLE]`

@codestart javascript
/**
 * @module {{}} lib.component Component
 *|

/**
 * @function lib.Component.prototype.update update
 * @parent lib.Component
 *|
C.p.update = function(){ /* ... *| }

// resulting docObject
{
  "type": "function",
  "name": "lib.Component.prototype.update",
  "params": [],
  "parent": "lib.Component",
  "description": "\n",
  "title": "update",
  "pathToRoot": ".."
}
@codeend

@param {String} [NAME] The name of the function. It should be supplied
if it cannot be determined from the code block following the comment.

@param {String} [TITLE] The title to be used for display purposes.

@body

## Code Matching

The `@function` type can be inferred from code like the following:

@codestart javascript
/**
 * The foo function exists
 *|
foo: function(){}

/**
 * The bar function exists
 *|
bar = function(buz, baz){
  return 'a string';
}
@codeend

The comment block above `foo` will automatically be associated with the
function `foo`. Essentially, as if it had been explicitly written as:

@codestart javascript
/**
 * @function lib.foo foo
 * @description The foo function exists
 *|
foo: function(){}
@codeend

The same is true for the comment block above `bar`, which translates to:

@codestart javascript
/**
 * @function lib.bar bar
 * @param {*} buz
 * @param {*} baz
 * @return {String}
 * @description The bar function exists
 *|
bar = function(buz, baz){
  return 'a string';
}
@codeend

Furthermore, the code matching can handle prototypes and methods like:

@codestart javascript
/**
 * @module {function} foo-bar
 *|
Foo = function(){};
Object.assign(Foo.prototype, {
  bar: function(arg1){}
});
module.exports = Foo;
@codeend

Which translates to:

@codestart javascript
/**
 * @module {function} foo-bar
 *|
Foo = function(){};

/**
 * @prototype
 *|
Object.assign(Foo.prototype, {

 /**
  * The bar function exists
  *|
  bar: function(arg1){}

});

module.exports = Foo;
@codeend
