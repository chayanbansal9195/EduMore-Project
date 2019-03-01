var db = require("./database");
var session = require("express-session")
var bcrypt = require("bcrypt")



module.exports=function(req,res){
    
    
    var email=req.body.email
    var password=req.body.password
    var sql = "SELECT * from user WHERE email = '"+email+"'"
    db.query(sql,(err,results,fields)=>{
        if(err)
        console.log('error occured',err)
        else{
            if(results.length >0){
                

            if(bcrypt.compareSync(password,results[0].password)){
                req.session.loggedIn = true;
                req.session.email = email;
               return res.redirect('/home')
              }
              else{
                res.send({
                  "code":401,
                  "success":"password does not match"
                    });
                }
            }
            else{
                res.send({
                    "code":401,
                    "success":"email does not match"
                      });
            }
        }
    })
}