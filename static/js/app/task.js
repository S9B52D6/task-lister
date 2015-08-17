angular.module('task-lister', [])

  .controller('taskController', function($scope, $http) {
    $scope.tasks = [];
    
    $scope.addTask = function(newTask) {
      $scope.tasks.push({text: newTask, timestamp: new Date().toLocaleString()});
      $scope.newTask = "";
    };
  });
