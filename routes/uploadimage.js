var db = require("./database");
var session = require("express-session");

module.exports = function(req, res) {
  var email = req.session.email;

  if (req.files.profile_img) {

    var file = req.files.profile_img;
    var profile_img = file.name;
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg"
    ) {
      var uploadpath = "public/images/" + profile_img;
    var sqldata =
      "update user set profile_img='" +
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
}
}

