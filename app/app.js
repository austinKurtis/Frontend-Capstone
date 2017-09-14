"use strict";
console.log("app.js");

const app = angular.module("KitApp", ['ui.materialize', "ngRoute"]);

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
			templateUrl: 'partials/showAllContacts.html',
			controller: 'allContactsCtrl',
			resolve: {isAuth}
		})
	.when('/AllContacts', {
			templateUrl: 'partials/showAllContacts.html',
			controller: 'allContactsCtrl',
			resolve: {isAuth}
		})
	.when('/:itemId/editFamilyContact', {
			templateUrl: 'partials/editFamContact.html',
			controller: 'editFamContactCtrl',
			resolve: {isAuth}
		})
	.when('/:itemId/editFriendContact', {
			templateUrl: 'partials/editFrndContact.html',
			controller: 'editFrndContactCtrl',
			resolve: {isAuth}
		})
	.when('/:itemId/editProfessionalContact', {
			templateUrl: 'partials/editProContact.html',
			controller: 'editProContactCtrl',
			resolve: {isAuth}
		})
	.when('/:itemId/FamilyContactDetails', {
			templateUrl: 'partials/showFamDetails.html',
			controller: 'contactDetailCtrl',
			resolve: {isAuth}
	})
	.when('/:itemId/FriendContactDetails', {
			templateUrl: 'partials/showFrndDetails.html',
			controller: 'contactDetailCtrl',
			resolve: {isAuth}
	})
	.when('/:itemId/ProfessionalContactDetails', {
			templateUrl: 'partials/showProDetails.html',
			controller: 'contactDetailCtrl',
			resolve: {isAuth}
	})
	.when('/TestDateCompare', {
			templateUrl: 'partials/testDateCompare.html',
			controller: 'testDateCompare',
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