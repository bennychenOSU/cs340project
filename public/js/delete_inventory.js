function deleteInventory(ID) {
    // Put our data we want to send in a javascript object
  
    let data = {
        item_id: parseInt(ID.toString()[0]),
        store_id: parseInt(ID.toString()[1])
    };


  
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-inventory-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");
  
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
  
  
            // Add the new data to the table
            deleteRow(ID.toString());
  
        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
  }
  
  
  function deleteRow(ID){
  
    let table = document.getElementById("inventory-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == ID) {
            table.deleteRow(i);
            break;
       }
    }
  }
  