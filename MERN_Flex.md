MERN / FLEX Project

What is MERN?
MongoDB Express React Node.js

Will be group project
  - Front end
  - Back end
  - Team Lead (flex)
  - Flex developer


Project setup
`npm install express mongoose passport passport-jwt jsonwebtoken body-parser bcryptjs validator`
`npm install -D nodemon` allows server to refresh with changes we made

## MongoDB Atlas - Online backend
Set IP to 0.0.0.0/0 to allow anyone to connect

## Express - (Router)
  - Sets up handlers for diff HTTP Method requests to diff URL paths
  - Generates responses by passing data to templates (kinda like views)
  - Sets web app settings like port
  - Adds middleware for request handling pipeline
```  
  const express = require("express");
  const router = express.Router();
```

## Mongoose/Models
Sets up schema for our resources (users, tweets)
``` 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
```

## User Registration / Bcryptjs
  - Bcrypt allows us to salt and hash the pw then saves pw digest to DB 
```
const bcrypt = require('bcryptjs');
```

## Passport 
  - Authenticates token and constructs private routes
  - Token is sent in header of every API request


## Validation
  - allows model level validations in the same place
  