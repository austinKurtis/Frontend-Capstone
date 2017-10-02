"use strict";
// Angular JS to add new friend contacts
app.controller('contactFrndCtrl', function($scope, $window, userFactory, contactFactory, $location){
	// Title and Submit template
	$scope.friendTitle = "New Friend Contact";
	$scope.submitConButton = "Submit Contact";
	// user Auth variable
	let user = userFactory.getCurrentUser();

	// contact Array Data
	$scope.contact = {
		first_name: "",
		last_name: "",
		phone: "",
		email: "",
		street_1: "",
		street_2: "",
		city: "",
		state: "",
		zip: "",
		friendMem: "",
		gender: "",
		religion: "",
		birthdate: "",
		anniversary: "",
		specialDate: "",
		callRem: "",
		giftRem: "",
		cardRem: "",
		uid: user,
		contactID: "",
		contactType: "friend"
	};

	// Submit Contact
	$scope.submitContact = function(){
		console.log("submitCLicked");
		contactFactory.addContact($scope.contact)
		.then((data) =>{
			$location.url("/AllContacts");
		});
	};
});