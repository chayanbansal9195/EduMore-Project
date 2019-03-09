var express = require('express')
var bodyParser = require('body-parser')
var morgan = require("morgan")
var session = require("express-session")
var fileUpload = require('express-fileupload')
var path = require("path")
var db = require('./routes/database')


var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))
app.use(session({secret:"wesdfgtrftt564324", saveUninitialized:true, resave:true}))


app.use('/img', express.static('img'))
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

//session auth

var auth = function(req,res,next){
    if(req.session.loggedIn){
        next();
       
    }
    
    else{
        res.redirect('/');
    }
}


//register
var register = require('./routes/register')
app.route('/register',).post(register)
app.get('/register',(req,res)=>{
    res.sendFile(__dirname+'/register.html')
})

//login
var login = require('./routes/login')
app.route('/login').post(login)
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/login.html')
})

//logout
app.get('/logout',function(req,res){
    //req.logout();
    req.session.loggedIn=false;
    res.redirect('/');
});




//record
var record = require('./routes/record')
app.route('/record').post(record)
app.get('/record',auth,(req,res)=>{
    res.sendFile(__dirname+'/record.html')
})

//home
app.get('/home',auth,(req,res)=>{
    res.sendFile(__dirname+'/home.html')
})

//applied
app.get('/applied',auth,(req,res)=>{
    var email = req.session.email
    db.query("SELECT * from record where email= '" + email + "'",(err,results)=>{
        res.render('applied',{
            records:results
        })
        
    }) 
})


//viewprofile

app.get('/profile',auth,(req,res)=>{
    var email = req.session.email
    db.query("SELECT * from user where email= '" + email + "'",(err,results)=>{
        res.render('viewprofile',{
            profile:results
        })
    }) 
})

//profile_update
var profile_update = require('./routes/profile_update')

app.route('/profile_update').post(profile_update)

app.get('/profile_update',auth,(req,res)=>{
    var email = req.session.email
    db.query("SELECT * from user where email= '" +email + "'",(err,results)=>{
        res.render('profile_update',{
            profile:results
        })
    }) 
})

//uploadimage
var uploadimage = require('./routes/uploadimage')

app.route('/uploadimage').post(uploadimage)

app.get('/uploadimage',auth,(req,res)=>{
        res.render('uploadimage') 
})



app.listen(3000)

console.log('server connected....')