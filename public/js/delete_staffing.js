// All code was sourced from the starter code for Node.js
// The variable names were adapted to our use case
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

function deleteStaffing(ID) {
  // Put our data we want to send in a javascript object

  let data = {
      employee_id: ID.toString()[0],
      store_id: ID.toString()[1]
  };

  // Setup our AJAX request
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", "/delete-staffing-ajax", true);
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


function deleteRow(employeeID){

  let table = document.getElementById("staffings-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
     //iterate through rows
     //rows would be accessed using the "row" variable assigned in the for loop
     if (table.rows[i].getAttribute("data-value") == employeeID) {
          table.deleteRow(i);
          break;
     }
  }
}
