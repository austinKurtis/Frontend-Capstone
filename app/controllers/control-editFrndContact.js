"use strict";

// Angular JS to add new friend contacts
app.controller("editFrndContactCtrl", function($scope, contactFactory, $routeParams, $location, userFactory){

	// Title and Submit template
	$scope.friendTitle = "Edit Friend Contact";
	$scope.submitConButton = "Submit Edit";

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

//gets the data of contact from RouteParams
   const showEditFrndContact = function(){
    	contactFactory.getContactDetail($routeParams.itemId)
    	.then((data) => {
    		console.log("Edit data", data);
    		$scope.contact = data;
    		$scope.contact.id = $routeParams.itemId;
    	});
    };

//Submit changes button
	$scope.submitContact = function(){
		contactFactory.editContact($routeParams.itemId, $scope.contact)
		.then((data) =>{
			$location.url("/AllContacts");
		});
	};
	showEditFrndContact();
});