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

