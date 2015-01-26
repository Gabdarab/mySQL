
var http = require('http');
var url = require('url');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  	host     : 'localhost',
  	user     : 'ecm-server',
  	password : 'mypass',
  	database : 'menagerie'
});

var server = http.createServer(function (req,res) {
	var myjson;

	req.on('end', function (){
		connection.connect(function(err) {
  			if (err) {
    			console.error('error connecting: ' + err.stack);
    			return;
  			}
			console.log('connected as id ' + connection.threadId);
		});

		connection.query("select * from pet where owner = 'Harold'", function(err, rows, fields) {
			if (err) throw err;
  			var aux = JSON.stringify(rows);
  			var aux2 = JSON.parse(aux);
  			myjson = aux2;

		});
		connection.end();
	})

	res.end("Response: "+ myjson[0].owner);
})

server.listen(8000);
console.log("Server is running.");


/*
connection.connect(function(err) {
  	if (err) {
    	console.error('error connecting: ' + err.stack);
    return;
  }
console.log('connected as id ' + connection.threadId);
});

connection.query("select * from pet where owner = 'Harold'", function(err, rows, fields) {
	if (err) throw err;
  	var aux = JSON.stringify(rows);
  	var aux2 = JSON.parse(aux);
  	console.log(aux2[1].name);

});
connection.end();
*/