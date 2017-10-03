"use strict";
//Navigation Controller
app.controller('navCtrl', function($scope, $window, userFactory){
	//Checks if isAuth True/False
	$scope.isLoggedIn = false;

//Top right icon color changer
	$scope.addActive = function(){
	$('.addNav').addClass('cyan-text text-accent-3');
	$('.personNav').removeClass('yellow-text text-accent-3');
	$('.eventNav').removeClass('cyan-text text-accent-3');
	$('.phoneNav').removeClass('light-green-text text-accent-3');
	};

	$scope.contActive = function(){
	$('.personNav').addClass('yellow-text text-accent-3');
	$('.addNav').removeClass('cyan-text text-accent-3');
	$('.eventNav').removeClass('cyan-text text-accent-3');
	$('.phoneNav').removeClass('light-green-text text-accent-3');
	};

	$scope.phoneActive = function(){
	$('.phoneNav').addClass('light-green-text text-accent-3');
	$('.personNav').removeClass('yellow-text text-accent-3');
	$('.eventNav').removeClass('cyan-text text-accent-3');
	$('.addNav').removeClass('cyan-text text-accent-3');
	};

	$scope.noneActive = function(){
	$('.addNav').removeClass('cyan-text text-accent-3');
	$('.personNav').removeClass('yellow-text text-accent-3');
	$('.eventNav').removeClass('cyan-text text-accent-3');
	$('.phoneNav').removeClass('light-green-text text-accent-3');
	};

//logout button
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