"use strict";

app.factory("contactFactory", function($q, $http, FBCreds){

const getAllContacts = function(user) {
	let contacts = [];
	console.log("url is", `${FBCreds.databaseURL}/contacts.json?orderBy="uid"&equalTo="${user}"`);
	return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/contacts.json?orderBy="uid"&equalTo="${user}"`)
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

	const deleteContact = function(id){
		return $q((resolve, reject) => {
			$http.delete(`${FBCreds.databaseURL}/contacts/${id}.json`)
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
					reject(error);
				});
			});
		};

    const getContactDetail = function(itemId){
        return $q((resolve, reject) =>{
            $http.get(`${FBCreds.databaseURL}/contacts/${itemId}.json`)
            .then((itemObj) => {
                resolve(itemObj.data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    };

    const editContact = function(id, obj) {
        console.log("to be updated", id, obj);
        return $q((resolve, reject) => {
            let newObj = JSON.stringify(obj);
            $http.patch(`${FBCreds.databaseURL}/contacts/${id}.json`, newObj)
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
        });
    };

	return{getAllContacts, addContact, deleteContact, getContactDetail, editContact};

});