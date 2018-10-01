export default class GetPKMN {

	constructor() {
		this.hasLocal = localStorage ? true : false; // Checks if localStorage is available 
		this.pokeList = [];

		this.makeCall = this.makeCall.bind(this);
	}

	/*
			makeCall

			callType = Allows use of any sort of endpoint that needs to be used to access the API
									ie /pokemon, /berries/, /regions. 
			
			id = API end point, flexible to allow for offset pagnation for index ****
			
			pokeType = String input that is involve in retriving data from localStorage (if available).
						
			
			Future features -- 

			Better localStorage mem usage. 
				- Initial pokemon list stays.
				- Individual pages expire (sessionStorage).


			*** API pagniation is down on PokeAPI side.
					Currently downloading entire pokemon list until 
					PokeAPI bug is fixed.

	*/

	makeCall(callType,id,pokeType) {
		const results = new Promise((resolve, reject) => {
			console.log('started the promise!');
			const xhr = new XMLHttpRequest();

			let storeType = null;
			let apiCallType = 'https://pokeapi.co/api/v2/'+callType+'/'+id+'/';
			let list; 
			
			console.log(apiCallType);
			
			if(pokeType == 'index') {
				storeType = 'PKMNList';
			} else {
				storeType = pokeType+id;
			}

			const xhrCall = () => {
				xhr.open('GET',apiCallType,true);
				xhr.onload = () => {
					if(xhr.status >= 200 && xhr.status < 400) {
						list = xhr.response;

						if(this.hasLocal) {
							if(storeType != 'PKMNList') {
								console.log(`Setting ${pokeType} into sessionStorage`);
								if(sessionStorage.length == 28) {
									sessionStorage.clear();
									console.log('clearing out sessionStorage due to max limit');
								}
								sessionStorage.setItem(storeType, list);
							} else {
								console.log(`Setting ${pokeType} into localStorage`);
								localStorage.setItem(storeType, list);
							}

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
				} else if(sessionStorage.getItem(storeType)) {
					console.log('getting it from sessionstorage');
					resolve(JSON.parse(sessionStorage.getItem(storeType)));
				}else {
					console.log('LocalStorage available, no data found, will be available in next load. Starting API call');
					xhrCall();
				}
			} else {
				console.log('No localStorage, starting API call');
				xhrCall();
			}
		})

		return results
	}
}