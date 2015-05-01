var app = angular.module('hackerNews', ['ui.router']);

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

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('home', {
        url:'/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
      });

      $urlRouterProvider.otherwise('home');

  }]);

app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts){

    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      upvotes: 0,
      comments: [
      {author: 'Alex', body: 'That is awesome!!! coool', upvotes: 0},
      {author: 'Mike', body: 'You are doing an awesome journey', upvotes: 0}
      ]
    });

    // now that we have a post variable in our controller, can display that info in our template
    $scope.post = posts.posts[$stateParams.id];

    $scope.addComment = function(){
      if($scope.body === '') {return;}

      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0
      });

      $scope.body = '';
    }

  }]);
