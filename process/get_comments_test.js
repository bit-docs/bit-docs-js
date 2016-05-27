
var getComments = require("./get_comments");
var assert = require("assert");
var fs = require("fs");
var path = require("path");

describe("getComments", function(){

    it("able to get a comment directly after another comment (#62)", function(done){
        fs.readFile(path.join(__dirname,"test","comment_after_comment.js"), function(err, data){
            if(err) {
                return done(err);
            }
            var result = getComments(""+data);
            assert.deepEqual([
                { comment: ["a",""], code: "", line: 0},
                { comment: ["b",""], code: "", line: 3},
                { comment: ["c "], code: "", line: 6},
                { comment:  ["d",""], code: 'foo = "bar";', line: 8, codeLine: 11},
                { comment:  ["e",""], code: '', line: 12}
            ], result);
            done();
        });

    });

});
