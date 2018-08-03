/**
 * Created by Administrator on 2018/8/1 0001.
 */
(function (angular) {
	var app = angular.module('app',['ngRoute','Controllers']);
	app.config(['$routeProvider','$locationProvider',function ($routeProvider,$locationProvider) {
		$locationProvider.hashPrefix('');/*在route版本>1.6.0的时候，默认的hashPrefix被修改为了‘!’。 这里要改为1.6版本以前的样子*/

		$routeProvider.when('/:status?', {
			controller:'MainController',
			templateUrl:'main_temp',
			}
		).otherwise({
			// 跳转到一个地址
			redirectTo: '/'
		});
	}
	]);

	/*app.controller("MainController",['$scope','$routeParams',function ($scope,$routeParams) {
		console.log($routeParams.name);
		$scope.title=$routeParams.name;
	}]);

	app.controller("AController",['$scope','$routeParams',function ($scope,$routeParams) {
		$scope.title="这是A控制器";
	}]);*/
})(angular);
