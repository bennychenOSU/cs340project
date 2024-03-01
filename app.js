/* 
SETUP 
*/

// Express
var express = require('express');  
var app     = express();       
PORT        = 9124;               
var db = require('./database/db-connector');

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
        let query1;
        console.log(req.query);

        if (req.query.search_employee_id === undefined) {
            query1 = "SELECT * FROM Staffings;"
        } else {
            query1 = `SELECT * FROM Staffings WHERE employee_id = ${req.query.search_employee_id}`;
        }
       
        let query2 = `SELECT employee_id FROM Employees`;
        let query3 = `SELECT store_id FROM Stores`;
        
        db.pool.query(query1, function(error, result, fields) {
            let staffings = result;
            
            db.pool.query(query2, (error, result, fields) => {
                let employee_ids = result;

                db.pool.query(query3, (error, result, fields) => {
                    let store_ids = result;
                    res.render('staffings', {data: staffings, employee_ids: employee_ids, store_ids: store_ids});
                })
            })
    
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