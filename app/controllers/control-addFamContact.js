"use strict";

app.controller('contactFamCtrl', function($scope, $window, userFactory, contactFactory, $location){

	$scope.familyTitle = "New Family Contact";
	$scope.submitConButton = "Submit Contact";

	let user = userFactory.getCurrentUser();

	let NowPlus2Wks = moment().add(2, 'weeks').format();

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
	
	$scope.submitContact = function(){
		console.log("submitCLicked");
		contactFactory.addContact($scope.contact)
		.then((data) =>{
			$location.url("/AllContacts");
		});
	};
});