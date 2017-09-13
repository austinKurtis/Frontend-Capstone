"use strict";

app.controller('allContactsCtrl', function($scope, contactFactory, userFactory){
	$scope.contacts = [];
	let user = userFactory.getCurrentUser();
	console.log("user list", user);

	const showAllContacts = function(){
		contactFactory.getAllContacts(user)
		.then((contacts) => {
			console.log("show all contacts", contacts);
			$scope.contacts = contacts;
		});
	};

	$scope.deleteContact = function(id) {
		contactFactory.deleteContact(id)
		.then((irrelevant) => {
			showAllContacts();
		});
	};
	showAllContacts();
});