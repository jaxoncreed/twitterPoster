var rita = require("rita");
var speakeasy = require("speakeasy-nlp");

var rs = rita.RiString("The elephant took a bite.");

var answer = function(question) {
    speakeasy.classify("What is your name?");
}

var args = process.argv.slice(2);
answer(args[0]);