var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Note = require('../models/Note.js');
var ViewCounter = require('../models/view_counter.js');

// View Counter
router.use( function(req, res, next){
console.log("incrementing counter");	
  ViewCounter.update({_id: undefined},{
  	$inc: { count: 1}
  }, { 
  	upsert: true
  },function(err, res){
  	if(err) throw err;
  });
  next();
})

router.get('/', function(req, res, next) {
	Note.find(function(err, note){
		if(err) return next(err);
		res.json(note);
	})
});

router.post('/', function(req, res, next){
	console.log(req.body);
	Note.create(req.body, function(err, post){
		if(err) return next(err);
		res.json(post);
	})
})

router.get('/:id', function(req, res, next) {
	Note.findById(req.params.id, function(err, note){
		if(err) return next(err);
		res.json(note);
	})
});

router.put('/:id', function(req, res, next) {
	Note.findByIdAndUpdate(req.params.id, req.body, function(err, note){
		if(err) return next(err);
		res.json(note);
	})
});

router.delete('/:id', function(req, res, next) {
	Note.findByIdAndRemove(req.params.id, req.body, function(err, note){
		if(err) return next(err);
		res.json(note);
	})
});


module.exports = router;
