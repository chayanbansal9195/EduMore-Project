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

  if (
    name != "" &&
    fname != "" &&
    lname != "" &&
    age != "" &&
    city != "" &&
    pnumber != ""&&req.files.profile_img!=""
  ) {

    var file = req.files.profile_img;
    var profile_img = file.name;
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg"
    ) {
      var uploadpath = "public/images/" + profile_img;
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
      "',profile_img='" +
      profile_img +
      "' where email = '" +
      email +
      "'  ";
    db.query(sqldata, (err, results, fields) => {
      if (err) console.log("error occured", err);
      else {
        return res.redirect("/profile");
      }
    });
    file.mv(uploadpath, err => {
      if (err) throw err;
      else console.log("file uploaded");
    });
  } else res.send("Wrong file format");
  
  } else if (name != "") {
    var sql1 =
      "update user set username='" + name + "'where email = '" + email + "'  ";
    db.query(sql1, (err, results, fields) => {
      if (err) console.log("error occured", err);
      else {
        return res.redirect("/profile");
      }
    });
  } else if (fname != "") {
    var sql2 =
      "update user set fname = '" + fname + "'where email = '" + email + "'  ";
    db.query(sql2, (err, results, fields) => {
      if (err) console.log("error occured", err);
      else {
        return res.redirect("/profile");
      }
    });
  } else if (lname != "") {
    var sql3 =
      "update user set lname='" + lname + "' where email = '" + email + "'  ";
    db.query(sql3, (err, results, fields) => {
      if (err) console.log("error occured", err);
      else {
        return res.redirect("/profile");
      }
    });
  } else if (age != "") {
    var sql4 =
      "update user set age='" + age + "'where email = '" + email + "'  ";
    db.query(sql4, (err, results, fields) => {
      if (err) console.log("error occured", err);
      else {
        return res.redirect("/profile");
      }
    });
  } else if (city != "") {
    var sql5 =
      "update user set city='" + city + "'where email = '" + email + "'  ";
    db.query(sql5, (err, results, fields) => {
      if (err) console.log("error occured", err);
      else {
        return res.redirect("/profile");
      }
    });
  } else if (pnumber != "") {
    var sql6 =
      "update user set pnumber='" +
      pnumber +
      "'where email = '" +
      email +
      "'  ";
    db.query(sql6, (err, results, fields) => {
      if (err) console.log("error occured", err);
      else {
        return res.redirect("/profile");
      }
    });
  } else if (req.files.profile_img) {
    var file = req.files.profile_img;
    var profile_img = file.name;
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg"
    ) {
      var uploadpath = "public/images/" + profile_img;
      var sql7 =
        "update user set profile_img='" +
        profile_img +
        "' where email = '" +
        email +
        "'  ";
      db.query(sql7, function(err, result) {
        if (err) console.log("error occured", err);
        else {
          console.log("files uploaded");
          return res.redirect("/profile");
        }
      });
      file.mv(uploadpath, err => {
        if (err) throw err;
        else console.log("file uploaded");
      });
    } else res.send("Wrong file format");
  } else return res.redirect("/profile");
};
