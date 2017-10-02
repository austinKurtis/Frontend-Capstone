"use strict";
//User Controller for Authorization via gmail/google
app.controller("userCtrl", function($scope, $window, userFactory, $location) {

//This creates the authentication for the webpage. It pulls in the authentication data from firebase and checks if the user is logged in or out. 
let logout = () => {
      console.log("logout clicked");
      userFactory.logOut()
        .then(function () {
          console.log("logged out");
          $location.href = "#!/";
        }, function (error) {
          console.log("error on logout");
        });
  };
//Login with Google
$scope.loginGoogle = () => {

  userFactory.authWithProvider()
  .then((result) => {
    let user = result.user.uid;
    $location.path('/home');
    $scope.$apply();
  }).catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
  });
};

});