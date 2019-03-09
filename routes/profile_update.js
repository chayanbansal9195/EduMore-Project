var db = require("./database");
var session = require("express-session");

module.exports = function(req, res) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var age = req.body.age;
  var city = req.body.city;
  var pnumber = req.body.pnumber;
  var name = req.body.name;
  var email = req.session.email;

  

   
    var sqldata =
      "update user set username='" +
      name +
      "',fname = '" +
      fname +
      "',lname='" +
      lname +
      "',age='" +
      age +
      "',city='" +
      city +
      "',pnumber='" +
      pnumber +
      "' where email = '" +
      email +
      "'  ";
    db.query(sqldata, (err, results, fields) => {
      if (err) console.log("error occured", err);
      else {
        return res.redirect("/profile");
      }
    });
  }