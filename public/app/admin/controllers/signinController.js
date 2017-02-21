define(['app'], function(app) {
    return app.controller('signinController',['$scope','$http','$state',function($scope, $http, $state){

        $scope.login = function() {
            $http.post( '/auth/login', {email: $scope.user.email, password: $scope.user.password})
                .then(function(response) {
                    //console.log(response);
                    if ( !response.data.status ) {
                        $scope.alert = {type: 'danger', msg: response.data.message };
                        $scope.isCollapsed = false;
                        //$scope.message = response.data.message;
                    }else{
                        $scope.success = '登陆成功';
                        $state.go('main.dashboard');
                    }
                }, function(x) {
                    //$scope.message = '用户名或密码不正确！';
                    $scope.alert = {type: 'danger', msg: '用户名或密码不正确' };
                    $scope.isCollapsed = false;
                });
        }

        $scope.closeAlert = function() {
            $scope.isCollapsed = true;
        };
        $scope.isCollapsed = true;

    }]).controller('mainleft', function ($scope) {

    })
})
