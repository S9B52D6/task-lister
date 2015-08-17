var path = require('path');
var express = require('express')
var mongoose = require('mongoose');

var taskModel = require('../models/task.js');

var apiRouter = express.Router();
mongoose.connect('mongodb://localhost:27017/task-lister');

apiRouter.route('/tasks')
  .get(function(req, res) {
    taskModel.find(function(err, tasks) {
      if(err)
        res.send(err);
      else res.json(tasks);
    });
  })
  .post(function(req, res) {
    var task = new taskModel(req.body);
    task.save(function(err) {
      if(err)
        res.send(err);
      else res.json({success: true, message: "Task created"});
    });
  });

module.exports = apiRouter;
