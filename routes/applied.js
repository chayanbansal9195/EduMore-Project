var db = require("./database");

module.exports=function(req,res){
    var sql = "SELECT * from record"
    db.query(sql,(err,rows)=>{
        if(err)
        console.log('error occured',err)
        else{
        res.render('record',{data:rows})
        }
    })  
}