// All code was sourced from the starter code for Node.js
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

let updateEmployeeForm = document.getElementById('update-employee-form');

// Modify the objects we need
updateEmployeeForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let id = document.getElementById("update_employee_id");
    let name = document.getElementById("update_employee_name")
    let title = document.getElementById("update_employee_title");


    let idValue = id.value;
    let nameValue = name.value;
    let titleValue = title.value;


    if (nameValue === undefined || titleValue === undefined) 
    {
        return;
    }
    let data = {
        id: idValue,
        name: nameValue,
        title: titleValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-employee", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, idValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, employeeID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("employees-table");

    console.log(parsedData);

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == employeeID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let name_td = updateRowIndex.getElementsByTagName("td")[1];
            let title_td = updateRowIndex.getElementsByTagName("td")[2];
            name_td.innerHTML = parsedData[0].name;
            title_td.innerHTML = parsedData[0].title; 
       }
    }
}
