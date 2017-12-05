'use strict';
getTweets();
getPrice();
setInterval(function(){
	getTweets();
}, 4* 1000);

function getTweets () {
	
	let xhrTweets = new XMLHttpRequest();
	xhrTweets.open('GET', 'http://localhost:3003/gamepage/twitter', true);
	xhrTweets.addEventListener('load', function(){
		console.log('loaded');
		getPrice();
		let data = JSON.parse(xhrTweets.response);
		let replylist = data.allTweets;
		let liststart = 0;
		let listend = 0;


		if(replylist.length>=10){
			
			liststart = replylist.length-10;
			listend = replylist.length ;
		}else{
			listend = replylist.length;
		}

		let oldContainer = document.getElementById('gameresults');
		let newContainer = document.createElement('div');
		newContainer.setAttribute('id', 'gameresults');
		document.getElementById('resultcontainer').replaceChild(newContainer, oldContainer);

		for(let i =liststart; i < listend; i++){

			////// UPDATE BTC PRICE DISPLAY ////////
			let newprice = document.createElement('p');
			newprice.setAttribute('id','price');
			let btcprice = document.createTextNode(`1 BTC = $${data.price}`);
			let oldprice = document.getElementById('price');
			let priceContainer = document.getElementById('priceDisplay');

			////// UPDATE HIGHSCORES //////////////
			let hsContainer = document.getElementById('hsContainer');
			let newHighs = document.createElement('div');
			newHighs.setAttribute('id', 'hs');
			let oldHighs = document.getElementById('hs');
			for(const prop in data.topThree){
				let element = document.createElement('p');
				element.setAttribute('class', 'ahs');
				let displayhs = document.createTextNode(`${prop}: ${data.topThree[prop]}`);
				newHighs.appendChild(element);
				element.appendChild(displayhs);

			}

			////// UPDATE TWEET FEED //////////////
			let score = data.allTweets[i].userScore;
			let resultDisplay = document.createElement('div');
			resultDisplay.setAttribute('class', 'columns');


			let newTweet = document.createElement('p');
			let tweetUser = document.createElement('p');
			let newScore = document.createElement('p');
			let image = document.createElement('img');
			let idColumn = document.createElement('div');
			idColumn.setAttribute('class', 'column');
			idColumn.setAttribute('id', 'tweetID');
			resultDisplay.appendChild(idColumn);
			idColumn.appendChild(image);
			idColumn.appendChild(tweetUser);
			let submitDisplay = [newTweet, newScore];

			submitDisplay.forEach(function(item, index){
				let column = document.createElement('div');
				column.setAttribute('class', 'column');
				column.setAttribute('id', 'result'+index);
				resultDisplay.appendChild(column);
				column.appendChild(item);

			});

			image.setAttribute('src', data.allTweets[i].img);
			let displayText = document.createTextNode(data.allTweets[i].text);
			let displayUser = document.createTextNode(data.allTweets[i].user);
			let displayPrice = document.createTextNode(score);

			////// PLACE ALL UPDATED NODES ON DOM ////////
			newprice.appendChild(btcprice);
			priceContainer.replaceChild(newprice, oldprice);
			
			hsContainer.replaceChild(newHighs, oldHighs);	
			
			newContainer.prepend(resultDisplay);
			let points = document.getElementById('result1');
			console.log(data.cmd);
			if(score > 0){
				points.setAttribute('id', 'add');
			}else if(score < 0){
				points.setAttribute('id', 'subtract');
			}

			newTweet.appendChild(displayText);
			tweetUser.appendChild(displayUser);
			newScore.appendChild(displayPrice);
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
	xhrPrice.open('GET', 'http://localhost:3003/cryptowatch/data', true);
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
