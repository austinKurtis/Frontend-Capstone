"use strict";
console.log("app.js");

const app = angular.module("KitApp", ["ngRoute"]);

let isAuth = (userFactory) => new Promise ((resolve, reject) => {
	console.log("This is the userFactory", userFactory);
	userFactory.isAuthenticated()
	.then((userExists) => {
		if(userExists) {
			console.log("Authentication Good");
			resolve();
		}else {
			console.log("Authentication Bad");
			reject();
		}
	});
});

app.config(($routeProvider) =>{
	$routeProvider

	.when('/', {
			templateUrl: 'partials/user.html',
			controller: 'userCtrl'
		})
	.when('/newFamilyContact', {
			templateUrl: 'partials/newFamContact.html',
			controller: 'contactFamCtrl',
			resolve: {isAuth}
			
		})
	.when('/newFriendContact', {
			templateUrl: 'partials/newFrndContact.html',
			controller: 'contactFrndCtrl',
			resolve: {isAuth}
		})
	.when('/newProfessionalContact', {
			templateUrl: 'partials/newProContact.html',
			controller: 'contactProfCtrl',
			resolve: {isAuth}
		})
	.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'userCtrl',
			resolve: {isAuth}
		})
	.otherwise('/');
});

app.run(($location, FBCreds) => {
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain,
		databaseURL: creds.databaseURL
	};
	firebase.initializeApp(authConfig);
});