"use strict";

app.controller('navCtrl', function($scope, $window, userFactory){

	$scope.isLoggedIn = false;

	$scope.logout = () => {
		userFactory.logOut();
	};
	
	firebase.auth().onAuthStateChanged(function(user) {
		if(user) {
			$scope.isLoggedIn = true;
			$scope.$apply();
		}else{
			$scope.isLoggedIn = false;
		}
	});
});