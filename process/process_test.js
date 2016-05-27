var processJavaScript = require("./javascript"),
	processTags = require("bit-docs-process-tags"),

	getComments = require("./get_comments"),

	propertyTag = require("./test_property_tag"),

	assert = require("assert"),
	tags = require("../tags/tags"),
	fs = require("fs"),
	path = require("path");




describe("bit-docs-js", function(){

	require("./get_comments_test");
	require("./code_test");

	describe("processTags", function(){

		it("adds to parent",function(){
			var docMap = {Foo: {name: "Foo",type: "constructor"}};

			processTags({
				comment: "@property {Object} tags Tags for something",
				scope: docMap.Foo,
				docMap: docMap,
				docObject: {},
				tags: {property: propertyTag}
			},function(newDoc, newScope){
				assert.equal(newScope, docMap.Foo, "same scope scope");
				assert.equal(newDoc.name, "Foo.tags");
			});
		});

		it("change scope", function(){
			var tags = {
				constructor: {
					add : function(){
						this.name = "constructed";
						this.type = "constructor";
						return ["scope",this];
					}
				},
				parent: {
					add: function(){
						this.parent = "parented"
					}
				},
				property: propertyTag
			};

			var docMap = {Foo: {name: "Foo",type: "constructor"}},
				props = {};

			processTags({
				comment:   ["@constructor",
							"@parent tang"],
				scope: docMap.Foo,
				docMap: docMap,
				docObject: props,
				tags: tags
			},function(newDoc, newScope){
				assert.equal(newDoc, newScope, "new doc item is new scope");
				assert.equal(newDoc, props, "props is the new doc object");

				assert.deepEqual(newDoc,{
					name: "constructed",
					type: "constructor",
					parent: "parented",
					body: "",
					description: ""
				});
			});

		});

		var example = {
			add: function(line){
				return {
					lines: []
				};
			},
			addMore: function(line, curData) {
				curData.lines.push(line);
			},
			end: function( curData ){
				this.body += "```\n"+curData.lines.join("\n")+"\n```\n";
			}
		};

		it("is able to end a current tag", function(){

			var docMap = {Foo: {name: "Foo",type: "constructor"}};

			processTags({
				comment: [
					"@property {Object} tags Tags for something",
					"description",
					"",
					"body",
					"@example",
					"_.extend()",
					"@example",
					"_.clone()",
					"@body",
					"endbody"
				].join("\n"),
				scope: docMap.Foo,
				docMap: docMap,
				docObject: {},
				tags: {
					property: propertyTag,
					example: example,
					body: {
						add: function( line ) {
							return ["default","body"];
						}
					}
				}
			},function(newDoc, newScope){
				assert.equal(newDoc.body, '\nbody\n```\n_.extend()\n```\n```\n_.clone()\n```\nendbody\n');
			});

		});

		it("ends a current tag that is the last tag",function(){
			var docMap = {Foo: {name: "Foo",type: "constructor"}};

			processTags({
				comment: [
					"@property {Object} tags Tags for something",
					"description",
					"",
					"body",
					"@example",
					"_.extend()",
				].join("\n"),
				scope: docMap.Foo,
				docMap: docMap,
				docObject: {},
				tags: {
					property: propertyTag,
					example: example,
					body: {
						add: function( line ) {
							return ["default","body"];
						}
					}
				}
			},function(newDoc, newScope){
				assert.equal(newDoc.body, '\nbody\n```\n_.extend()\n```\n');
			});
		});

		it("handles indentation", function(done){
			fs.readFile(
				path.join(__dirname,"test","indentation.md"),
				function(err, content){

					if(err) {
						return done(err);
					}

					var docMap = {};

					processTags({
						comment: ""+content,
						scope: {},
						docMap: docMap,
						docObject: {},
						tags: tags
					},function(newDoc, newScope){

						var options = newDoc.params[0].types[0].options,
							func = options[0].types[0],
							returns = func.returns;

						// return indentation
						assert.deepEqual(returns.types[0], {type:"Boolean"},"return indented inside function option");
						assert.deepEqual(newDoc.returns.types[0], {type: "String"}, "not indented normal return still works");

						// option
						var barOptions = options[1].types[0].options;
						assert.deepEqual(barOptions, [
							{name: "first", types: [{type: "String"}], description: "\n"},
							{name: "second", types: [{type: "String"}], description: "\n"}
						]);

						// param
						assert.equal(func.params[0].description, "newName description.\n", "params in params");

						// context / @this
						assert.equal(func.context.description,"An object\na\n", "a description");

						done();
					});

				});
		});

		var makeDescription = function( comment, cb ){
			var docMap = {Foo: {name: "Foo",type: "constructor"}},
				props = {};

			var tags = {
				constructor: {
					add : function(){
						this.name = "constructed";
					}
				}
			};

			processTags({
				comment:   comment,
				scope: docMap.Foo,
				docMap: docMap,
				docObject: props,
				tags: tags
			},cb);
		};


		it("description",function(){

			makeDescription(
				["This is a description.",
				 "Another line."], function(newDoc){
					assert.equal(newDoc.description, "This is a description.\nAnother line.\n")
			});

		});


		it("description then body",function(){

			makeDescription(
				["This is a description.",
				 "Another line.",
				 "",
				 "the body"], function(newDoc){
					assert.equal(newDoc.description, "This is a description.\nAnother line.\n");

					assert.equal(newDoc.body, "\nthe body\n");
			});

		});

	});




	describe("processJavaScript", function(){

		var makeAddToDocMap = function(docMap) {
			return function(docObject){
				docMap[docObject.name] = docObject;
			}
		};
		// no longer works because @prototype is fixed, but not sure how to still errors this without creating
		// an evil tag
		/*it.only("processJavaScript errors if name is changed", function(){
			assert.throws(function(){
				processJavaScript("/** @constructor foo.bar *"+"/\n// \n/** @add foo.bar\n@prototype *"+"/",{},"foo.js");
			}, function(e){
				console.log(e);
				return e.message.indexOf("Changing name") >= 0;
			});
		});*/
		it("@prototype adds its own object", function(){
			var docMap = {};
			processJavaScript("foo.js",
				"/** @constructor foo.bar *"+"/\n// \n/** @add foo.bar\n@prototype *"+"/",docMap,{tags: tags},makeAddToDocMap(docMap));
			assert.ok(docMap["foo.bar"], "foo.bar exists");
			assert.ok(docMap["foo.bar.prototype"], "foo.bar.prototype exists");
		});

		/* TODO: add to process mustache
		it("processing mustache files", function(){
			var docMap = {};
			var originalRenderer = function(){};
			originalRenderer.layout = function(data){
				return data.content;
			};
			originalRenderer.Handlebars =Handlebars;
			processJavaScript("{{name}}",docMap,"foo.mustache");
			assert.ok(docMap.foo.renderer, "got renderer");

			var result = docMap.foo.renderer(docMap.foo, originalRenderer);
			assert.equal(result,"foo", "got back holler");
		});*/

		// TODO: add to process mustache
        //it("correctly names nested files", function(){
        //    var docMap = {};
        //    var mustache = path.join("docs","theme","templates","layout.mustache");
        //    processJavaScript("{{name}}", docMap, mustache);
        //    assert.ok(docMap.layout, "got mustache");
		//
        //    var markdown = path.join("nested", "viewmodel.md");
        //    processJavaScript("/* */", docMap, markdown);
        //    assert.ok(docMap.viewmodel, "got markdown");
        //});

		/** TODO: add a test
		it("end is not called twice", function(){
			var docMap = {};
			var timesCalled = 0;
			tags.foo = {done: function(){
				timesCalled++;
			}};
			processJavaScript("/** @constructor foo.bar *"+"/\n// \n/** @add foo.bar *"+"/",docMap,"foo.js");

			assert.equal(timesCalled, 0, "done should only be called at the end");

			finalizeDocMap(docMap,tags);
			assert.equal(timesCalled, 1, "done should only be called at the end");

		});*/

		it("can document a module with multiple exports", function(done){
			fs.readFile(path.join(__dirname,"test","module_with_multiple_exports.js"), function(err, data){
				if(err) {
					return done(err);
				}
				var docMap = {};
				processJavaScript("utils/math.js", ""+data,docMap, {tags: tags},makeAddToDocMap(docMap));
				assert.ok(docMap["utils/math"], "got the module");
				assert.ok(docMap["utils/math.sum"], "got the sum docObject");
				assert.ok(docMap["utils/math.constants"], "got the constants docObject");

				done();
			});

		});

		it("can document a module that exports a single function", function(done){
			fs.readFile(path.join(__dirname,"test","module_with_single_export_function.js"), function(err, data){
				if(err) {
					return done(err);
				}
				var docMap = {};
				processJavaScript("utils/add.js", ""+data,docMap, {tags: tags},makeAddToDocMap(docMap));

				assert.equal(docMap["utils/add"].types[0].params[0].name, "first", "got a param");
				assert.equal(docMap["utils/add"].types[0].params[1].name, "second", "got a param");

				done();
			});
		});


		it("@function and @property assumes a parent name", function(done){
			fs.readFile(path.join(__dirname,"test","function_assumes_parent_name.js"), function(err, data){
				if(err) {
					return done(err);
				}
				var docMap = {};
				processJavaScript("utils/date-helpers.js", ""+data,docMap, {tags: tags},makeAddToDocMap(docMap));
				//console.log(docMap);
				assert.ok(docMap["util/date-helpers"], "date-helpers object");
				assert.ok(docMap["util/date-helpers.isTomorrow"], "util/date-helpers.isTomorrow object");
				assert.ok(docMap["util/date-helpers.isYesterday"], "util/date-helpers.isYesterday object");
				assert.ok(docMap["util/date-helpers.isNext"], "util/date-helpers.isNext object");

				assert.ok(docMap["util/date-helpers.tomorrow"], "util/date-helpers.tomorrow object");
				assert.ok(docMap["util/date-helpers.yesterday"], "util/date-helpers.yesterday object");
				assert.ok(docMap["util/date-helpers.next"], "util/date-helpers.next object");

				// assert parents
				assert.equal(docMap["util/date-helpers.isTomorrow"].parent ,"util/date-helpers", "util/date-helpers.isTomorrow parent");
				assert.equal(docMap["util/date-helpers.isYesterday"].parent ,"util/date-helpers", "util/date-helpers.isYesterday parent");
				assert.equal(docMap["util/date-helpers.isNext"].parent ,"util/date-helpers", "util/date-helpers.isNext parent");

				assert.equal(docMap["util/date-helpers.tomorrow"].parent ,"util/date-helpers", "util/date-helpers.tomorrow parent");
				assert.equal(docMap["util/date-helpers.yesterday"].parent ,"util/date-helpers", "util/date-helpers.yesterday parent");
				assert.equal(docMap["util/date-helpers.next"].parent ,"util/date-helpers", "util/date-helpers.next parent");


				done();
			});
		});



		it("processJavaScript provides filename and line if available to tags", function(done){
			var count = 0;
			tags.filetest = {
				add: function(line, curData, scope, docMap){
					this.type = "filetest";
					this.name ="filetest"+(++count);
					assert.ok(this.src.path,"a src");
					assert.equal(typeof this.src.line, "number","a line");
				}
			};

			fs.readFile(path.join(__dirname,"test","filename_and_line.js"), function(err, data){
				if(err) {
					return done(err);
				}

				var docMap = {};
				processJavaScript("utils/date-helpers.js", ""+data,docMap, {tags: tags},makeAddToDocMap(docMap));
				done();
			});

		});


		it("keeps options.docObject's src and  line", function(done){
			var count = 0;
			tags.filetest = {
				add: function(line, curData, scope, docMap){
					this.type = "filetest";
					this.name ="filetest"+(++count);
					assert.ok(this.src.path,"a src");
					assert.ok(this.src.codeLine, "got the codeLine");
					assert.equal(typeof this.src.line, "number","a line");
				},
				codeMatch: function( code ) {
					return true;
				},
				code: function( code, scope, docMap ) {
					return {
						type: "filetest"
					};
				}
			};

			fs.readFile(path.join(__dirname,"test","filename_and_line.js"), function(err, data){
				if(err) {
					return done(err);
				}

				var docMap = {};
				processJavaScript("utils/date-helpers.js", ""+data,docMap, {tags: tags},makeAddToDocMap(docMap));
				done();
			});
		});
	});
});
