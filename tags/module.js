var getParent = require("bit-docs-process-tags/get-parent"),
	tnd = require("bit-docs-type-annotate").typeNameDescription;




	module.exports = {
		add: function( line ) {
			var prevParam = this;
			// start processing

			var data = tnd(line);
			if(!data.name){
				print("LINE: \n" + line + "\n does not match @typedef [{TYPE}] NAME TITLE");
			}
			this.type = "module";
			this.title = data.description;
			delete data.description;

			for(var prop in data){
				this[prop] =  data[prop];
			}
			return ["scope", this];
		}
	};
