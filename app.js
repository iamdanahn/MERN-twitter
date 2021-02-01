const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const db = require("./config/keys.js").mongoURI;
const passport = require('passport'); // token handler
// require('./config/passport')(passport);

const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const User = require('./models/User')

mongoose
	.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => console.log("Connected to MongoDB successfully"))
	.catch((err) => console.log(err));


// respond to requests from others like Postman
app.use(bodyParser.urlencoded({ 
	extended: false
}))

// respond to json 
app.use(bodyParser.json());


app.use(passport.initialize());
require('./config/passport')(passport);

// # tells Express to use URL path
app.use("/api/users", users);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));




// // callback for every Express route requires `request` and `response` args
// app.get("/", (req, res) => {
// 	const user = new User({
// 		handle: "Test1",
// 		email: "test1@email.com",
// 		password: "test1123"
// 	})
// 	user.save()
// 	res.send("Get in ma bellay")
// });