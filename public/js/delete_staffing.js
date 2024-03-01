function deleteStaffing(param) {


    let data = {
          employee_id: param.toString()[0],
          store_id: param.toString()[1]
          
      };
  
  
       $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteStaffingRow(param);
      }
    });
  }
  
  
  function deleteStaffingRow(rowID){
  
      let table = document.getElementById("staffing-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == rowID) {
              table.deleteRow(i);
              break;
         }
      }
  }
  