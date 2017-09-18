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
// determines how many days away from now to call contact
	$scope.getLastCall = function(call){
		let compareTime = moment(call).diff(moment());
		let daysTime = moment.duration(compareTime).as('days');
		$scope.dayRound = Math.floor(daysTime);
	
		if ($scope.dayRound >= 10) {
				return "green";
			} else if ($scope.dayRound <= 9 && $scope.dayRound >= 4){
				return "yellow";
			} else {
				return "red";
			}
	};

//convert any date for sorting
	$scope.convertDates = function(somedate){
		console.log("just date", somedate);
		let covDate = somedate;
		let formatDate = moment(covDate).format();
		let figureAge = moment().diff(formatDate);
		let ageConv = moment.duration(figureAge).as('years');
		let roundYear = Math.floor(ageConv);
		let addYears = moment(covDate).add(roundYear, 'year').format();
		let nextDate = moment(addYears).add(1, 'year').format();
		let dayDiff = moment(nextDate).diff(moment());
		let daysAway = moment.duration(dayDiff).as('days');
		$scope.dayRound = Math.floor(daysAway);
		console.log("converDates $scope.dayRound", $scope.dayRound);
		return $scope.dayRound;
	};


//converts birthday into days away then compares to add class
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

			if ($scope.bDayRound > 14) {
				return "dateHide";
			} else if ($scope.bDayRound <= 14 && $scope.bDayRound >=7){
				return "dateGreen";
			} else if ($scope.bDayRound <= 6) {
				return "dateRed";
			} else if (isNaN($scope.annDayRound)) {
				return "dateHide";
			}

	};
	// $scope.notADate = function (date) {
	// 	let x = date !== date;
	// 	console.log("notADate", x, + " " + date);
	// 	return date !== date; 
	// };

	// $scope.tooFarOut = function (date) {
	// 	let x = date > 14;
	// 	console.log("tooFarOut", x, + " " + date);
	// 	return x;

	// };
	// console.log("$scope.tooFarOut", $scope.tooFarOut());

	// $scope.twoWeeks = function(date) {
	// 	let x = date <= 14 && date >=7;
	// 	console.log("twoWeeks", x, + " " + date);
	// 	return x;
	// };

	// $scope.daysAway = function(date) {
	// 	let x = date < 7;
	// 	console.log("daysAway", x, + " " + date);
	// 	return x;
	// };

//converts anniversary into days away then compares to add class
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

			if ($scope.annDayRound > 14) {
				return "dateHide";
			} else if ($scope.annDayRound <= 14 && $scope.annDayRound >=7){
				return "dateGreen";
			} else if ($scope.annDayRound <= 6) {
				return "dateRed";
			} else if (isNaN($scope.annDayRound)) {
				return "dateHide";
			}
	};
//converts special date into days away then compares to add class
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

		if ($scope.specDayRound > 14) {
				return "dateHide";
			} else if ($scope.specDayRound <= 14 && $scope.specDayRound >=7){
				return "dateGreen";
			} else if ($scope.specDayRound <= 6) {
				return "dateRed";
			} else if (isNaN($scope.specDayRound)) {
				return "dateHide";
			}
	};

	$scope.convertDate = function(date){
		console.log("convert Date Date", date);
		let converted = moment(date).format('MMMM-DD');
		console.log("converted date", converted);
		// return converted;
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