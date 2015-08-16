angular.module('task-lister', [])

  .controller('taskController', function($scope, $http) {
    $scope.tasks = ["Wake up", "Brush teeth", "Go to school"];

    $scope.addTask = function(newTask) {
      $scope.tasks.push(newTask);
    };
  });
