"use strict";

app.controller("contactDetailCtrl", function($scope, $routeParams, contactFactory, $location){



	console.log("Display Info itemID", $routeParams.itemId);

	const showContact = function(){
		contactFactory.getContactDetail($routeParams.itemId)
		.then((data) => {
			$scope.contact = data;
			$scope.contact.id = $routeParams.itemId;
			console.log("Display Data", data);
		});
	};
	
	
	$scope.deleteContact = function(id) {
		contactFactory.deleteContact(id)
		.then((irrelevant) => {
			$location.url("/AllContacts");
		});
	};
	// const timeout = function(){
	// 	$(document).ready(function(){
 //    $('.tooltipped').tooltip({delay: 50});
 //  		});

	// };
	// $timeout(timeout, 100);
	showContact();
});

