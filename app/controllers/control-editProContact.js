"use strict";
app.controller("editProContactCtrl", function($scope, contactFactory, $routeParams, $location, userFactory){

	$scope.professionalTitle = "Edit Professional Contact";
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

   const showEditProContact = function(){
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
	showEditProContact();
});