// All code was sourced from the starter code for Node.js
// https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%208%20-%20Dynamically%20Updating%20Data

let updateStoreForm = document.getElementById('update-store-form');

// Modify the objects we need
updateStoreForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let id = document.getElementById("update_store_id");
    let city = document.getElementById("update_city")
    let size = document.getElementById("update_size");




    let idValue = id.value;
    let cityValue = city.value;
    let sizeValue = size.value;


    if (idValue === undefined || cityValue === undefined || sizeValue === undefined) 
    {
        return;
    }
    let data = {
        id: idValue,
        city: cityValue,
        size: sizeValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-store", true);
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


function updateRow(data, storeID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("stores-table");

    console.log(parsedData);

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == storeID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let city_td = updateRowIndex.getElementsByTagName("td")[1];
            let size_td = updateRowIndex.getElementsByTagName("td")[2];
            city_td.innerHTML = parsedData[0].city;
            size_td.innerHTML = parsedData[0].store_size; 
       }
    }
}
