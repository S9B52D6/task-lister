angular.module('task-lister', [])

  .controller('taskController', function($scope, $http) {
    loadTasks($scope, $http);

    $scope.addTask = function(taskText) {
      $http.post('/api/tasks', {'text':taskText, 'timestamp': new Date().valueOf()})
        .success(function(data) {
          loadTasks($scope, $http);
          $scope.taskText = "";
        });
    };
  });

function loadTasks($scope, $http)
{
  $scope.tasks = [];
  $http.get('/api/tasks')
    .success(function(data) {
      angular.forEach(data, function(value) {
        this.push({text: value.text, timestamp: new Date(value.timestamp).toLocaleString()});
      }, $scope.tasks);
    });
}
