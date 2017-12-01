'use strict';

let mix = {};
mix.tweets = [];
mix.price = 0;
mix.lastPrice = 0;
mix.scores = [];

mix.getTweets = function(user, tweet){
	mix.tweets.push({user:user, text:tweet});
	mix.scores.push({user:user, userScore:0});
};

mix.getPrice = function(price){
	mix.price = price;
};

mix.getLastPrice = function(){
	mix.lastPrice = mix.price;
};

mix.getScoreByName = function(user){
	// Returns the OBJECT in mix.scores with the given user name
	const name = mix.scores.find(item => item.user == user);
	return name;
};


mix.trackScores = function(user){

	/* may need to add funtionality to retrieve
	more than 1 recent tweet */
	let tweet = mix.tweets[mix.tweets.length-1].text;
	let difference = Math.abs(mix.price - mix.lastPrice);
	let thisUser = mix.getScoreByName(user);
	let cmdLong = tweet.search('long');
	let cmdShort = tweet.search('short');

	if(cmdLong > -1){
		console.log('found long');
		if(mix.price > mix.lastPrice){
			// User + difference
			thisUser.userScore += difference;
		}else{
			// user - difference
			thisUser.userScore -= difference;
		}
	}else if(cmdShort > -1){
		console.log('found short');
		if(mix.price < mix.lastPrice){
			// user + difference
			thisUser.userScore += difference;
		}else{
			// user - difference
			thisUser.userScore -= difference;
		}
	}
	console.log('diff: '+difference);
	console.log('user score: '+thisUser.userScore);
};


module.exports = mix;

