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
        let query1 = "SELECT * FROM Staffings;"
        
        db.pool.query(query1, function(error, result, fields) {
            res.render('staffings', {data: result});
        });
    });

    // app.js

app.post('/add-staffing-form', function(req, res){
    
    let data = req.body;

    let employee_id = parseInt(data['input-employee-id']);
    if (isNaN(employee_id))
    {
        return;
    }

    let store_id = parseInt(data['input-store-id']);
    if (isNaN(store_id))
    {
        return;
    }

    let hours_worked = parseInt(data['input-hours']);
    if (isNaN(hours_worked)) {
        hours_worked = 0
    }

    query1 = `INSERT INTO Staffings (employee_id, store_id, hours_worked) VALUES ('${data['input-employee_id']}', '${data['input-store-id']}', ${hours_worked})`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/');
        }
    })
});
    


    /*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});