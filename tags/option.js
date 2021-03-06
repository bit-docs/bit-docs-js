var tnd = require("bit-docs-type-annotate").typeNameDescription;

// go through the types and get the first one that has options
var getOptions = function (param) {
  if (!param.types) {
    return;
  }
  for (var i = 0; i < param.types.length; i++) {
    if (param.types[i].options) {
      return param.types[i].options;
    }
  }
};

// go through the types and return the first one that has params
var getParams = function (param) {
  if (!param.types) {
    return;
  }
  for (var i = 0; i < param.types.length; i++) {
    if (param.types[i].params) {
      return param.types[i].params;
    }
  }
};

// find matching type
var getType = function (types, type) {
  for (var i = 0; i < types.length; i++) {
    if (types[i].type === type) {
      return types[i];
    }
  }
};

var getOrMakeOptionByName = function (options, name) {
  for (var i = 0; i < options.length; i++) {
    if (options[i].name === name) {
      return options[i];
    }
  }
  var option = { name: name };
  options.push(option);
  return option;
};

var setOptionData = function (option, data) {
  option.description = data.description;

  for (var prop in data) {
    option[prop] = data[prop];
  }
};

/**
 * @parent bit-docs-js/tags
 * @module {bit-docs-process-tags/types/tag} bit-docs-js/tags/option @option
 *
 * Describes a property of the object, or an argument of the function, that was
 * specified in an [bit-docs-js/tags/param] tag.
 * 
 * @signature `@option {TYPE} NAME [DESCRIPTION]`
 * 
 * Here's an example of some ways you can use the `@option` tag:
 * 
 * @codestart javascript
 * /**
 *  * @module {{}} ledger Ledger
 *  *|
 * module.exports = {
 *   /**
 *    * Retrieves a list of orders.
 *    *
 *    * @param {{}} params A parameter object with the following options:
 *    *   @option {String} type Specifies the type of order.
 *    *   @option {Number} [createdAt] Retrieves orders after this timestamp.
 *    *
 *    * @param {function(Orders.List)} [success(orders)] Callback function.
 *    *   @option orders A list of [Orders] that match `params`.
 *    *|
 *   find: function(params, success) { /*...*| }
 * };
 * @codeend
 *
 * @param {bit-docs-type-annotate/types/typeExpression} [TYPE] A [bit-docs-type-annotate/types/typeExpression type expression]. Examples:
 *
 * `{String}` - type is a `String`.
 * `{function(name)}` - type is a `function` that takes one `name` argument.
 *
 * `TYPE` does not need to be specified for types that are already described
 * in the `@option`'s corresponding function or object.
 * 
 * For example, notice how there is no need to specify `{String}`:
 *
 * @codestart
 * /**
 *  * @param {{type: String}} params An object with the following options:
 *  *   @option kind Specifies the kind of order.
 *  *   @option label Retrieves only orders with this label.
 *  *|
 * @codeend
 * 
 * However, omitting TYPE might confuse your team members, so we recommend
 * being explicit and always specifying TYPE for `@option`.
 * 
 * @param {bit-docs-type-annotate/types/nameExpression} NAME A [bit-docs-type-annotate/types/nameExpression name expression]. Examples:
 *
 * - `age`: age is item.
 * - `[age]`: age is item, age is optional.
 * - `[age=0]`: age defaults to 0.
 * 
 * @param {Markdown} [DESCRIPTION] Markdown content that continues for multiple lines.
 * 
 * @body
 * 
 * ### Usage Examples
 * 
 * @codestart javascript
 * /**
 *  * @module {{}} foo Foo
 *  *|
 * module.exports = {
 *   /**
 *    * A function named bar.
 *    *
 *    * @param {{}} params A parameter object with options:
 *    *   @option {String} aString An arbitrary string.
 *    *   @option {Number} [oNumber] An optional number.
 *    *|
 *   bar: function(params) { /*...*| }
 * };
 * @codeend
 * 
 * Resulting [bit-docs/types/docObject]:
 * 
 * @codestart javascript
 * {
 *   "description": "A function named bar.\n",
 *   "name": "foo.bar",
 *   "params": [
 *     {
 *       "description": "A parameter object with options:",
 *       "name": "params",
 *       "types": [
 *         {
 *           "options": [
 *             {
 *               "description": "An arbitrary string.",
 *               "name": "aString",
 *               "types": [
 *                 {
 *                   "type": "String"
 *                 }
 *               ]
 *             },
 *             {
 *               "description": "An optional number.\n",
 *               "name": "oNumber",
 *               "optional": true,
 *               "types": [
 *                 {
 *                   "type": "Number"
 *                 }
 *               ]
 *             }
 *           ],
 *           "type": "Object"
 *         }
 *       ]
 *     }
 *   ],
 *   "parent": "foo",
 *   "type": "function"
 * }
 * @codeend
 * 
 * @highlight 7-32,only
 * 
 * That [bit-docs/types/docObject] an be used in a template like this:
 *
 * @codestart html
 * {{#if params}}
 *   {{#params}}
 *     {{#types}}
 *       {{#if options.length}}
 *         {{#options}}
 *           <p>
 *             Option Name: {{name}}
 *             <br/>
 *             Option Description: {{description}}
 *           </p>
 *         {{/options}}
 *       {{/if}}
 *     {{/types}}
 *   {{/params}}
 * {{/if}}
 * @codeend
 * 
 * See [bit-docs-js/templates/signature.mustache] for a more complex template
 * that uses the [bit-docs/types/docObject] resulting from `@option`.
 */
