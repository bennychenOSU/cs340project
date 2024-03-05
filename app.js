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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

var hbs = exphbs.create({});
hbs.handlebars.registerHelper("staffingRowID", function(employee_id, store_id) {
    return employee_id.toString() + store_id.toString();
});

hbs.handlebars.registerHelper("deleteParams", function(employee_id, store_id) {
    console.log([employee_id, store_id]);
    return [employee_id, store_id];
});  
 

/*
    ROUTES
*/  
// app.js

app.get('/employees', function(req, res)

    {
        let query1;

        if (req.query.search_employee_id === undefined || req.query.search_employee_id === "") {
            query1 = "SELECT employee_id as ID, employee_name as Name, title as Title FROM Employees;"
        } else {
            query1 = `SELECT employee_id as ID, employee_name as Name, title as Title FROM Employees WHERE employee_id = ${req.query.search_employee_id}`;
        }
       
        let query2 = `SELECT employee_id as ID FROM Employees`;

    
        db.pool.query(query1, function(error, result, fields) {
            let employees = result;
            
            db.pool.query(query2, (error, result, fields) => {
                let employee_ids = result;

                   
                res.render('employees', {data: employees, employee_ids: employee_ids});
                
            })
    
        });
    });

  app.post('/add-employee-form', function(req, res){

    
      let data = req.body;
     
  
      query1 = `INSERT INTO Employees (employee_name, title) VALUES ('${data['input_name']}', '${data['input_title']}')`;
  
      db.pool.query(query1, function(error, rows, fields){
  
          if (error) {
  
              console.log(error)
              res.sendStatus(400);
          }
  
          else
          {
              res.redirect('/employees');
          }
      })
  });
  


app.get('/', function(req, res)

    {
        let query1;

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
app.delete('/delete-staffing-ajax/', function(req,res,next){

    let data = req.body;
  let customerID = parseInt(data.id);
   
    /*
    let data = req.body;
    
    let employee_id = parseInt(data.employee_id);
    let store_id = parseInt(data.store_id); 

    
    let deleteStaffing = `DELETE FROM Staffing WHERE employee_id = ? AND store_id = ?`;
  
  
          // Run the 1st query
          db.pool.query(deleteStaffing, [employee_id, store_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else
              {
                  res.sendStatus(204);
              } 
  }); */

  app.delete("/delete-customer-ajax/", function (req, res, next) {
    console.log(req);
    let data = req.body;
    let customerID = parseInt(data.id);
    let deleteCustomer_Cert_Customer = `DELETE FROM Customers WHERE customerID = ?`;
    let deleteCustomer_Customer = `DELETE FROM Customers WHERE customerID = ?`;
  /*
    // Run the 1st query
    db.pool.query(
      deleteCustomer_Cert_Customer,
      [customerID],
      function (error, rows, fields) {
        if (error) {
          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error);
          res.sendStatus(400);
        } else {
          // Run the second query
          db.pool.query(
            deleteCustomer_Customer,
            [customerID],
            function (error, rows, fields) {
              if (error) {
                console.log(error);
                res.sendStatus(400);
              } else {
                res.sendStatus(204);
              }
            }
          );
        }
      }
    ); */
  });
  

  app.put('/update-staffing', function(req,res,next){
    let data = req.body;
  
    let employee_id = parseInt(data.employee_id);
    let store_id= parseInt(data.store_id);
    let hours = parseInt(data.hours);
  
    let query1 = `UPDATE Staffing SET hours = ? WHERE employee_id = ? AND store_id = ? and hours = ?`;
    let selectWorld = `SELECT * FROM bsg_planets WHERE id = ?`
  
          db.pool.query(query1, [employee_id, store_id, hours], function(error, rows, fields){
              if (error) {
  
              console.log(error);
              res.sendStatus(400);
              }
  
        
              else
              {
        
                res.send(rows);
                      
              }
  })});
    


    /*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});