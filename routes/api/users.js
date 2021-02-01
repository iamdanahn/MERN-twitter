const express = require("express"); // grabs express pkg from node
const router = express.Router();    // express pkg has #Router 
const bcrypt = require('bcryptjs'); 
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// router creates path for url 

// `/api/users/current` 
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email
  });
})
// in this case, POST method to `/api/users/register` api/users comes from app.jsx
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check to make sure nobody has already registered with a duplicate email
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        // Throw a 400 error if the email address already exists
        return res.status(400).json({email: "A user has already registered with this address"})
      } else {
        // Otherwise create a new user
        const newUser = new User({
          handle: req.body.handle,
          email: req.body.email,
          password: req.body.password
        })


        // BCRYPT gens hashed pw 
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash; // sets pw as pw digest, not actual pw
            newUser
                .save() // saves newUser
                .then(user => {
                    const payload = { id: user.id, handle: user.handle };

                    // json web token creates a session token
                    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                        res.json({
                        success: true,
                        token: "Bearer " + token
                        });
                    });
                })
                .catch(err => console.log(err));
            });
        });
      }
    })
})

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // grabs User model from Mongoose
  // findOne gives single object, find gives array
  User.findOne({email})
    .then(user => {
      if (!user) {
        return res.status(404).json({email: 'This user does not exist'});
      }

        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
            const payload = {id: user.id, handle: user.handle, email: user.email};

            jwt.sign(
                payload,
                keys.secretOrKey,
                // Tell the key to expire in one hour
                {expiresIn: 3600},
                (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
                });
            } else {
            return res.status(400).json({password: 'Incorrect password'});
            }
        })
    })
})


// creates `/api/users/test` path. When hit, json response msg is displayed
// test out on `localhost:5000/api/users/test`
router.get("/test", (req, res) => res.json({ msg: "This is the users route" }));

module.exports = router;
