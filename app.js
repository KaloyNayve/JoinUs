

var express    = require("express"),
    mysql      = require('mysql'),
    bodyParser = require('body-parser'),
    PORT       = process.env.PORT || 8081,
    app        = express();
    
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
    
var connection = mysql.createConnection({
    host     : process.env.DBHOST,
    user     :  process.env.DBUSER,
    password : process.env.DBPASSWORD,
    database : process.env.DBNAME
});




    
app.get("/", function(req, res){
    // Find count of users in Db
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function(err, results){
        if (err) throw err;
        var count = results[0].count;
        // res.send("We have " + count + " users in our db");
        res.render("home", {count: count});
    });
});

//post route
app.post("/register", function(req, res){
    var person = {
        email: req.body.email
    };
    
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
      if (err) throw err;
      res.redirect("/success");
    });
});

//success route
app.get("/success", function(req, res){
    var q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function(err, results){
        if (err) throw err;
        var count = results[0].count;
        // res.send("We have " + count + " users in our db");
        res.render("success", {count: count});
    });
});


app.listen(PORT, function() {
    console.log('App listening on port ' + PORT);
});