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

    $scope.removeTask = function(task) {
      $http.delete('/api/tasks/'+task._id)
        .success(function() {
          loadTasks($scope, $http);
        });
    };
  })

  .directive('ngEnter', function() {
      return function(scope, element, attrs) {
          element.bind("keydown keypress", function(event) {
              if(event.which === 13) {
                  scope.$apply(function() {
                      scope.$eval(attrs.ngEnter, {'event': event});
                  });

                  event.preventDefault();
              }
          });
      };
  });

function loadTasks($scope, $http)
{
  $scope.tasks = [];
  $http.get('/api/tasks')
    .success(function(data) {
      angular.forEach(data, function(value) {
        value.timestamp = new Date(value.timestamp).toLocaleString();
        this.push(value);
      }, $scope.tasks);
    });
}
