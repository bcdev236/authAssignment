const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

const session = require('express-session'); 
const passport = require('passport');
const passportSetup = require('./passport')

const authRoute = require('./routes/auth');
const oAuthRoute = require('./routes/oAuth');

const app = express();


app.use(
  session({
      secret: process.env.SESSION_SECRETKEY, 
      resave: false,
      saveUninitialized: false, 
      cookie: {
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          secure: false,
          httpOnly: true,
      },
  })
);

app.use(passport.initialize());
app.use(passport.session());


const { connectToMongoDB } = require('./config');

//Connecting to Database
connectToMongoDB().
then(() => console.log("Conneted to MongoDB"))
.catch((err)=>{
    console.log(err)
});

app.use(cors({
    origin: 'https://auth-assignment-client.vercel.app',
    credentials: true,
}));

//Middleware to parse data
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/oauth", oAuthRoute);

app.listen(process.env.PORT, ()=>{
    console.log(`Server started at ${process.env.PORT}`);
})