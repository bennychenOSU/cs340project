

let updatePersonForm = document.getElementById('update-staffing-form');

updatePersonForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let inputEmployeeID = document.getElementById("update-employee-id");
    let inputStoreID = document.getElementById("input-store-id");

    let employeeIDValue = inputEmployeeID.value;
    let storeIDValue = inputStoreID.value;
    let hours = document.getElementById("update-hours").value;
    
    let data = {
       employeeID: employeeIDValue,
       storeID: storeIDValue,
       hours: hours

    }
    

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-staffing", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, fullNameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));

})


function updateRow(data){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("staffing-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
      
       if (table.rows[i].getAttribute("data-value") == parsedData[0].employee_id.toString()
        + parsedData[0].storeID.toString()) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            let td = updateRowIndex.getElementsByTagName("td")[2];

            td.innerHTML = parsedData[0].hours; 
       }
    }
}
