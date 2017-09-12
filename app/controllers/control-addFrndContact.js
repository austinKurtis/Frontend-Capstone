"use strict";

app.controller('contactFrndCtrl', function($scope, $window, userFactory, contactFactory, $location){

	$scope.friendTitle = "New Friend Contact";
	$scope.submitConButton = "Submit Contact";

	let user = userFactory.getCurrentUser();

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

	$scope.submitContact = function(){
		console.log("submitCLicked");
		contactFactory.addContact($scope.contact)
		.then((data) =>{
			$location.url("/home");
		});
	};
});