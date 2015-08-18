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

apiRouter.route('/tasks/:id')
  .get(function(req, res) {
    taskModel.findById(req.params.id, function(err, task) {
      if(err)
        res.send(err)
      else res.json(task);
    })
  })
  .patch(function(req, res) {
    taskModel.findById(req.params.id, function(err, task) {
      if(err)
        res.send(err);
      else
      {
        if(req.body.text)
          task.text = req.body.text;
        if(req.body.timestamp)
          task.timestamp = req.body.timestamp;

        task.save(function(err) {
          if(err)
            res.send(err);
          else res.json({success:true, message:"Task updated"});
        });
      }
    })
  })
  .delete(function(req, res) {
    taskModel.findByIdAndRemove(req.params.id, function(err) {
      if(err)
        res.send(err)
      else res.json({success:true, message:"Task deleted"});
    });
  });

module.exports = apiRouter;