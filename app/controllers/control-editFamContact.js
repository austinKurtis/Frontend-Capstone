"use strict";
app.controller("editFamContactCtrl", function($scope, contactFactory, $routeParams, $location, userFactory){

	$scope.familyTitle = "Edit Family Contact";
	$scope.submitConButton = "Submit Edit";

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

   const showEditFamContact = function(){
    	contactFactory.getContactDetail($routeParams.itemId)
    	.then((data) => {
    		console.log("Edit data", data);
    		$scope.contact = data;
    		$scope.contact.id = $routeParams.itemId;
    	});
    };

	$scope.submitContact = function(){
		contactFactory.editContact($routeParams.itemId, $scope.contact)
		.then((data) =>{
			$location.url("/AllContacts");
		});
	};
	showEditFamContact();
});