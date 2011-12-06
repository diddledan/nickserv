
  module.exports = function(worker) {
    var q, tasks, workers;
    workers = 0;
    tasks = [];
    q = {
      push: function(data) {
        tasks.push(data);
        return q.process();
      },
      process: function() {
        if (workers === 0) {
          workers++;
          return worker(tasks.shift(), function() {
            workers--;
            if (tasks.length) return q.process();
          });
        }
      },
      length: function() {
        return tasks.length;
      },
      running: function() {
        return workers;
      }
    };
    return q;
  };