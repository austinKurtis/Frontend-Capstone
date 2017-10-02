"use strict";
//Factory to get contacts from Firebase
app.factory("contactFactory", function($q, $http, FBCreds){

//function to get all of the contacts within firebase based on the user ID
const getAllContacts = function(user) {
	let contacts = [];
	return $q((resolve, reject) => {
			$http.get(`${FBCreds.databaseURL}/contacts.json?orderBy="uid"&equalTo="${user}"`)
			.then((itemObject)=>{
				let itemCollection = itemObject.data;
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

//Add new contact Factory Function
	const addContact = function(obj){
		let newObj = JSON.stringify(obj);
		return $http.post(`${FBCreds.databaseURL}/contacts.json`, newObj)
		.then ((data) => {
			return data;
		}, (error) => {
			let errorCode = error.code;
			let errorMessage = error.message;
		});
	};
//Delete Contact Factory Function
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

//Contact Detail Factory Function via RouteParams
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

//Edit Contacts Factory Function via routeParams ID
    const editContact = function(id, obj) {
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