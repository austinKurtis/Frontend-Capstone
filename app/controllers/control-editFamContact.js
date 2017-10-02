"use strict";
// Angular JS to add new family contacts
app.controller("editFamContactCtrl", function($scope, contactFactory, $routeParams, $location, userFactory){

	// Title and Submit template
	$scope.familyTitle = "Edit Family Contact";
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
		familyMem: "",
		religion: "",
		birthdate: "",
		anniversary: "",
		specialDate: "",
		callRem: "",
		giftRem: "",
		cardRem: "",
		uid: user,
		contactID: "",
		contactType: "family"
	};

//gets the data of contact from RouteParams
   const showEditFamContact = function(){
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
	showEditFamContact();
});