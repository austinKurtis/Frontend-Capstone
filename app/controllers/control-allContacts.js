"use strict";
//all Contacts Controller
app.controller('allContactsCtrl', function($scope, $window, $location, contactFactory, userFactory){
	$scope.contacts = [];
	// Get User From Factory
	let user = userFactory.getCurrentUser();
	// gets todays date and adds two weeks to the contact database
	let NowPlus2Wks = moment().add(2, 'weeks').format();
	//todays date
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
				return "conIconGreen";
			} else if ($scope.dayRound <= 9 && $scope.dayRound >= 4){
				return "conIconYellow";
			} else {
				return "conIconRed";
			}
	};
// Days since last call
	$scope.callDaysAway = function(call){
		let compareTime = moment().diff(moment(call));
		let daysTime = moment.duration(compareTime).as('days');
		$scope.dayRound = Math.floor(daysTime);
		return $scope.dayRound;
	};

	//Checkes to see how many days ago something happened
	$scope.daysAgo = function(date) {
		let compareTime = moment(date).diff(moment());
		console.log("compareTime", compareTime);
		$('phoneRemInfo').each(function(){
			$(this).html("<p>" + compareTime + "</p>");
		});
	};

	//Change the Contact Card Circle Background Color
	$scope.changeCircle = function(date) {
		if (date >= 14) {
				return "conIconGreen";
			} else if (date <= 13 && date >= 7){
				return "conIconYellow";
			} else if (date <= 6 && date >= 1){
				return "conIconRed";
			} else {
				return "hide";
			}
	};

//convert any date for sorting
	$scope.convertDates = function(somedate){
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
		return $scope.dayRound;
	};
//Converts for phone dates
	$scope.covertCallDate = function(date){
		let date2Covert = date;
		let diffInDays = moment().diff(date2Covert);
		let getDays = moment.duration(diffInDays).as('days');
		$scope.dayRound = Math.floor(getDays + 15);
		console.log("covertCallDate", $scope.dayRound);
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

// gets all contacts from the factory
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
// deletes contacts from the factory within the database
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
//All of these update days away to Firebase
	$scope.updateBdayDays = function(date, id) {
		let convert = $scope.convertDates(date);
		let updateBdays = {
		birthDaysAway: convert
		};
		contactFactory.editContact(id, updateBdays);
	};
	$scope.updateAnivDays = function(date, id) {
		let convert = $scope.convertDates(date);
		let updateAnvDays = {
		annivDaysAway: convert
		};
		contactFactory.editContact(id, updateAnvDays);
	};
	$scope.updateSpecDays = function(date, id) {
		let convert = $scope.convertDates(date);
		let updateSpecDays = {
		specDaysAwya: convert
		};
		contactFactory.editContact(id, updateSpecDays);
	};
	$scope.updatePhoneDays = function(date, id) {
		let convert = $scope.covertCallDate(date);
		let updateCallDays = {
		callDaysAway: convert
		};
		contactFactory.editContact(id, updateCallDays);
	};
//Compares Numbers for the minimum to change Home Contact Background Colors
	$scope.minDaysAway = function(ann, bday, spec) {
		let lowestNumber = Math.min(isNaN(ann) ? Infinity : ann, isNaN(bday) ? Infinity : bday, isNaN(spec) ? Infinity : spec);
			console.log("lowestNumber", lowestNumber);
			if (lowestNumber >= 14) {
				return "conIconGreen";
			} else if (lowestNumber <= 13 && lowestNumber >= 7){
				return "conIconYellow";
			} else if (lowestNumber <= 6 && lowestNumber >= 0){
				return "conIconRed";
			}
	};
//Custom filter for All Contacts to the lowest amount of days away from now and eliminates not a number
	$scope.lowestSort = function(people) {
		return Math.min(isNaN(people.annivDaysAway) ? Infinity : people.annivDaysAway, isNaN(people.birthDaysAway) ? Infinity : people.birthDaysAway, isNaN(people.specDaysAwya) ? Infinity : people.specDaysAwya);
	};

	showAllContacts();
});