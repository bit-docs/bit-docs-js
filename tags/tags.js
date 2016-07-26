var tags = {
    "class": require("./class"),
	codeend: require("./codeend"),
	codestart: require("./codestart"),
	constructor: require("./constructor"),
	"function": require("./function"),
	"module": require("./module"),
	option: require("./option"),
	param: require("./param"),
	property: require("./property"),
	"prototype" : require("./prototype"),
	"return": require("./return"),
	signature: require("./signature"),
	"static": require("./static"),
	"this": require("./this"),
	type: require("./type"),
    typedef: require("./typedef")
};

for(var name in tags) {
	tags[name].name = name;
}

module.exports = tags;
