var db = require("./database");
var bcrypt = require("bcrypt")


module.exports = function(req, res) {

  var username = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var confirm_password = req.body.confirm_password;

  var emailCheck = "SELECT * from user WHERE email = '"+email+"'"
  db.query(emailCheck,(err,results,fields)=>{
      if(err)
      console.log('error occured',err)
      else{
          if(results.length >0){
            console.log("email exists")
            res.send({
              "code":401,
              "success":"Email already exists"
                });
          }
          else{
              if (password === confirm_password) {
                var hash=bcrypt.hashSync(password,10)
               
                var sql =
                  "INSERT INTO user (username,email,password) VALUES ('" +
                  username +
                  "','" +
                  email +
                  "','" +
                  hash +
                  "')";
                db.query(sql, (err, results) => {
                  if (err) console.log("error occured", err);
                  else {
                   
                    return res.redirect('/');
                  } 
                });
              } else {
               res.send("unmatched password")
              }


            }
          }
          
        })
};
