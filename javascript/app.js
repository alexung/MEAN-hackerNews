var app = angular.module('hackerNews', []);

app.controller('MainCtrl', ['$scope', function($scope){
    $scope.test = 'Hello world!';

    $scope.posts = [
      {title: 'post 1', upvotes: 5},
      {title: 'post 2', upvotes: 2},
      {title: 'post 3', upvotes: 15},
      {title: 'post 4', upvotes: 9},
      {title: 'post 5', upvotes: 4}
    ];

    $scope.addPost = function() {
      // below prevents a user from entering a blank post.  No forcing user to enter in a link, however.
        if(!$scope.title || $scope.title === "") {
          return;
        }
        $scope.posts.push({title: $scope.title,
          link: $scope.link,
          upvotes: 0});
        // resets $scope.title to be empty after the fact
        $scope.title = '';
        $scope.link = '';
    }

    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    }

}]);
