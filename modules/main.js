'use strict';

let mix = {};
mix.tweets = [{user:'John', text:'long' },{user:'John2', text:'long' },{user:'John3', text:'long' },{user:'John4', text:'long' },{user:'John5', text:'long' },{user:'John6', text:'long' },{user:'John7', text:'long' },];
mix.price = 0;
mix.lastPrice = 0;
//mix.scores = [];

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

mix.getUser = function(user, text, img_url){
	function isUser(thisuser){
		return thisuser.user == user;
	}
	if(mix.tweets.find(isUser) !== undefined){
		
		let userData = mix.tweets.find(item => item.user == user);
		console.log('found user: '+ userData);
		return userData;
	}else{
		mix.tweets.push({user:user, text: text, userScore: 0, img: img_url});
		let userData = mix.tweets.find(item => item.user == user);
		console.log('created user: '+ JSON.stringify(userData));
		return userData;
	}

};


mix.trackScores = function(user){

	/* may need to add funtionality to retrieve
	more than 1 recent tweet */
	//mix.scores.push({user:user, userScore:0});
	
	let tweet = mix.tweets[mix.tweets.length-1].text;
	let difference = Math.abs(mix.price - mix.lastPrice);
	let thisUser = mix.getUser(user);
	console.log('this user: '+JSON.stringify(thisUser));
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

