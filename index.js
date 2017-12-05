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
	q:'%23CSC365' ,
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
			let topThree = mix.getHighScores();
			let lastTweet = mix.tweets[mix.tweets.length-1];
			let user = tweetData.statuses[0].user.name;
			let text = tweetData.statuses[0].text;

			for(let i = 0; i < 5; i++){
				topThree = mix.getHighScores();
				lastTweet = mix.tweets.length-1;
				user = tweetData.statuses[i].user.name;
				text = tweetData.statuses[i].text;
				if(text != mix.tweets[lastTweet].text){
					
					mix.getUser(user, text, data.statuses[i].user.profile_image_url); //Store tweet
					mix.trackScores(tweetData.statuses[i].user.name); // look for cmd and change score accordingly

				}
			
			}

			res.json({
				allTweets: mix.tweets,
				price: mix.price,
				lastPrice: mix.lastPrice,
				topThree: topThree,
				allData: tweetData,
			});

		}else{
			console.log(error);
		}
	});
});


////////// CRYPTOWATCH DATA ///////////
let first = true;
app.get('/cryptowatch/data', function(req, res){
	request({
		url: 'https://api.cryptowat.ch/markets/gdax/btcusd/summary',
		timeout: 25 * 1000,
		method: 'GET'
	}, function(error, scode, body){
		let data = JSON.parse(body);

		// Game Module Calls
		if(first === true){
			mix.getPrice(data.result.price.last); //send price to storage
			console.log(data.result.price.last);
		}else{
			mix.getLastPrice(); // set the last price
			mix.getPrice(data.result.price.last); //send price to storage
			console.log(data.result.price.last);
		}
		first = false;

		res.json({
			price: data.result.price.last,
			high: data.result.price.high,
			low: data.result.price.low,
			change: data.result.price.change.percentage,
			volume: data.result.volume 

		});
	
	});

});

///////// CRYPTOWATCH PAGE ///////////
app.get('/cryptowatch', function(req, res){
	res.render('cryptowatch.pug', {title: 'cryptowatch'});
});


const server = app.listen('3003', function(){
	console.log(`server started on port ${server.address().port}`);
});
