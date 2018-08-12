/**
 * Created by Administrator on 2018/8/3 0003.
 */
(function (angular) {
	var services = angular.module("todoServices",[]);
	services.service('MainTask',['$window',function ($window) {
		var storage = $window.sessionStorage;//获取本地的回话 localStorage 是保存到本地缓存
		//任务列表
		var todos = storage.getItem('my_todos')?JSON.parse(storage.getItem('my_todos')):[];

		/*var todos=[
			{id:1,task:'学习',complete:false},
			{id:2,task:'练习',complete:false},
			{id:3,task:'看书',complete:true}
		];*/
		//获取数据
		this.get = function () {
			return todos;
		};
		//输入方法
		this.add = function (task) {
			if(task != '') {
				 todos.push({
					id:new Date().getTime(),
					task:task,
					complete:false,
				});
			}
			this.save();
		};
		//保存到回话中
		this.save = function () {
			storage.setItem("my_todos",JSON.stringify(todos));
		};
		//删除任务
		this.remove = function (id) {
			for (var i = 0;i<todos.length;i++){
				if (todos[i].id === id) {
					todos.splice(i,1);
					break;
				}
			}
			this.save();
		};

		//清除完成的任务
		this.clear = function () {
			var newTodos =[];
			for (var i = 0;i<todos.length;i++){
				//这里应为长度是一直在动态改变的 所以存在刚开始的时候长度为8 循环一段时间后8变成了3
				//简单点说就是 length在变小而i在变大  正常应该是length不变i变大
				/*if ($scope.todos[i].complete === true) {
				 $scope.todos.splice(i,1);
				 }*/
				if (!todos[i].complete) {
					newTodos.push(todos[i]);
				}
			}
			todos=newTodos;
			this.save();
			return todos;
		};

		var checkAll = false;
		//全选
		this.selectAll = function () {
			for (var i=0;i<todos.length;i++){
				todos[i].complete = !this.checkAll;
			}
			this.checkAll = !this.checkAll;
			this.save();
		};

		//编辑
		var currentEditingId = -1;
		this.edit = function (id) {
			for (var i = 0;i<todos.length;i++){
				if (todos[i].id === id) {
					currentEditingId = id;
					break;
				}
			}
		};

		//更新
		this.updata = function () {
			currentEditingId = -1;

		};

	}])
})(angular);
