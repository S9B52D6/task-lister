var mongoose = require('mongoose');
var schema = mongoose.Schema

var taskSchema =
  new schema(
    {
      text: {type: String, required: true},
      timestamp: {type: Date, required: true}
    });

module.exports = mongoose.model('task', taskSchema);
