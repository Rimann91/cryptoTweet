'use strict';

let mix = {};

mix.tweets = [{user:'John Doe', text:'long', userScore: 0 }];
mix.price = 0;
mix.lastPrice = 0;
mix.userScores = {};
mix.highScores = [];

mix.getTweets = function(user, tweet){
	mix.tweets.push({user:user, text:tweet});
};


mix.getPrice = function(price){
	mix.price = price;
};

mix.getLastPrice = function(){
	mix.lastPrice = mix.price;
};

mix.getScoreByName = function(user){
	// Returns the OBJECT in mix.scores with the given user name
	const name = mix.tweets.find(item => item.user == user);
	return name;
};

mix.getHighScores = function(){


	let length = mix.tweets.length;
	let highscores = [];
	let hslength = 0;
	let userscores = {};
	let topThree = {};

	for(let i = 0; i < length; i++){
		let thisUserName = mix.tweets[i].user;
		userscores[thisUserName] = mix.tweets[i].userScore;
	}
	for(const user in userscores){
		highscores.push([user, userscores[user]]);
	}
	
	highscores = highscores.sort(function(a,b){
		return b[1] - a[1];
	});

	if(highscores.length < 3){
		hslength = highscores.length-1;
	}else{hslength = 2;}

	for(let i = 0; i<=hslength; i++){
		topThree[highscores[i][0]] = highscores[i][1];
	}

	console.log(highscores);
	console.log(topThree);
	return topThree;
};

mix.getUser = function(user, text, img_url){
	function isUser(thisuser){
		return thisuser.user == user;
	}
	if(mix.tweets.find(isUser) !== undefined){
		
		let userData = mix.tweets.find(item => item.user == user);
		return userData;
	}else{
		mix.tweets.push({user:user, text: text, userScore: 0, img: img_url});
		let userData = mix.tweets.find(item => item.user == user);
		return userData;
	}

};


mix.trackScores = function(user){

	/* may need to add funtionality to retrieve
	more than single  recent tweet */
	
	let tweet = mix.tweets[mix.tweets.length-1].text;
	let difference = (Math.abs(mix.price - mix.lastPrice)*10);
	let thisUser = mix.getUser(user);
	let cmdLong = tweet.search('long');
	let cmdShort = tweet.search('short');

	if(cmdLong > -1){
		console.log('found long');
		if(mix.price > mix.lastPrice){
			// User + difference
			thisUser.userScore += difference.toFixed(0);
		}else{
			// user - difference
			thisUser.userScore -= difference.toFixed(0);
		}
	}else if(cmdShort > -1){
		console.log('found short');
		if(mix.price < mix.lastPrice){
			// user + difference
			thisUser.userScore += difference.toFixed(0);
		}else{
			// user - difference
			thisUser.userScore -= difference.toFixed(0);
		}
	}
	console.log('diff: '+difference);
	console.log('user score: '+thisUser.userScore);
};


module.exports = mix;

