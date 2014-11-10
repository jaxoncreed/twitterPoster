curWord = "world"

var twit = require("twit");
var Bot = require("./bot");
var config = require("./config1");
var rita = require("rita");

var bot = new Bot(config);

var post = function() {
    bot.searchWord(curWord, "2014-11-01", 50, function(err, data, res){
        if (err) {
            console.log("Error" + err);
            return;
        }
        var statusArr = [];
        var all = [];
        var nouns = [];
        var verbs = [];
        var adjs = [];
        var advs = [];
        var other = [];
        for (var i = 0; i < data.statuses.length; i++) {
            statusArr[i] = rita.RiString(data.statuses[i].text.replace('#','').replace('\\',''));
            //Take care of individual words
            for (var j = 0; j < statusArr[i].wordCount(); j++) {
                var pos = statusArr[i].posAt(j);
                if (wordQualifies(statusArr[i].wordAt(j).toLowerCase())) {
                    all[all.length] = statusArr[i].wordAt(j).toLowerCase();
                    if (pos.slice(0,2) == "nn") {
                        nouns[nouns.length] = statusArr[i].wordAt(j).toLowerCase();
                    } else if (pos.slice(0,2) == "vb") {
                        verbs[verbs.length] = statusArr[i].wordAt(j).toLowerCase();
                    } else if (pos.slice(0,2) == "jj") {
                        adjs[adjs.length] = statusArr[i].wordAt(j).toLowerCase();
                    } else if (pos.slice(0,2) == "rb") {
                        advs[advs.length] = statusArr[i].wordAt(j).toLowerCase();
                    } else {
                        other[other.length] = statusArr[i].wordAt(j).toLowerCase();
                    }
                }
            }
        }
        nouns = frequentElement(nouns);
        verbs = frequentElement(verbs);
        adjs = frequentElement(adjs);
        advs = frequentElement(advs);
        adjs.splice(nouns.indexOf("good"), 1);

        //Now make the sentence (noun adverb verb adjective noun)
        var sentence = nouns[random(5)] + " " + verbs[random(5)] + " " + adjs[random(5)] + " " + nouns[random(6, 10)] + ". #" + curWord;
        
        //Pick the next topic
        var rand = random(7);
        if (rand == 7) {
            curWord = advs[random(5)]
        } else if (rand == 6) {
            curWord = adjs[random(5)]
        } else if (rand == 5 || rand == 4) {
            curWord = verbs[random(5)]
        } else {
            curWord = nouns[random(5)];
        }
        console.log(sentence);
        bot.tweet(sentence, function(err, parsed, res) {});
    });
}

setInterval(function() {
    post();
}, 30 * 60 * 1000);

function random(a, b) {
    if (typeof(b) == "undefined") {
        b = 1;
    }
    return Math.floor((Math.random() * a) + b);
}

function wordQualifies(word) {
    if (word.indexOf('/') > -1) {
        return false;
    }
    if (word == curWord) {
        return false;
    }
    if (word == 'http') {
        return false;
    }
    if (word == 'rt') {
        return false;
    }
    return true;
}

function frequentElement(arr) {
    var map = {};
    for (var i = 0; i < arr.length; i++) {
        if (typeof(map[arr[i]]) != 'undefined') {
            map[arr[i]]++;
        } else {
            map[arr[i]] = 1;
        }
    }
    //Sort the words
    var sorted = [];
    while (Object.keys(map).length > 0) {
        var greatest = greatestNumInMap(map);
        delete map[greatest];
        sorted[sorted.length] = greatest;
    }
    return sorted;
}
function greatestNumInMap(map) {
    var mostNum = 0;
    var mostWord = '';
    for(key in map) {
        if (map[key] > mostNum) {
            mostNum = map[key];
            mostWord = key;
        }
    }
    return mostWord;
}