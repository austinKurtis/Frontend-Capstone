"use strict";

//Angular App Module
const app = angular.module("KitApp", ['ngRoute', 'ui.materialize']);

//Checks to see if the user is authorized
let isAuth = (userFactory) => new Promise ((resolve, reject) => {
	userFactory.isAuthenticated()
	.then((userExists) => {
		if(userExists) {
			resolve();
		}else {
			reject();
		}
	});
});

//Full Site Route Provider
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
			templateUrl: 'partials/dashboard.html',
			controller: 'allContactsCtrl',
			resolve: {isAuth}
		})
	.when('/AllContacts', {
			templateUrl: 'partials/contactShowAll.html',
			controller: 'allContactsCtrl',
			resolve: {isAuth}
		})
	.when('/:itemId/editfamilyContact', {
			templateUrl: 'partials/editFamContact.html',
			controller: 'editFamContactCtrl',
			resolve: {isAuth}
		})
	.when('/:itemId/editfriendContact', {
			templateUrl: 'partials/editFrndContact.html',
			controller: 'editFrndContactCtrl',
			resolve: {isAuth}
		})
	.when('/:itemId/editprofessionalContact', {
			templateUrl: 'partials/editProContact.html',
			controller: 'editProContactCtrl',
			resolve: {isAuth}
		})
	.when('/:itemId/familyContactDetails', {
			templateUrl: 'partials/showFamDetails.html',
			controller: 'contactDetailCtrl',
			resolve: {isAuth}
	})
	.when('/:itemId/friendContactDetails', {
			templateUrl: 'partials/showFrndDetails.html',
			controller: 'contactDetailCtrl',
			resolve: {isAuth}
	})
	.when('/:itemId/professionalContactDetails', {
			templateUrl: 'partials/showProDetails.html',
			controller: 'contactDetailCtrl',
			resolve: {isAuth}
	})
	.when('/contactsShowAll', {
		templateUrl: 'partials/contactShowAll.html',
		controller: 'allContactsCtrl',
		resolve: {isAuth}
	})
	.when('/contactsFamily', {
		templateUrl: 'partials/contactShowFamily.html',
		controller: 'allContactsCtrl',
		resolve: {isAuth}
	})
	.when('/contactsFriends', {
		templateUrl: 'partials/contactShowFriends.html',
		controller: 'allContactsCtrl',
		resolve: {isAuth}
	})
	.when('/contactsProfessional', {
		templateUrl: 'partials/contactShowProf.html',
		controller: 'allContactsCtrl',
		resolve: {isAuth}
	})
	.when('/phoneBook', {
		templateUrl: 'partials/phoneBook.html',
		controller: 'allContactsCtrl',
		resolve: {isAuth}
	})
	.when('/phoneReminder', {
		templateUrl: 'partials/phoneReminder.html',
		controller: 'allContactsCtrl',
		resolve: {isAuth}
	})
	.when('/gift', {
		templateUrl: 'partials/birthdayGiftHim.html',
		controller: 'shopCtrl',
		resolve: {isAuth}
	})
	.otherwise('/');
});
//Firebase Credits and Location
app.run(($location, FBCreds) => {
	let creds = FBCreds;
	let authConfig = {
		apiKey: creds.apiKey,
		authDomain: creds.authDomain,
		databaseURL: creds.databaseURL
	};
	firebase.initializeApp(authConfig);
});