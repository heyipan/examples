/**
 * Created by Administrator on 2018/8/1 0001.
 */
(function (angular) {
	'use strict'
	var controllers = angular.module("Controllers",[]);

	controllers.controller("MainController",['$scope','$routeParams',function ($scope,$routeParams) {
		//任务列表
		$scope.todos=[
			{id:1,task:'学习',complete:false},
			{id:2,task:'练习',complete:false},
			{id:3,task:'看书',complete:true}
		];

		//输入任务
		$scope.task = '';
		//输入方法
		$scope.add = function () {
			if($scope.task != '') {
				$scope.todos.push({
					id:new Date().getTime(),
					task:$scope.task,
					complete:false,
				});
				$scope.task = '';
			}
		};

		//删除任务
		$scope.remove = function (id) {
			for (var i = 0;i<$scope.todos.length;i++){
				if ($scope.todos[i].id === id) {
					$scope.todos.splice(i,1);
					break;
				}
			}
		};

		//清除完成的任务
		$scope.clear = function () {
			var todos =[];
			for (var i = 0;i<$scope.todos.length;i++){
				//这里应为长度是一直在动态改变的 所以存在刚开始的时候长度为8 循环一段时间后8变成了3
				//简单点说就是 length在变小而i在变大  正常应该是length不变i变大
				/*if ($scope.todos[i].complete === true) {
				 $scope.todos.splice(i,1);
				 }*/
				if (!$scope.todos[i].complete) {
					todos.push($scope.todos[i]);
				}
			}
			$scope.todos=todos;
		};

		$scope.checkAll = false;
		//全选
		$scope.selectAll = function () {
			for (var i=0;i<$scope.todos.length;i++){
				$scope.todos[i].complete = !$scope.checkAll;
			}
			$scope.checkAll = !$scope.checkAll;
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
