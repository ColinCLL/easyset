var ec = require("../ec.js");
// var ec = require("../build/easycharts.min.js");
var should = require("should");

describe("test/ec.test.js", function () {
    it("set color", function () {
        console.log(ec);
        // ec.setColor(["#aaa"],!!1);
        let bar = ec.barChart({
            easySet:{
                aa:123
            }
        });
        console.log(ec.barChart({}),123123);
    });
})