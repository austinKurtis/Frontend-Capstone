"use strict";
// Angular JS to add new family contacts
app.controller("editProContactCtrl", function($scope, contactFactory, $routeParams, $location, userFactory){

	// Title and Submit template
	$scope.professionalTitle = "Edit Professional Contact";
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

//gets the data of contact from RouteParams
   const showEditProContact = function(){
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
	showEditProContact();
});