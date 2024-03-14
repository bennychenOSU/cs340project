// All code was sourced from the starter code for Node.js
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

let updateSaleForm = document.getElementById('update-sale-form');

// Modify the objects we need
updateSaleForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let sale_id = document.getElementById("update_sale_id").value;
    let item_id = document.getElementById("update_item_id").value;
    let quantity = document.getElementById("update_quantity").value;
    let total = document.getElementById("update_total").value;
    let employee_id = document.getElementById("update_employee_id").value;
    let customer_id  = document.getElementById("update_customer_id").value;
    let store_id = document.getElementById("update_store_id").value;

    if (sale_id === undefined || item_id === undefined || quantity === undefined || total === undefined 
        || employee_id ===  undefined || store_id === undefined) 
    {
        return;
    }
    let data = {
        sale_id: sale_id,
        item_id: item_id,
        quantity: quantity,
        total: total,
        employee_id: employee_id,
        customer_id: customer_id, 
        store_id: store_id
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-sale", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, sale_id);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, saleID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("sales-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == saleID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let item_td = updateRowIndex.getElementsByTagName("td")[1];
            let quantity_td = updateRowIndex.getElementsByTagName("td")[2];
            let total_td = updateRowIndex.getElementsByTagName("td")[3];
            let employee_td = updateRowIndex.getElementsByTagName("td")[4];
            let customer_td = updateRowIndex.getElementsByTagName("td")[5];
            let store_td = updateRowIndex.getElementsByTagName("td")[6];

            item_td = parsedData[0].item_id;
            quantity_td = parsedData[0].quantity;
            total_td = parsedData[0].total;
            employee_td = parsedData[0].employee_id;
            customer_td = parsedData[0].customer_id;
            store_td = parsedData[0].store_id;
       }
    }
}
