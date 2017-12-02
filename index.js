'use strict';

let express = require('express'),
	request = require('request'),
	app = express(),
	mix = require('./modules/main.js'),
	twitter = require('twitter');

app.use(express.static('resources'));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res){
	res.render('landing.pug');
});

//////// Game Page ///////////
//
app.get('/gamepage', function(req, res){
	res.render('gamepage.pug', {title: 'cryptowatch'});
});

let client = new twitter({
	consumer_key: 'vdWTJhnyNnJHpmKsxaHOYd0rc',
	consumer_secret: 'uzPM3ReKkzp6EQNNJBGvhlkoPF3Wtn9YbpYsMjjEwXjZ2myJ8G',
	access_token_key: '1691616895-gT32hIMUfD68jO6eFkKYc6Eyr6TUOFJNeEI3kkA',
	access_token_secret: 'DNYUVop2egaQ6p9uKYunODLjFpPDJjlE0DCvJbSQU6nEn'
});

let params = {
	screen_name: 'rimannnhs',
	q: 'long',//q:'%23CSC365' ,
	q: 'short',
	include_entities: 'true',
	with_user_id: 'true',
	type: 'recent'
};

app.get('/gamepage/twitter', function(req, res){

	let tweetData = {};
	client.get('search/tweets.json', params, function(error, tweets, response){

		let data = JSON.parse(response.body);
		
		if(!error) {
			tweetData.statuses = data.statuses; 	

			// Game Module Calls

			let lastTweet = mix.tweets.length-1;
			console.log(lastTweet);
			let user = tweetData.statuses[0].user.name;
			let text = tweetData.statuses[0].text;
			if(text != mix.tweets[lastTweet].text){
				
				mix.getUser(user, text, data.statuses[0].user.profile_image_url); //Store tweet
				let last = mix.lastPrice;
				console.log('last price: '+ last);
				console.log('this price:'+ mix.price)
				mix.trackScores(tweetData.statuses[0].user.name); // look for cmd and change score accordingly
			
			}

			let score = mix.getScoreByName(user).userScore;
			res.json({
				allTweets: mix.tweets,
				price: mix.price,
				lastPrice: mix.lastPrice,
				allData: tweetData
			});

			//console.log(mix.tweets);

		}else{
			console.log(error);
		}
		//console.log(data.statuses);
	});
});

app.get('/gamepage/cryptowatch', function(req, res){
	request({
		url: 'https://api.cryptowat.ch/markets/gdax/btcusd/price',
		timeout: 25 * 1000,
		method: 'GET'
	}, function(error, scode, body){
		let data = JSON.parse(body);
		
		//console.log('cost: '+data.allowance.cost);
		//console.log('remaining: '+data.allowance.remaining);

		// Game Module Calls
		console.log(data);
		mix.getLastPrice(); // set the last price
		mix.getPrice(data.result.price); //send price to storage
		
		res.json({
			//price: mix.price,
		});

	});

});



//////// TWEET PAGE //////////
/*
let client = new twitter({
	consumer_key: 'vdWTJhnyNnJHpmKsxaHOYd0rc',
	consumer_secret: 'uzPM3ReKkzp6EQNNJBGvhlkoPF3Wtn9YbpYsMjjEwXjZ2myJ8G',
	access_token_key: '1691616895-gT32hIMUfD68jO6eFkKYc6Eyr6TUOFJNeEI3kkA',
	access_token_secret: 'DNYUVop2egaQ6p9uKYunODLjFpPDJjlE0DCvJbSQU6nEn'
});

let params = {
	screen_name: 'rimannnhs',
	q:'%23CSC365' ,
	include_entities: 'true',
	with_user_id: 'true'
};

app.get('/tweets/tweetData', function(req, res){
	client.get('search/tweets.json', params, function(error, tweets, response){
		
		let data = JSON.parse(response.body);

		if(!error) {
			for(let i = 0; 12>i; i++){
				console.log(data.statuses[i].user.name+': '+data.statuses[i].text);
			}
		}else{
			console.log(error);
		}
		console.log(data.statuses);
		
	});
});

app.get('/tweets', function(req, res){
	res.render('tweets.pug');
});

/*
app.get('/tweets/data', function(req, res){
});
*/

//////// CRYPTOWATCH PAGE ///////////
app.get('/cryptowatch', function(req, res){
	res.render('cryptowatch.pug', {title: 'cryptowatch'});
});

app.get('/cryptowatch/price', function(req, res){

	request({
		url: 'https://api.cryptowat.ch/markets/gdax/btcusd/price',
		timeout: 25 * 1000,
		method: 'GET'
	}, function(error, scode, body){
		let data = JSON.parse(body);
		console.log('cost: '+data.allowance.cost);
		console.log('remaining: '+data.allowance.remaining);
		res.json({
			price: JSON.stringify(data.result.price)

		});
	});

});
const server = app.listen('3003', function(){
	console.log(`server started on port ${server.address().port}`);
});
