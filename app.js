// Code was sourced from the starter code for Node.js
//https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

/* 
SETUP 
*/

// Express
var express = require('express');  
var app     = express();       
PORT        = 9121;               
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

app.get('/', function(req, res) {
    let query1;

    if (req.query.search_sale_id === undefined || req.query.search_sale_id === "") {
        query1 = "SELECT * from Sales;"
    } else {
        query1 = `SELECT * from Sales WHERE sale_id = ${req.query.search_sale_id}`
    }

    let query2 = "SELECT sale_id from Sales;"
    let query3 = "SELECT item_id from Items;"
    let query4 = "SELECT employee_id from Employees;"
    let query5 = "SELECT customer_id from Customers;"
    let query6 = "SELECT store_id from Stores;"

    db.pool.query(query1, function(error, result, fields) {
        if (error) {
            console.log(error);
        } else {
            let data = result;
            db.pool.query(query2, (error, result, fields) => {
                if (error) {
                    console.log(error);
                } else {
                    let sale_ids = result;
                    db.pool.query(query3, (error, result, fields) => {
                        if (error) {
                            console.log(error);
                        } else {
                            let item_ids = result;
                            db.pool.query(query4, (error, result, fields) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    let employee_ids = result;
                                    db.pool.query(query5, (error, result, fields) => {
                                        if (error) {
                                            console.log(error);
                                        } else {
                                            let customer_ids = result;
                                            db.pool.query(query6, (error, result, fields) => {
                                                if (error) {
                                                    console.log(error);
                                                } else {
                                                    let store_ids = result;
                                                    res.render('sales', {data: data, sale_ids: sale_ids, item_ids: item_ids, employee_ids: employee_ids, customer_ids: customer_ids, store_ids: store_ids})
                                                }

                                            }) 

                    
                                        }
                                    })
                                }
                            })
                        }
                    })

                }
            })
        }
    })
});

app.post('/add-sale-form', function(req, res){

    
    let data = req.body;

    console.log("here")
   

    query1 = `INSERT INTO Sales (item_id, quantity, sales_total, employee_id, customer_id, store_id) VALUES ('${data['add_item_id']}', '${data['add_quantity']}', '${data['add_total']}', '${data['add_employee_id']}', '${data['add_customer_id']}', '${data['add_store_id']}')`;

    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/sales');
        }
    })
});

app.delete("/delete-sale-ajax/", function(req, res, next) {
    let data = req.body;
    let saleID = parseInt(data["id"]);
    let deleteSaleQuery = `DELETE FROM Sales WHERE sale_id = ?`;
    db.pool.query(deleteSaleQuery, [saleID], function(error, rows, fields) {
      if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        //console.log(error);
        res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
        }

    })
  });

  app.put('/put-sale', function(req,res,next){
    let data = req.body;

    console.log(data);
  
    let sale_id = parseInt(data["sale_id"]);
    let item_id = parseInt(data["item_id"]);
    let quantity = parseInt(data["quantity"]);
    let total = parseInt(data["total"]);
    let employee_id = parseInt(data["employee_id"]);
    let customer_id = parseInt(data["customer_id"]);
    let store_id = parseInt(data["store_id"]);
   
  
    let query1 = `UPDATE Sales SET item_id = ?, quantity = ?, sales_total = ?, employee_id = ?, customer_id = ?, store_id = ?  WHERE sale_id = ?`;
    let query2 = `SELECT * FROM Sales WHERE sale_id = ?`
  
          // Run the 1st query
          db.pool.query(query1, [item_id, quantity, total, employee_id, customer_id, store_id, sale_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else {
                db.pool.query(query2, [sale_id], function(error, rows, fields) {
                  if (error) {
  
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                    } else {
                      res.send(rows);
                    }
                })                    
                
              }
  })});


app.get('/stores', function(req, res) {
    let query1;

    if (req.query.search_store_id === undefined || req.query.search_store_id === "") {
        query1 = "SELECT * from Stores;"
    } else {
        query1 = `SELECT * from Stores WHERE item_id = ${req.query.search_store_id}`
    }

    let query2 = "SELECT store_id from Stores;"

    db.pool.query(query1, function(error, result, fields) {
        let stores = result;
        
        db.pool.query(query2, (error, result, fields) => {
            let store_ids = result;
               
            res.render('stores', {data: stores, store_ids: store_ids});            
        })
    });

});

