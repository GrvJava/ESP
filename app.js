var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

console.log("Application starting!");

var game = require('./controllers/gameController');
var login = require('./controllers/loginController');
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json({
    limit: '10mb'
}));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'abcd',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

console.log("Loading routes");
//routes
app.use('/v1', login);
app.use('/v1', game);

console.log('setting HOME_PATH : ', process.env.HOME_PATH);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
