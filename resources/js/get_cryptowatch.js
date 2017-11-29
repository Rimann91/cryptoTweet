'use strict';

getPrice();
setInterval(function(){
	getPrice();
}, 5000);

function getPrice () {
	
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:3003/cryptowatch/price', true);
	xhr.addEventListener('load', function(){
		console.log('loaded');

		let data = JSON.parse(xhr.response), 
			replace = document.getElementById('price'),
			info = document.createElement('p');

		info.setAttribute('id', 'price');
		document.getElementById('price-container').replaceChild(info, replace);
		let infoContent = document.createTextNode(data.price);
		info.appendChild(infoContent);
	});

	xhr.timeout = 15*1000;
	xhr.addEventListener('timeout', function(data){
		console.log('timeout');
		console.error(data);

	});

	xhr.send();
}