app.post('/add-store-form', function(req, res){

    
    let data = req.body;

    console.log("here")
   

    query1 = `INSERT INTO Stores (city, store_size) VALUES ('${data['add_city']}', '${data['add_size']}')`;

    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/stores');
        }
    })
});

app.delete("/delete-store-ajax/", function(req, res, next) {
    let data = req.body;
    let storeID = parseInt(data["id"]);
    let deleteStoreQuery = `DELETE FROM Stores WHERE store_id = ?`;
    db.pool.query(deleteStoreQuery, [storeID], function(error, rows, fields) {
      if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        //console.log(error);
        res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
        }

    })
  });

  app.put('/put-store', function(req,res,next){
    let data = req.body;
  
    let id = parseInt(data["id"]);
    let city = data["city"];
    let size = parseInt(data["size"]);
   
  
    let query1 = `UPDATE Stores SET city = ?, store_size = ?  WHERE store_id = ?`;
    let query2 = `SELECT * FROM Stores WHERE store_id = ?`
  
          // Run the 1st query
          db.pool.query(query1, [city, size, id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else {
                db.pool.query(query2, [id], function(error, rows, fields) {
                  if (error) {
  
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                    } else {
                      res.send(rows);
                    }
                })                    
                
              }
  })});
  





app.get('/items', function(req, res) {
    let query1;

    if (req.query.search_item_id === undefined || req.query.search_item_id === "") {
        query1 = "SELECT * from Items;"
    } else {
        query1 = `SELECT * from Items WHERE item_id = ${req.query.search_item_id}`
    }

    let query2 = "SELECT item_id from Items;"

    db.pool.query(query1, function(error, result, fields) {
        let items = result;
        
        db.pool.query(query2, (error, result, fields) => {
            let item_ids = result;
               
            res.render('items', {data: items, item_ids: item_ids});            
        })
    });

});

app.post('/add-item-form', function(req, res){

    
    let data = req.body;

    console.log("here")
   

    query1 = `INSERT INTO Items (category, brand, price) VALUES ('${data['add_item_category']}', '${data['add_item_brand']}', '${data['add_item_price']}')`;

    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/items');
        }
    })
});

