// All code was sourced from the starter code for Node.js
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

let updateItemForm = document.getElementById('update-item-form');

// Modify the objects we need
updateItemForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let id = document.getElementById("update_item_id");
    let category = document.getElementById("update_item_category")
    let brand = document.getElementById("update_item_brand");
    let price = document.getElementById("update_item_price");



    let idValue = id.value;
    let categoryValue = category.value;
    let brandValue = brand.value;
    let priceValue = parseInt(price.value);


    if (idValue === undefined || categoryValue === undefined || brandValue === undefined || priceValue === undefined) 
    {
        return;
    }
    let data = {
        item_id: idValue,
        category: categoryValue,
        brand: brandValue,
        price: priceValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-item", true);
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


function updateRow(data, itemID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("items-table");

    console.log(parsedData);

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == itemID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let category_td = updateRowIndex.getElementsByTagName("td")[1];
            let brand_td = updateRowIndex.getElementsByTagName("td")[2];
            let price_td = updateRowIndex.getElementsByTagName("td")[3];

            category_td.innerHTML = parsedData[0].category;
            brand_td.innerHTML = parsedData[0].brand;
            price_td.innerHTML = parsedData[0].price; 
       }
    }
}
