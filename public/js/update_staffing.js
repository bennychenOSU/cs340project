// All code was sourced from the starter code for Node.js
// The variable names were adapted to our use case
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data
let updateEmployeeForm = document.getElementById('update-staff-form');

updateEmployeeForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let employee_id = document.getElementById("update_employee_id");
    let store_id = document.getElementById("update_store_id");

    let employeeIDValue = employee_id.value;
    let storeIDValue = store_id.value;
    let hours = document.getElementById("update_hours").value;
    
    if (employeeIDValue === undefined || storeIDValue === undefined || hours === undefined) 
    {
        return;
    }
    let data = {
       employeeID: employeeIDValue,
       storeID: storeIDValue,
       hours: hours
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-staffing", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, employeeIDValue.toString() + storeIDValue.toString());

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, ID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("staffings-table");

    console.log(parsedData[0]);

    for (let i = 0, row; row = table.rows[i]; i++) {
      
       if (table.rows[i].getAttribute("data-value") == ID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let hours_td = updateRowIndex.getElementsByTagName("td")[2];

            hours_td.innerHTML = parsedData[0].hours_worked; 
       }
    }
}
