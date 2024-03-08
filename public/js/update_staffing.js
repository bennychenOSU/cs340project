

let updateEmployeeForm = document.getElementById('update-staff-form');

updateEmployeeForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let employee_id = document.getElementById("update-staff-id");
    let store_id = document.getElementById("input-store-id");

    let employeeIDValue = employee_id.value;
    let storeIDValue = store_id.value;
    let hours = document.getElementById("update-hours").value;
    
    if (employeeIDValue === undefined || storeIDValue === undefined || hours === undefined || priceValue === undefined) 
    {
        return;
    }
    let data = {
       employeeID: employeeIDValue,
       storeID: storeIDValue,
       hours: hoursValue
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-staffing", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, employeeID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, employee_ID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("staffings-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
      
       if (table.rows[i].getAttribute("data-value") == employee_ID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let store_td = updateRowIndex.getElementsByTagName("td")[1];
            let hours_td = updateRowIndex.getElementsByTagName("td")[2];

            store_td.innerHTML = parsedData[0].storeID; 
            hours_td.innerHTML = parsedData[0].hours; 
       }
    }
}
