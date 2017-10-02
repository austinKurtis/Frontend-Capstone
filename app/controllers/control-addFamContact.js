"use strict";
// Angular JS to add new family contacts
app.controller('contactFamCtrl', function($scope, $window, userFactory, contactFactory, $location){
	
	// Title and Submit template
	$scope.familyTitle = "New Family Contact";
	$scope.submitConButton = "Submit Contact";

	// user Auth variable
	let user = userFactory.getCurrentUser();

	// function that takes the day the contact was added and puts 14 additional days from that date for call reminder
	let NowPlus2Wks = moment().add(2, 'weeks').format();

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
		familyMem: "",
		religion: "",
		birthdate: "",
		anniversary: "",
		specialDate: "",
		callRem: "",
		LastCallDate: NowPlus2Wks,
		giftRem: "",
		cardRem: "",
		uid: user,
		contactID: "",
		contactType: "family",
		holidays: ""
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