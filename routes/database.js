var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'hack'
})

connection.connect((err)=>{
    if(err)
    console.log(err)
    else
    console.log('Database is connected..')
})

module.exports=connection;