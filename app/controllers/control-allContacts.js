"use strict";

app.controller('allContactsCtrl', function($scope, $window, $location, contactFactory, userFactory){
	$scope.contacts = [];

	let user = userFactory.getCurrentUser();
	let NowPlus2Wks = moment().add(2, 'weeks').format();
	let now = moment().format();
	
// Call date 2 weeks from now pushed to firebase for comparison
	let contact = {
		LastCallDate: NowPlus2Wks
	};

	$scope.getLastCall = function(call){
		let compareTime = moment(call).diff(moment());
		let daysTime = moment.duration(compareTime).as('days');
		$scope.dayRound = Math.floor(daysTime);

		console.log("querySelector", document.querySelectorAll('.callTrack'));
		if ($scope.dayRound >= 10) {
			angular.element( document.querySelectorAll('.callTrack')).addClass('green');
		} else if ($scope.dayRound <= 9 && $scope.dayRound >= 4){
			angular.element( document.querySelectorAll('.callTrack')).addClass('yellow');
		} else {
			angular.element( document.querySelectorAll('.callTrack')).addClass('red');
		}	};

	$scope.getBirthday = function(bday){
		let contBdate = bday;
		let formBirthdate = moment(contBdate).format();
		let birthage = moment().diff(formBirthdate);
		let ageConvert = moment.duration(birthage).as('years');
		let contYearRound = Math.floor(ageConvert);
		let bdayAddyears = moment(contBdate).add(contYearRound, 'year').format();
		let nextBday = moment(bdayAddyears).add(1, 'year').format();
		let bDayDiff = moment(nextBday).diff(moment());
		let bDaysAway = moment.duration(bDayDiff).as('days');
		$scope.bDayRound = Math.floor(bDaysAway);
		if (isNaN($scope.bDayRound)){
			angular.element( document.querySelectorAll('.allBday')).addClass('hide');
			} else if ($scope.bDayRound > 14) {
			angular.element( document.querySelectorAll('.allBday')).addClass('hide');
			} else if ($scope.bDayRound <= 14 && $scope.bDayRound >=7) {
			angular.element( document.querySelectorAll('.allBday')).addClass('green').removeClass('hide');
			} else {angular.element( document.querySelectorAll('.allBday')).addClass('red');
		}
	};

	$scope.getAnniversary = function(anniv){
		let contAnniv = anniv;
		let formAnnivdate = moment(contAnniv).format();
		let origAnnDate = moment().diff(formAnnivdate);
		let AnnDateConvert = moment.duration(origAnnDate).as('years');
		let contAnnYearRound = Math.floor(AnnDateConvert);
		let AnivAddyears = moment(contAnniv).add(contAnnYearRound, 'year').format();
		let nextAnn = moment(AnivAddyears).add(1, 'year').format();
		let annDiff = moment(nextAnn).diff(moment());
		let annDaysAway = moment.duration(annDiff).as('days');
		$scope.annDayRound = Math.floor(annDaysAway);
		if (isNaN($scope.annDayRound)){
			angular.element( document.querySelectorAll('.allAnniv')).addClass('hide');
			} else if ($scope.annDayRound > 14) {
			angular.element( document.querySelectorAll('.allAnniv')).addClass('hide');
			} else if ($scope.annDayRound <= 14 && $scope.annDayRound >=7) {
			angular.element( document.querySelectorAll('.allAnniv')).addClass('green').removeClass('hide');
			} else {angular.element( document.querySelectorAll('.allAnniv')).addClass('red');
		}
	};

	$scope.getSpecial = function(spec){
		let contSpec = spec;
		let formSpecdate = moment(contSpec).format();
		let origSpecDate = moment().diff(formSpecdate);
		let SpecDateConvert = moment.duration(origSpecDate).as('years');
		let contSpecYearRound = Math.floor(SpecDateConvert);
		let SpecAddyears = moment(contSpec).add(contSpecYearRound, 'year').format();
		let nextSpec = moment(SpecAddyears).add(1, 'year').format();
		let specDiff = moment(nextSpec).diff(moment());
		let SpecDaysAway = moment.duration(specDiff).as('days');
		$scope.specDayRound = Math.floor(SpecDaysAway);
		if (isNaN($scope.specDayRound)){
			angular.element( document.querySelectorAll('.allSpec')).addClass('hide');
			} else if ($scope.specDayRound > 14) {
			angular.element( document.querySelectorAll('.allSpec')).addClass('hide');
			} else if ($scope.specDayRound <= 14 && $scope.specDayRound >=7) {
			angular.element( document.querySelectorAll('.allSpec')).removeClass('hide').addClass('green');
			} else {angular.element( document.querySelectorAll('.allSpec')).addClass('red');
		}
	};


	const showAllContacts = function(){
		contactFactory.getAllContacts(user)
		.then((contacts) => {
			$scope.contacts = contacts;
			var lastDate = contacts.LastCallDate;
		})
		.then((data) => {
			$scope.contact = data;
		});
	};
	$scope.deleteContact = function(id) {
		contactFactory.deleteContact(id)
		.then((irrelevant) => {
			showAllContacts();
		});
	};
// Call reminder click patches LastCallDate to Firebase
	$scope.updateCall = function(id) {
		contactFactory.editContact(id, contact);
	};

	showAllContacts();
});