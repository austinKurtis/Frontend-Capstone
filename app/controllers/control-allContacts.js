"use strict";

app.controller('allContactsCtrl', function($scope, $window, $location, contactFactory, userFactory){
	$scope.contacts = [];
	let user = userFactory.getCurrentUser();

	const showAllContacts = function(){
		contactFactory.getAllContacts(user)
		.then((contacts) => {
			console.log("show all contacts", contacts);
			$scope.contacts = contacts;
		})
		.then((data) => {
			$scope.contact = data;
		});
	};

	$scope.deleteContact = function(id) {
		contactFactory.deleteContact(id)
		.then((irrelevant) => {
			showAllContacts();
		});
	};

	let NowPlus2Wks = moment().add(2, 'weeks').format();

	$scope.contact = {
		LastCallDate: NowPlus2Wks
	};
	// console.log("NowPlus2Wks", NowPlus2Wks);

	// console.log("AddNew", $scope.contact);

	$scope.updateCall = function(id) {
		contactFactory.editContact(id, $scope.contact);
		console.log("inside update", id, $scope.contact);
	};


	$scope.contact = {
		LastCallDate: ""
	};

	$scope.pushCallDate = function() {
		let twoWeeks = moment().add(2, 'weeks').format();
	};
	

	
		let twoWeeks = moment().add(2, 'weeks').format();
		console.log("callDate", twoWeeks);

	showAllContacts();
});