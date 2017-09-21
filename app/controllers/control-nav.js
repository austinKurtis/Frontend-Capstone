"use strict";

app.controller('navCtrl', function($scope, $window, userFactory){

	$scope.isLoggedIn = false;

	$scope.addActive = function(){
	$('.addNav').addClass('cyan-text text-accent-3');
	$('.personNav').removeClass('cyan-text text-accent-3');
	$('.eventNav').removeClass('cyan-text text-accent-3');
	$('.phoneNav').removeClass('cyan-text text-accent-3');
	};

	$scope.contActive = function(){
	$('.personNav').addClass('cyan-text text-accent-3');
	$('.addNav').removeClass('cyan-text text-accent-3');
	$('.eventNav').removeClass('cyan-text text-accent-3');
	$('.phoneNav').removeClass('cyan-text text-accent-3');
	};
	
	// $scope.eventActive = function(){
	// $('.eventNav').addClass('cyan-text text-accent-3');
	// $('.personNav').removeClass('cyan-text text-accent-3');
	// $('.addNav').removeClass('cyan-text text-accent-3');
	// $('.phoneNav').removeClass('cyan-text text-accent-3');
	// };

	$scope.phoneActive = function(){
	$('.phoneNav').addClass('cyan-text text-accent-3');
	$('.personNav').removeClass('cyan-text text-accent-3');
	$('.eventNav').removeClass('cyan-text text-accent-3');
	$('.addNav').removeClass('cyan-text text-accent-3');
	};

	$scope.noneActive = function(){
	$('.addNav').removeClass('cyan-text text-accent-3');
	$('.personNav').removeClass('cyan-text text-accent-3');
	$('.eventNav').removeClass('cyan-text text-accent-3');
	$('.phoneNav').removeClass('cyan-text text-accent-3');
	};

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