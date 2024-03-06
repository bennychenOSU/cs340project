// All code was sourced from the starter code for Node.js
// The variable names were adapted to our use case
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
function deleteSale(ID) {
    
    let data = {
        id: ID
    };
  
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-sale-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
  
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
  
  
            // Add the new data to the table
            deleteRow(ID);
  
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
  }
  
  
  function deleteRow(ID){
  
    let table = document.getElementById("sales-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == ID) {
            table.deleteRow(i);
            break;
       }
    }
  }
  