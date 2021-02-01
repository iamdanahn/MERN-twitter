const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Tweet = require('../../models/Tweet');
const validateTweetInput = require('../../validation/tweets');

router.get('/', (req, res) => { // finds all tweets
    Tweet.find()
        .sort({ date: -1 }) // newest first
        .then(tweets => res.json(tweets)) // renders tweet in json
        .catch(err => res.status(404).json({ notweetsfound: 'No tweets found' }));
});

router.get('/user/:user_id', (req, res) => { 
    Tweet.find({user: req.params.user_id}) // searches all tweets of user
        .then(tweets => res.json(tweets))
        .catch(err =>
            res.status(404).json({ notweetsfound: 'No tweets found from that user' }
        )
    );
});

router.get('/:id', (req, res) => { // finds tweet by id
    Tweet.findById(req.params.id)
        .then(tweet => res.json(tweet))
        .catch(err =>
            res.status(404).json({ notweetfound: 'No tweet found with that ID' })
        );
        
        
    });
router.post('/',
    // adds user on request, passport is middleware fn here
    passport.authenticate('jwt', { session: false }), // authenticates which user is logged in
    (req, res) => {
      const { errors, isValid } = validateTweetInput(req.body); //validates tweet structure
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
  
      const newTweet = new Tweet({ // imported from ln6
        text: req.body.text,
        user: req.user.id
      });
  
      newTweet.save().then(tweet => res.json(tweet));
    }
  );

module.exports = router;
