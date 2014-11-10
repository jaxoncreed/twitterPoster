//
//  Bot
//  class for performing various twitter actions
//
var Twit = require('./node_modules/twit/lib/twitter');

var Bot = module.exports = function(config) { 
    this.twit = new Twit(config);
};

/*
 * Post a tweet
 * @param status: the text you will tweet.
 */
Bot.prototype.tweet = function (status, callback) {
    this.twit.post('statuses/update', { status: status }, callback);
};

/*
 * Search for tweets containting a word.
 * @param word: the word for which you wish to search
 * @param date: How recent the post should be (YYYY-MM-DD)
 * @param count: number of posts to return
 * @return Array of tweets
 */
Bot.prototype.searchWord = function(word, date, count, callback) {
    this.twit.get('search/tweets', { q: '#' + word + ' since:' + date, count: count }, callback);
}