@parent bit-docs-js/tags
@constructor bit-docs-js/tag/module @module
@description Declares the export value for a module.

@signature `@module {TYPE} NAME [TITLE]`

```js
/**
 * @module {{}} lib/settings settings
 * @option {String} environment Production, development, or staging.
 * @option {Number} requestTimeout How long to wait between requests.
 */
export default {
    environment: "production",
    requestTimeout: 10000
}
```

```js
// resulting docObject
{
  "type": "module",
  "description": "",
  "title": "settings",
  "types": [
    {
      "type": "Object",
      "options": [
        {
          "name": "environment",
          "description": "Production, development, or staging.",
          "types": [
            {
              "type": "String"
            }
          ]
        },
        {
          "name": "requestTimeout",
          "description": "How long to wait between requests.\n",
          "types": [
            {
              "type": "Number"
            }
          ]
        }
      ]
    }
  ],
  "name": "lib/settings"
}
```

@param {bit-docs-type-annotate/types/typeExpression} [TYPE] A
[bit-docs-type-annotate/types/typeExpression type expression]. This is
typically an object specified like: `{{}}` or a function like `{function}`.

@param {String} NAME The name of the type.

@param {String} TITLE The title of the type used for display purposes.

@body

## Use

Use `@module` to specify what a module exports. Depending on what the module
exports you might use one of the following:

#### A single function export

```js
/**
 * @module {function} multi/util/add
 * @parent multi/modules
 * 
 * Adds two numbers together.
 * 
 * @signature `add(first, second)`
 * 
 * @param {Number} first The first number.
 * @param {Number} second The second number to add.
 * @return {Number} The two numbers added together.
 */
module.exports = function(first, second) {
	return first+second;
};
```

#### Multiple export values

```js
/**
 * @module {Module} multi/util/date-helpers
 * @parent multi/modules
 * 
 * Provides an object of date helpers.
 */

/**
 * @function tomorrow
 * Provides the start time of tomorrow. 
 */
exports.tomorrow = function() { ... };

/**
 * @function yesterday
 * Provides the start time of yesterday. 
 */
exports.yesterday = function() { ... };
```

#### A single constructor function export

```js
/**
 * @module {function(new:multi/lib/graph)} multi/lib/graph
 * @parent multi/modules
 * 
 * @signature `new Graph(graphData)`
 * @param {Object} graphData
 */
function Graph(graphData) { ... }

/**
 * @prototype
 */
Graph.prototype = {
	/**
	 * @function toChart
	 */
	toChart: function() { ...}
};

module.exports = Graph;
```
