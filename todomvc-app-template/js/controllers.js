/**
 * Created by Administrator on 2018/8/1 0001.
 */
(function (angular) {
	'use strict'
	var controllers = angular.module("Controllers",['todoServices']);

	controllers.controller("MainController",['$scope','$routeParams','MainTask','$location',function ($scope,$routeParams,MainTask,$location) {
		//任务列表
		console.log($location);
		$scope.todos=MainTask.get();

		//输入任务
		$scope.task = '';
		//输入方法
		$scope.add = function () {
			if($scope.task != '') {
				MainTask.add($scope.task);
				$scope.task = '';
			}
		};

		//删除任务
		$scope.remove = function (id) {
			MainTask.remove(id);
		};

		//清除完成的任务
		$scope.clear = function () {
			$scope.todos = MainTask.clear();
		};


		//全选
		$scope.selectAll =function () {
			MainTask.selectAll();
		};

		//编辑
		$scope.currentEditingId = -1;
		$scope.edit = function (id) {
			for (var i = 0;i<$scope.todos.length;i++){
				if ($scope.todos[i].id === id) {
					$scope.currentEditingId = id;
					break;
				}
			}
		};

		//更新
		$scope.updata = function () {
			$scope.currentEditingId = -1;
			MainTask.save();
		};

		switch ($routeParams.status) {
			case 'active':
				$scope.selector = { complete: false };
				break;
			case 'completed':
				$scope.selector = { complete: true };
				break;
			default:
				$scope.selector = {};
				break;
		}




	}])

})(angular)
