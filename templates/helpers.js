var escapeHTML = require("escape-html");

module.exports = function (docMap, options, getCurrent, helpers, OtherHandlebars) {
    var docMapInfo = new DocMapInfo(docMap, getCurrent);

    return {
        "makeSignature": function (code) {
            if (code) {
                return escapeHTML(code);
            }

            var sig = "";
            if (this.type === "module") {
                sig = "__" + this.name + "__ ";
            }
            if (this.types) {
                return sig + helpers.makeTypes(this.types);
            }

            if (! /function|constructor/i.test(this.type) && !this.params && !this.returns) {
                return sig + helpers.makeType(this);
            }

            // if it's a constructor add new
            if (this.type === "constructor") {
                sig += "new ";
            }

            // get the name part right
            var parent = docMap[this.parent];
            if (parent) {
                if (parent.type == "prototype") {
                    var parentParent = docMap[parent.parent];
                    sig += (parentParent.alias || (lastPartOfName(parentParent.name) + ".")).toLowerCase();

                } else {
                    sig += (parent.alias || lastPartOfName(parent.name) + ".");
                }

                sig += (lastPartOfName(this.name) || "function");
            } else {
                sig += "function";
            }

            sig += "(" + helpers.makeParamsString(this.params) + ")";

            return sig;
        },
        "makeParams": function () {
            var result = "<b>" + this.name + "</b>";
            if (this.types) {
                result += " <code>" + helpers.makeTypesString(this.types) + "</code>";
            }
            return result;
        },
        makeReturn: function () {
            if (this.types) {
                return " <code>" + helpers.makeTypesString(this.types) + "</code>";
            }
        },
        makeTypesString: function (types) {
            if (types && types.length) {
                var txt = "{" + helpers.makeTypes(types);
                return txt + "}";
            } else {
                return '';
            }
        },
        makeTypes: function (types) {
            if (types.length) {
                // turns [{type: 'Object'}, {type: 'String'}] into '{Object | String}'
                return types.map(helpers.makeType).join('|');
            } else {
                return '';
            }
        },
        makeType: function (t) {
            if (t.type === "function") {
                var fn = t.params && t.params.length ?
                    "(" + helpers.makeParamsString(t.params) + ")" : "";

                if (t.constructs && t.constructs.types) {
                    fn = "constructor" + fn;
                    fn += " => " + helpers.makeTypes(t.constructs.types);
                } else {
                    fn = "function" + fn;
                }

                return fn;
            }

            var type = docMap[t.type];
            var title = type && type.title || undefined;
            var txt = helpers.linkTo(t.type, title);
            var params;

            if (t.template && t.template.length) {
                txt += "&lt;" + t.template.map(function (templateItem) {
                    return helpers.makeTypes(templateItem.types);
                }).join(",") + "&gt;";
            }

            if (type) {
                if (type.type === "function" && (type.params || type.signatures)) {
                    params = type.params || (type.signatures[0] && type.signatures[0].params) || [];
                } else if (type.type === "typedef" && type.types && type.types[0] && type.types[0].type == "function") {
                    params = type.types[0].params;
                }
                if (params) {
                    txt += "(" + helpers.makeParamsString(params) + ")";
                }
            }

            return txt;
        },
        makeParamsString: function (params) {
            if (!params || !params.length) {
                return "";
            }

            return params.map(function (param) {
                // try to look up the title
                var type = param.types && param.types[0] && param.types[0].type;
                return helpers.linkTo(type, param.name) +
                    (param.variable ? "..." : "");
            }).join(", ");
        },
    };
};

var DocMapInfo = function (docMap, getCurrent) {
    this.docMap = docMap;
    this.getCurrent = getCurrent;
};
