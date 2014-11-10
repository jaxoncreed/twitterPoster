//
//  RTD2 - Twitter bot that tweets about the most popular github.com news
//  Also makes new friends and prunes its followings.
//
var Bot = require('./bot')
  , config1 = require('./config1');

var bot = new Bot(config1);

console.log('RTD2: Running.');

bot.tweet("Test Tweet", function(err, thing) {
    console.log("Error: " + err + thing);
});