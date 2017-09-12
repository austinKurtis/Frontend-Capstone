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
			// templateUrl: 'partials/user.html',
			templateUrl: 'partials/newContact.html',
			controller: 'userCtrl'
		})
	.when('/newContact', {
			templateUrl: 'partials/newContact.html',
			controller: 'contactCtrl'
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