app.delete("/delete-item-ajax/", function(req, res, next) {
    let data = req.body;
    let itemID = parseInt(data["item_id"]);
    let deleteEmployeeQuery = `DELETE FROM Items WHERE item_id = ?`;
    db.pool.query(deleteEmployeeQuery, [itemID], function(error, rows, fields) {
      if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        //console.log(error);
        res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
        }

    })
  });

  app.put('/put-item', function(req,res,next){
    let data = req.body;
  
    let item_id = parseInt(data.item_id);
    let category = data.category;
    let brand = data.brand;
    let price = parseInt(data.price);
  
    let query1 = `UPDATE Items SET category = ?, brand = ?, price = ? WHERE item_id = ?`;
    let query2 = `SELECT * FROM Items WHERE item_id = ?`

  
    db.pool.query(query1, [category, brand, price, item_id], function(error, rows, fields){
        if (error) {

        console.log(error);
        res.sendStatus(400);
        } else {
            db.pool.query(query2, [item_id], function(error, rows, fields) {
                if (error) {

                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error);
                res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});
    
                   
app.get('/employees', function(req, res)

    {
        let query1;

        if (req.query.search_employee_id === undefined || req.query.search_employee_id === "") {
            query1 = "SELECT employee_id as ID, employee_name as Name, title as Title FROM Employees;"
        } else {
            query1 = `SELECT employee_id as ID, employee_name as Name, title as Title FROM Employees WHERE employee_id = ${req.query.search_employee_id}`;
        }
       
        let query2 = `SELECT employee_id as ID FROM Employees;`

        db.pool.query(query1, function(error, result, fields) {
            let employees = result;
            
            db.pool.query(query2, (error, result, fields) => {
                let employee_ids = result;

                   
                res.render('employees', {data: employees, employee_ids: employee_ids});
                
            })
    
        });

    
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
  


app.get('/staffings', function(req, res)

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




app.delete('/delete-staffing-ajax/', function(req,res,next){
   
    
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
          })
  });

  app.delete("/delete-employee-ajax/", function(req, res, next) {
    let data = req.body;
    let employeeID = parseInt(data["id"]);
    let deleteEmployeeQuery = `DELETE FROM Employees WHERE employee_id = ?`;
    db.pool.query(deleteEmployeeQuery, [employeeID], function(error, rows, fields) {
      if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        //console.log(error);
        res.sendStatus(400);
        }
        else
        {
            res.sendStatus(204);
        }

    })
  });

  app.put('/put-employee', function(req,res,next){
    let data = req.body;
  
    let id = parseInt(data["id"]);
    let name = data["name"];
    let title = data["title"];
   
  
    let updateEmployeeQuery = `UPDATE Employees SET employee_name = ?, title = ?  WHERE employee_id = ?`;
    let query2 = `SELECT employee_id as ID, employee_name as Name, title as Title FROM Employees WHERE employee_id = ?`
  
          // Run the 1st query
          db.pool.query(updateEmployeeQuery, [name, title, id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else {
                db.pool.query(query2, [id], function(error, rows, fields) {
                  if (error) {
  
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                    } else {
                      res.send(rows);
                    }
                })                    
                
              }
  })});
  

  app.put('/update-staffing', function(req,res,next){
    let data = req.body;
  
    let employee_id = parseInt(data.employee_id);
    let store_id= parseInt(data.store_id);
    let hours = parseInt(data.hours);
  
    let query1 = `UPDATE Staffing SET hours = ? WHERE employee_id = ? AND store_id = ? and hours = ?`;
    let selectWorld = `SELECT * FROM employees WHERE id = ?`
  
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

  app.get('/customers', function(req, res)

    {
        let query1;

        if (req.query.search_customer_id === undefined || req.query.search_customer_id === "") {
            query1 = "SELECT * FROM Customers;"
        } else {
            query1 = `SELECT * FROM Customers WHERE customer_id = ${req.query.search_customer_id};`;
        }
       
        let query2 = `SELECT customer_id FROM Customers;`

        db.pool.query(query1, function(error, result, fields) {
            let customers = result;
            
            db.pool.query(query2, (error, result, fields) => {
                let customer_ids = result;

                   
                res.render('customers', {data: customers, customer_ids: customer_ids});
                
            })
    
        });

    });

app.post('/add-customer-form', function(req, res){

    let data = req.body;

  
    query1 = `INSERT INTO Customers (customer_name, city) VALUES ('${data['input_name']}', '${data['input_city']}')`;

    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }

        else
        {
            res.redirect('/customers');
        }
    })
});

app.delete("/delete-customer-ajax/", function(req, res, next) {
    let data = req.body;
    let customerID = parseInt(data["id"]);
    let deleteCustomerQuery = `DELETE FROM Customers WHERE customer_id = ?`;
    let updateSalesCustomer = `UPDATE Sales SET customer_id = Null WHERE customer_id = ?`
    db.pool.query(deleteCustomerQuery, [customerID], function(error, rows, fields) {
      if (error) {
  
        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }
        else
        {
            db.pool.query(updateSalesCustomer, [customerID], (error, rows, fields) => {
                if (error) {
                    console.log(error)
                } else {
                    res.sendStatus(204);
                }
            })
        }

    })
  });

  app.put('/put-customer', function(req,res,next){
    let data = req.body;
  
    let id = parseInt(data["id"]);
    let name = data["name"];
    let city = data["city"];
   
  
    let updateCustomerQuery = `UPDATE Customers SET customer_name = ?, city = ?  WHERE customer_id = ?`;
    let query2 = `SELECT * FROM Customers WHERE customer_id = ?`
  
          // Run the 1st query
          db.pool.query(updateCustomerQuery, [name, city, id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              else {
                db.pool.query(query2, [id], function(error, rows, fields) {
                  if (error) {
  
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                    } else {
                      res.send(rows);
                    }
                })                    
                
              }
  })});

    


    /*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
