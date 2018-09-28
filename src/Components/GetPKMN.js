export default class GetPKMN {
	constructor() {
		this.hasLocal = localStorage ? true : false;
		this.pokeList = [];

		this.makeCall = this.makeCall.bind(this);
	}

	makeCall(callType,id,pokeType) {


		return new Promise((resolve, reject) => {
			console.log('started the promise!');
			const xhr = new XMLHttpRequest();

			let storeType = null;
			let apiCallType = 'http://pokeapi.salestock.net/api/v2/'+callType+'/'+id;
			let list; 
			
			
			
			if(pokeType == 'index') {
				storeType = 'PKMNList';
			} else if(pokeType == 'pokemon') {
				storeType = 'pokemon'+id
			} else {
				storeType = pokeType;
			}

			const xhrCall = () => {
				xhr.open('GET',apiCallType,true);
				xhr.onload = () => {
					if(xhr.status >= 200 && xhr.status < 400) {
						list = xhr.response;

						if(this.hasLocal) {
							console.log(`Setting ${pokeType} into localStorage`);
							localStorage.setItem(storeType, list);

						} else {
							console.log('no local storage set');
						}
						resolve(JSON.parse(list));

					}
				}
				xhr.error = () => {
					console.log('failed at retriving ' + pokeType);
					reject(xhr.responseText);
				};

				xhr.send();				
			};

			if(this.hasLocal) {
				if(localStorage.getItem(storeType)) {
					console.log('getting it from localstorage');
					resolve(JSON.parse(localStorage.getItem(storeType)));
				} else {
					console.log('LocalStorage available, no data found, will be available in next load. Starting API call');
					xhrCall();
				}
			} else {
				console.log('No localStorage, starting API call');
				xhrCall();
			}
		})
	}
}