module.exports = {
  addMore: function (line, last) {
    if (last) last.description += "\n" + line;
  },
  add: function (line, tagData) {
    var noNameData = tnd(line, true),
      data = tnd(line),
      i,
      option,
      obj;

    if (tagData && this !== tagData) {
      var options = getOptions(tagData);

      if (options) {
        option = getOrMakeOptionByName(options, data.name);
        setOptionData(option, data);
        return option;
      }
    }

    // start processing
    if (this.type == "typedef" || this.type === "module") {
      // Typedefs can have option values, but those values can be objects
      // with options.
      // So, we should check in options objects first
      for (i = 0; i < this.types.length; i++) {
        obj = this.types[i];
        if (obj.type == "Object") {
          option = getOrMakeOptionByName(obj.options || [], data.name);
          if (option) {
            setOptionData(option, data);
            return option;
          }
        }
      }
    }

    // we should look to find something matching
    var locations = [this._curReturn, this._curParam, (this.params && this.params[this.params.length - 1]), this];

    // only process this type of option if there is one value
    if (noNameData.types && noNameData.types.length == 1) {
      var typeData = noNameData.types[0];
      for (i = 0; i < locations.length; i++) {
        obj = locations[i];
        if (obj) {
          if (!obj.types) {
            obj.types = [];
          }
          var type = getType(obj.types, typeData.type);
          if (type) {
            // copy description
            type.description = noNameData.description;

            // copy any additional type info
            for (var prop in typeData) {
              type[prop] = typeData[prop];
            }

            return type;
          }
        }
      }
    }

    var prevParam = this._curReturn || this._curParam || (this.params && this.params[this.params.length - 1]) || this;

    if (!data.name) {
      console.log("LINE: \n" + line + "\n does not match @option [{TYPE}] NAME DESCRIPTION");
    }

    // try to get a params or options object
    var params = getParams(prevParam),
      options = getOptions(prevParam);

    if (!options && !params) {
      if (prevParam.types[0]) {
        options = (prevParam.types[0].options = []);
      } else {
        console.log("LINE: \n" + line + "\n could not find an object or arguments to add options to.");
        return;
      }
    }

    // get the named one
    option = getOrMakeOptionByName(options || params, data.name);

    // add to it
    setOptionData(option, data);

    return option;
  }
};
