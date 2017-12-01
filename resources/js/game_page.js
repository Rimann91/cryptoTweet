'use strict';

getTweets();
getPrice();

//setInterval(function(){
//	getPrice();
//}, 5000);

function getTweets () {
	
	let xhrTweets = new XMLHttpRequest();
	xhrTweets.open('GET', 'http://localhost:3003/gamepage/twitter', true);
	xhrTweets.addEventListener('load', function(){
		console.log('loaded');

		let data = JSON.parse(xhrTweets.response);
		console.log(data);
		console.log(data.allTweets);
		console.log(data.price);
		console.log(data.scores);

		let parent = document.getElementById('gameresults');
		let displayText = document.createTextNode(data.allTweets[0].text);
		let displayPrice = document.createTextNode(data.price);
		parent.appendChild(displayText);
		parent.appendChild(displayPrice);

		
	});

	xhrTweets.timeout = 15*1000;
	xhrTweets.addEventListener('timeout', function(data){
		console.log('timeout');
		console.error(data);

	});

	xhrTweets.send();
}

function getPrice () {
	
	let xhrPrice = new XMLHttpRequest();
	xhrPrice.open('GET', 'http://localhost:3003/gamepage/cryptowatch', true);
	// May not need this onload function
	xhrPrice.addEventListener('load', function(){
		console.log('loaded');

		let data = JSON.parse(xhrPrice.response);
		//console.log(data.price);

		//let parent = document.getElementById('gameResults');
		
	});

	xhrPrice.timeout = 15*1000;
	xhrPrice.addEventListener('timeout', function(data){
		console.log('timeout');
		console.error(data);

	});

	xhrPrice.send();
}
