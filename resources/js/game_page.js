'use strict';
getTweets();

setInterval(function(){
	getTweets();
}, 5* 1000);

function getTweets () {
	
	let xhrTweets = new XMLHttpRequest();
	xhrTweets.open('GET', 'http://localhost:3003/gamepage/twitter', true);
	xhrTweets.addEventListener('load', function(){
		console.log('loaded');
		getPrice();
		let data = JSON.parse(xhrTweets.response);
		let mostRecent = data.allTweets.length-1;
		//console.log('DATA++++++++++++');
		console.log(data);
		//console.log('TWEETS++++++++++++');
		//console.log(data.allTweets);
		//console.log('PRICES++++++++++');
		//console.log('THIS PRICE');
		//console.log(data.price);
		//console.log('LAST PRICE');
		//console.log(data.lastPrice);
		//console.log(data.scores);
		
		let replylist = data.allTweets;
		let liststart = 0;
		let listend = 0;


		if(replylist.length>=10){
			
			liststart = replylist.length-10;
			listend = replylist.length 
		}else{
			listend = replylist.length;
		}

		let oldContainer = document.getElementById('gameresults');
		let newContainer = document.createElement('div');
		newContainer.setAttribute('id', 'gameresults');
		document.getElementById('resultcontainer').replaceChild(newContainer, oldContainer);

		for(let i =liststart; i < listend; i++){
			let score = data.allTweets[i].userScore;
			score *= 100;
			let resultDisplay = document.createElement('div');
			resultDisplay.setAttribute('class', 'tweetContainer');
			let newTweet = document.createElement('p');
			let tweetUser = document.createElement('p');
			let newPrice = document.createElement('p');
			let image = document.createElement('img');
			image.setAttribute('src', data.allTweets[i].img)
			let displayText = document.createTextNode(data.allTweets[i].text);
			let displayUser = document.createTextNode(data.allTweets[i].user);
			let displayPrice = document.createTextNode(score.toFixed(2));

			newContainer.prepend(resultDisplay);
			resultDisplay.appendChild(tweetUser);
			resultDisplay.appendChild(image);
			resultDisplay.appendChild(newTweet);
			resultDisplay.appendChild(newPrice);
			newTweet.appendChild(displayText);
			tweetUser.appendChild(displayUser);
			newPrice.appendChild(displayPrice);
		}
		
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
		console.log('loaded price');

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
