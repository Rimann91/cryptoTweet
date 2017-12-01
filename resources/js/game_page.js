'use strict';

getTweets();
getPrice();

setInterval(function(){
	getTweets();
}, 10* 1000);

function getTweets () {
	
	let xhrTweets = new XMLHttpRequest();
	xhrTweets.open('GET', 'http://localhost:3003/gamepage/twitter', true);
	xhrTweets.addEventListener('load', function(){
		console.log('loaded');
		//getPrice();
		let data = JSON.parse(xhrTweets.response);
		let mostRecent = 0//data.allTweets.length-1;
		console.log(data);
		console.log(data.allTweets);
		console.log(data.price);
		console.log(data.scores);

		let oldContainer = document.getElementById('gameresults');
		let newContainer = document.createElement('div');
		newContainer.setAttribute('id', 'gameresults');
		document.getElementById('resultcontainer').replaceChild(newContainer, oldContainer);

		let resultDisplay = document.createElement('div');
		resultDisplay.setAttribute('class', 'tweetContainer');
		let newTweet = document.createElement('p');
		let tweetUser = document.createElement('p');
		let newPrice = document.createElement('p');
		let displayText = document.createTextNode(data.allTweets[mostRecent].text);
		let displayUser = document.createTextNode(data.allTweets[mostRecent].user);
		let displayPrice = document.createTextNode(data.price);

		newContainer.appendChild(resultDisplay);
		resultDisplay.appendChild(tweetUser);
		resultDisplay.appendChild(newTweet);
		resultDisplay.appendChild(newPrice);
		newTweet.appendChild(displayText);
		tweetUser.appendChild(displayUser);
		newPrice.appendChild(displayPrice);
		
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

		//let data = JSON.parse(xhrPrice.response);
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
