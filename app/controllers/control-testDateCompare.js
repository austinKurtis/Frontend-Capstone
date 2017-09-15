"use strict";

app.controller("testDateCompare", function($scope, contactFactory, $location){

    // This is what I require
    var start = '2017-09-21';
    var fromDay = moment(start).fromNow();
    console.log("Today", moment()); 
    console.log(fromDay);

    $scope.select = {
            value: "Option1",
            choices: ["Option1", "I'm an option", "This is materialize", "No, this is Patrick."]
        };

});