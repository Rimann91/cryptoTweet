'use strict';

getPrice();

setInterval(function(){
	getPrice();
}, 5000);

function getPrice () {
	
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://localhost:3003/cryptowatch/data', true);
	xhr.addEventListener('load', function(){
		console.log('loaded');

		let data = JSON.parse(xhr.response), 

			price = data.price,
			high = data.high,
			low = data.low,
			change = data.change,
			volume = data.volume,

			preplace = document.getElementById('price'),
			hreplace = document.getElementById('high'),
			lreplace = document.getElementById('low'),
			creplace = document.getElementById('change'),
			vreplace = document.getElementById('volume'),

			pelem = document.createElement('p'),
			helem = document.createElement('span'),
			lelem = document.createElement('span'),
			celem = document.createElement('p'),
			velem = document.createElement('p');

		document.getElementById('price-container').replaceChild(pelem, preplace);
		document.getElementById('hl-container').replaceChild(helem, hreplace);
		document.getElementById('hl-container').replaceChild(lelem, lreplace);
		document.getElementById('change-container').replaceChild(celem, creplace);
		document.getElementById('volume-container').replaceChild(velem, vreplace);

		pelem.appendChild(document.createTextNode(price));
		helem.appendChild(document.createTextNode(high));
		lelem.appendChild(document.createTextNode(low));
		celem.appendChild(document.createTextNode(change));
		velem.appendChild(document.createTextNode(volume));

		pelem.setAttribute('id','price');
		helem.setAttribute('id','high');
		lelem.setAttribute('id','low');
		celem.setAttribute('id','change');
		velem.setAttribute('id','volume');
	});

	xhr.timeout = 15*1000;
	xhr.addEventListener('timeout', function(data){
		console.log('timeout');
		console.error(data);

	});

	xhr.send();
}


