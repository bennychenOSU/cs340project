/* 
SETUP 
*/

// Express
var express = require('express');  
var app     = express();       
PORT        = 9124;               
var db = require('./db-connector');

// app.js

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     
app.engine('.hbs', engine({extname: ".hbs"}));  
app.set('view engine', '.hbs');                


/*
    ROUTES
*/
// app.js

app.get('/', function(req, res)
    {
        res.render('staffings');                    
    });                                       

    /*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});