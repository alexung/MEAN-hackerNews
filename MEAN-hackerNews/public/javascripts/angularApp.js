var app = angular.module('hackerNews', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){

    $stateProvider
      .state('home', {
        url:'/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl',
        resolve: {
          postPromise: ['posts', function(posts){
            return posts.getAll();
          }]
        }
      })
      .state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl',
        resolve: {
          post: ['$stateParams', 'posts', function($stateParams, posts) {
            return posts.get($stateParams.id);
          }]
        }
      });

      $urlRouterProvider.otherwise('home');

  }]);

app.factory('posts', ['$http', function($http) {
  var o = {
    posts: []
  };

  o.getAll = function(){
    return $http.get('/posts').success(function(data){
      angular.copy(data, o.posts);
    });
  };

  o.create = function(post){
    return $http.post('/posts', post).success(function(data){
      o.posts.push(data);
    });
  };

  o.upvote = function(post) {
    return $http.put('/posts/' + post._id + '/upvote')
      .success(function(data){
        post.upvotes += 1;
      });
  };

  o.get = function(id) {
    return $http.get('/posts/' + id).then(function(res){
      return res.data;
    });
  };

  o.addComment = function(id, comment) {
    return $http.post('/posts/' + id + '/comments', comment);
  };

  o.upvoteComment = function(post, comment) {
    return $http.put('/posts/' + post._id + '/comments/' + comment._id + '/upvote')
      .success(function(data){
        comment.upvotes += 1;
      });
  };
  // we return the o object so that any other Angular module that cares to inject it, can
  return o;
}]);

app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts){
    $scope.posts = posts.posts;

    $scope.addPost = function() {
      // below prevents a user from entering a blank post.  No forcing user to enter in a link, however.
      if(!$scope.title || $scope.title === "") {
        alert("Gotta type in that title!");
        return;
      }

      posts.create({
          title: $scope.title,
          link: $scope.link,
      });
        // resets $scope.title to be empty after the fact
        $scope.title = '';
        $scope.link = '';
      }

    $scope.incrementUpvotes = function(post) {
      posts.upvote(post);
    }

}]);


app.controller('PostsCtrl', [
  '$scope',
  'posts',
  'post',
  function($scope, posts, post){

    // now that we have a post variable in our controller, can display that info in our template
    $scope.post = post;

    $scope.addComment = function(){
      if($scope.body === '') {return;}

      posts.addComment(post._id, {
        body: $scope.body,
        author: 'user'
      }).success(function(comment){
        $scope.post.comments.push(comment);
      });
      $scope.body = '';
    };

      $scope.incrementUpvotes = function(comment) {
        posts.upvoteComment(post, comment);
      };

  }]);



