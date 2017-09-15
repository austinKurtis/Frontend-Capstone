"use strict";

app.controller("contactDetailCtrl", function($scope, $routeParams, contactFactory, $location){


	// console.log("Birthdate", $scope.contact.birthdate);
	console.log("Display Info itemID", $routeParams.itemId);

	const showContact = function(){
		contactFactory.getContactDetail($routeParams.itemId)
		.then((data) => {
			$scope.contact = data;
			$scope.contact.id = $routeParams.itemId;
			// Birthday Converter
			let contBdate = $scope.contact.birthdate;
			let formBirthdate = moment(contBdate).format();
			let birthage = moment().diff(formBirthdate);
			let ageConvert = moment.duration(birthage).as('years');
			let contYearRound = Math.floor(ageConvert);
			let bdayAddyears = moment(contBdate).add(contYearRound, 'year').format();
			let nextBday = moment(bdayAddyears).add(1, 'year').format();
			let bDayDiff = moment(nextBday).diff(moment());
			let bDaysAway = moment.duration(bDayDiff).as('days');
			$scope.bDayRound = Math.floor(bDaysAway);
			if ($scope.bDayRound >= 14) {
			angular.element( document.querySelector('#bdayTest')).addClass('green');
			} else if ($scope.bDayRound <= 13 && $scope.bDayRound >=7) {
			angular.element( document.querySelector('#bdayTest')).addClass('yellow');
			} else {angular.element( document.querySelector('#bdayTest')).addClass('red');}
			
			// Anniversary Converter
			let contAnniv = data.anniversary;
			let formAnnivdate = moment(contAnniv).format();
			let origAnnDate = moment().diff(formAnnivdate);
			let AnnDateConvert = moment.duration(origAnnDate).as('years');
			let contAnnYearRound = Math.floor(AnnDateConvert);
			let AnivAddyears = moment(contAnniv).add(contAnnYearRound, 'year').format();
			let nextAnn = moment(AnivAddyears).add(1, 'year').format();
			let annDiff = moment(nextAnn).diff(moment());
			let annDaysAway = moment.duration(annDiff).as('days');
			$scope.annDayRound = Math.floor(annDaysAway);
			if ($scope.annDayRound >= 14) {
			angular.element( document.querySelector('#aniTest')).addClass('green');
			} else if ($scope.annDayRound <= 13 && $scope.annDayRound >=7) {
			angular.element( document.querySelector('#aniTest')).addClass('yellow');
			} else {angular.element( document.querySelector('#aniTest')).addClass('red');}

			// Special Date Converter
			let contSpec = data.specialDate;
			let formSpecdate = moment(contSpec).format();
			let origSpecDate = moment().diff(formSpecdate);
			let SpecDateConvert = moment.duration(origSpecDate).as('years');
			let contSpecYearRound = Math.floor(SpecDateConvert);
			let SpecAddyears = moment(contSpec).add(contSpecYearRound, 'year').format();
			let nextSpec = moment(SpecAddyears).add(1, 'year').format();
			let specDiff = moment(nextSpec).diff(moment());
			let SpecDaysAway = moment.duration(specDiff).as('days');
			$scope.specDayRound = Math.floor(SpecDaysAway);
			if ($scope.specDayRound >= 14) {
			angular.element( document.querySelector('#specTest')).addClass('green');
			} else if ($scope.specDayRound <= 13 && $scope.specDayRound >=7) {
			angular.element( document.querySelector('#specTest')).addClass('yellow');
			} else {angular.element( document.querySelector('#specTest')).addClass('red');}
			
		});
	};

	 

	$scope.deleteContact = function(id) {
		contactFactory.deleteContact(id)
		.then((irrelevant) => {
			$location.url("/AllContacts");
		});
	};


	showContact();

});

