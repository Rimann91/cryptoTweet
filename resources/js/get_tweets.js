'use strict';

getTweets();
//setInterval(function(){
//	getTweets();
//}, 5000);
//place interval function here
//


function getTweets(){

	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:3003/tweets/tweetData', true);
	xhr.addEventListener('load', function(){
		console.log('loaded TWEETS');
		let data = JSON.parse(xhr.response);
		
		for(let i=0;i<12;i++){
			let newTweet = document.createElement('p'),
				username = data.tweetData[i].user.name,
				text = data.tweetData[i].text;
			newTweet.innerHTML = username+': '+text;
			document.getElementById('tweets').appendChild(newTweet);
		}

		
	});

	xhr.timeout = 15 * 1000;
	xhr.addEventListener('timeout', function(data){
		console.log('timeout');
		console.error(data);
	});
	xhr.send();
}


