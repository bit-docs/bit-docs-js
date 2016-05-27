var processCode = require("./code"),
    propertyTag = require("./test_property_tag"),
    assert = require("assert");

describe("code", function(){

    it("basics",function(){
        var tags = {
            constructor: {
                codeMatch: /some constructor/,
                code: function(code, scope, objects){
                    return {
                        type: "constructor",
                        name: "Bar"
                    };
                },
                codeScope: true
            },
            property: propertyTag
        };
        var docMap = {Foo: {name: "Foo",type: "constructor"}};
        processCode({
            code: "some constructor",
            docMap: docMap,
            scope: docMap.Foo,
            tags: tags
        }, function(constructorDoc, constructorScope){
            assert.equal(constructorDoc, constructorScope, "scope is the constructor");

            processCode({
                code: "prop = 'something'",
                scope: constructorScope,
                docMap: docMap,
                tags: tags
            }, function(propDoc, propScope){
                assert.equal(propScope, constructorScope, "prop doesn't change scope");
                assert.equal(propDoc.name,"Bar.prop");
                assert.equal(propDoc.parent,"Bar");

            });

        });
    });

});
