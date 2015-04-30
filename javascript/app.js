var app = angular.module('hackerNews', []);

app.factory('posts', [function() {
  var o = {
    posts: []
  };

  // we return the o object so that any other Angular module that cares to inject it, can
  return o;
}]);

app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){
    $scope.test = 'Hello world!';

    $scope.posts = posts.posts;

    // $scope.posts = [
    //   {title: 'post 1', upvotes: 5},
    //   {title: 'post 2', upvotes: 2},
    //   {title: 'post 3', upvotes: 15},
    //   {title: 'post 4', upvotes: 9},
    //   {title: 'post 5', upvotes: 4}
    // ];

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


