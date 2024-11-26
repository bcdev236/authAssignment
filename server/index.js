const express = require('express');
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config();

const authRoute = require('./routes/auth');
const oAuthRoute = require('./routes/oAuth');

const app = express();

// test
// const cookieSession = require('cookie-session');
const session = require('express-session'); 
const passport = require('passport');
const passportSetup = require('./passport')

// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["cyberwolve"],
//     maxAge: 24*60*60*1000,
//   })  
// );

app.use(
  session({
      secret: 'cyberwolve', // Replace with a strong secret key
      resave: false, // Prevent resaving session if unmodified
      saveUninitialized: false, // Do not save uninitialized sessions
      cookie: {
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          secure: false,
          httpOnly: true,
      },
  })
);


app.use(passport.initialize());
app.use(passport.session());


// test close


const { connectToMongoDB } = require('./config');



//Connecting to Database
connectToMongoDB().
then(() => console.log("Conneted to MongoDB"))
.catch((err)=>{
    console.log(err)
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

//Middleware to parse data
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/oauth", oAuthRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`Server started at ${process.env.PORT}`);
})