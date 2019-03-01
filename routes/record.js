var db = require('./database')
var session = require("express-session")


module.exports=function(req,res){
    var college= req.body.college
    var date=req.body.date
    var email =req.session.email;
    var sql = "INSERT INTO record (email,college,date) VALUES ('"+email+"','"+college+"','"+date+"')"
    db.query(sql,(err,results,fields)=>{
        if(err)
        console.log('error occured',err)
        else{
        return res.redirect('/home')
    }
    })
}