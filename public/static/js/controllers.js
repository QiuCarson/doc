
angular.module('myApp',[])
.controller('addcc',['$scope',function($scope){
 //alert("ddd");
  //$scope.success = '登陆成功';
}])

/*
.controller('SigninFormController',['$scope', '$http', '$state', function($scope, $http, $state) {
     $scope.login = function() {
         $http.post(backend_url + '/auth/login', {email: $scope.user.email, password: $scope.user.password})
          .then(function(response) {
            if ( !response.data.status ) {
              $scope.message = response.data.message;
            }else{
                $scope.success = '登陆成功';
                $state.go('dashboard');
            }
          }, function(x) {
            $scope.message = '用户名或密码不正确！';
          });
     }
}]);*/