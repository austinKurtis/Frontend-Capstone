"use strict";

app.controller("contactDetailCtrl", function($scope, $routeParams, contactFactory){

	console.log("itemID", $routeParams.itemId);

	const showContact = function(){
		contactFactory.getContactDetail($routeParams.itemId)
		.then((data) => {
			$scope.contact = data;
			$scope.contact.id = $routeParams.itemId;
		});
	};
	showContact();
});