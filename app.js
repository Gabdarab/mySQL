
var http = require('http');
var mysql = require('mysql');

var pool = mysql.createPool({
  	host     : 'localhost',
  	user     : 'ecm-server',
  	password : 'mypass',
  	database : 'menagerie'
});

var server = http.createServer(function (req,res) {
    

    pool.getConnection(function(err, connection){
        if (err){
            throw err;
        }else{
            connection.query("select * from pet where owner = 'Harold'", function(err, rows){
                if (err) {
                    throw err;
                }else{
                    console.log("Query finished: " + rows[0].name);
                    res.end("Query finished: " + rows[0].name);
                }
            })
            connection.release(console.log("Connection released!"));
        };
    });  

})

server.listen(8000);
console.log("Server is running.");