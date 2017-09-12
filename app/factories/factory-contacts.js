"use strict";

app.factory("contactFactory", function($q, $http, FBCreds){

const getAllContacts = function(user) {
	let contacts = [];
	console.log("url is", `${FBCreds.databaseURL}/contacts.json`);
	return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/contacts.json`)
			.then((itemObject)=>{
				let itemCollection = itemObject.data;
				console.log("itemCollection", itemCollection);
				Object.keys(itemCollection).forEach((key) => {
					itemCollection[key].id = key;
					contacts.push(itemCollection[key]);
				});
				resolve(contacts);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};

const addContact = function(obj){
	let newObj = JSON.stringify(obj);
	return $http.post(`${FBCreds.databaseURL}/contacts.json`, newObj)
	.then ((data) => {
		console.log("data", data);
		return data;
	}, (error) => {
		let errorCode = error.code;
		let errorMessage = error.message;
		console.log("error", errorCode, errorMessage);
	});
};
	return{addContact};
});