"use strict";
// Angular JS to add new family contacts
app.controller('contactProfCtrl', function($scope, $window, userFactory, contactFactory, $location){

	// Title and Submit template
	$scope.professionalTitle = "New Professional Contact";
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
		proMem: "",
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
		contactType: "professional"
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