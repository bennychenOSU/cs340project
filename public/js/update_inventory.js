// All code was sourced from the starter code for Node.js
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

let updateInventoryForm = document.getElementById('update-inventory-form');

updateInventoryForm.addEventListener("submit", function (e) {

    e.preventDefault();

    let id = document.getElementById("update-item-id");
    let store = document.getElementById("update-store-id");
    let quantity = document.getElementById("update-quantity")

    let idValue = id.value;
    let storeIDValue = store.value;
    let quantityValue = parseInt(quantity.value);
    
    if (idValue === undefined || storeIDValue === undefined || quantityValue === undefined || priceValue === undefined) 
    {
        return;
    }
    let data = {
       item_id: idValue,
       store: storeIDValue,
       quantity: quantityValue
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-inventory", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            updateRow(xhttp.response, item_id);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, itemID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("inventory-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
      
       if (table.rows[i].getAttribute("data-value") == itemID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let store_td = updateRowIndex.getElementsByTagName("td")[1];
            let quantity_td = updateRowIndex.getElementsByTagName("td")[2];

            store_td.innerHTML = parsedData[0].store; 
            quantity_td.innerHTML = parsedData[0].quantity; 
       }
    }
}
