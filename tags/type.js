var tnd = require("bit-docs-type-annotate").typeNameDescription;

	// go through the types and get the first one that has options
	var getOptions = function(param){
		if(!param.types) {
			return;
		}
		for(var i =0; i < param.types.length; i++) {
			if( param.types[i].options ) {
				return param.types[i].options;
			}
		}
	};
	// go through the types and return the first one that has params
	var getParams = function(param){
		if(!param.types) {
			return;
		}
		for(var i =0; i < param.types.length; i++) {
			if( param.types[i].params ) {
				return param.types[i].params;
			}
		}
	};

	// find matching type
	var getType = function(types, type){
		for(var i =0; i < types.length; i++) {
			if( types[i].type === type ) {
				return types[i];
			}
		}
	};

	var getOrMakeOptionByName = function(options, name){
		for(var i =0; i < options.length; i++) {
			if( options[i].name === name ) {
				return options[i];
			}
		}
		var option = {name: name};
		options.push(option);
		return option;
	},
		setOptionData = function(option, data){
			option.description = data.description;

			for(var prop in data){
				option[prop] =  data[prop];
			}
		};


	module.exports = {

		addMore: function( line, last ) {
			if ( last ) last.description += "\n" + line;
		},
		add: function( line, tagData ) {

			var noNameData = tnd(line, true),
				data = tnd(line);
			// we should look to find something matching
			var locations = [this];
			// only process this type of option if there is one value
			if(noNameData.types && noNameData.types.length == 1) {
				var typeData = noNameData.types[0];
				for(var i = 0 ; i < locations.length; i++){
					var obj = locations[i];
					if(obj){
						if(!obj.types){
							obj.types = [];
						}
						var type = getType(obj.types, typeData.type);
						if(type){
							// copy description
							type.description = noNameData.description;
							// copy any additional type info
							for(var prop in typeData){
								type[prop] = typeData[prop];
							}
							return type;
						}
					}
				}
			}
		}
	};
