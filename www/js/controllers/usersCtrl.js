'use strict';

var UsersCtrl = function($scope, navSvc, userService, $http){
  // $scope.updateUserList = function(){
  //   $http.get(userService.oaktreeUrl +'user/')
  //     .success(function(u, getRes){
  //       userService.setAllUsers(u);
  //       $scope.users = u;
  //       var matchUserObj = {};
  //       for (var j = 0; j < $scope.users.length; j++){
  //         if (userService.currentUser._id === $scope.users[j]._id){
  //           $scope.users.splice(j, 1);
  //         } else {
  //           matchUserObj[$scope.users[j]._id] = j;
  //         }
  //       }
  //       for (var i = 0; i < userService.currentUser.friends.length; i++){
  //         if (matchUserObj[userService.currentUser.friends[i]._id]){ // if the userId is in the match user Obj
  //           $scope.users[matchUserObj[userService.currentUser.friends[i]._id]].added = 1; // find array slot. add a new property to it. array slot j.
  //         }
  //       }
  //     }).error(function(u, getRes){
  //     });
  // };
  $scope.updateUserList = function() {
    navigator.contacts.find(["phoneNumbers"],function(contacts) {
      var contactsObj = {contacts: contacts};
      $http.post(userService.oaktreeUrl+'user/phonefind/', JSON.stringify(contactsObj))
        .success(function(u, getRes){
          // $scope.contacts = u;
          // console.log('friends', u);
          $scope.users = u;
          var matchUserObj = {};
          for (var j = 0; j < $scope.users.length; j++){
            if (userService.currentUser._id === $scope.users[j]._id){
              $scope.users.splice(j, 1);
            } else {
              matchUserObj[$scope.users[j]._id] = j;
            }
          }
          for (var i = 0; i < userService.currentUser.friends.length; i++){
            if (matchUserObj[userService.currentUser.friends[i]._id]){ // if the userId is in the match user Obj
              $scope.users[matchUserObj[userService.currentUser.friends[i]._id]].added = 1; // find array slot. add a new property to it. array slot j.
            }
          }
        })
        .error(function(u, getRes){
          console.log('error on contacts', u);
        });
    },function(e){console.log("Error finding contacts " + e.code);},{multiple: true});
  };
  $scope.add = function(user){
    user.added = 1;
    $http.get(userService.oaktreeUrl +'friends/add/'+userService.currentUser._id+'/'+user._id)
      .success(function(u, getRes){
      });
  };
  $scope.itemClass = function(user){
    if (user.added){
      return 'pure-button-disabled';
    }
  };
};