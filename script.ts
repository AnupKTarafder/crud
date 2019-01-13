
var studentArr: never[] | { name: string; roll: number; age: number; phone: number; cgpa: number; }[] = [];
var selectedIndex = -1;

var edited = 0;

function init() {
    document.getElementById("tablerows").innerHTML = "";
    if (localStorage.studentsRecord) {
        studentArr = JSON.parse(localStorage.studentsRecord);
        for (var i = 0; i < studentArr.length; i++) {
            prepareTableCell(i, studentArr[i].name, studentArr[i].roll, studentArr[i].cgpa);
        }
    }
}



function create() {
    document.getElementById("inp").style.display = "block";
    if (edited){
        document.getElementById("adduser").innerHTML = "Save";
        selectedIndex++;
    }
        
}
function cancel() {
    document.getElementById("inp").style.display = "none";
    clear();
}


function adduser() {
    var name = document.getElementById('name').value;
    var roll = document.getElementById('roll').value;
    var age = document.getElementById('age').value;
    var phone = document.getElementById('phone').value;
    var cgpa = document.getElementById('cgpa').value;
    var StuObj = {name: name, roll: roll, age: age, phone: phone, cgpa: cgpa};
    console.log(StuObj);
    if (selectedIndex === -1){
        studentArr.push(StuObj);
    }
    else{
        studentArr.splice(selectedIndex, 1, StuObj);
    }

    localStorage.studentsRecord = JSON.stringify(studentArr);
    init();
    cancel();
}

function prepareTableCell(index: number, name: string, roll:number, cgpa:number) {
    var table = document.getElementById("tablerows");
    var row = table.insertRow();
    var nameCell = row.insertCell(0);
    var rollCell = row.insertCell(1);
    var cgpaCell = row.insertCell(2);
    var actionCell = row.insertCell(3);

    nameCell.innerHTML = name;
    rollCell.innerHTML = roll;
    cgpaCell.innerHTML = cgpa;
    actionCell.innerHTML = '<button class="btn btn-primary" style="width: 50%" onclick="edit(' + index + ')">Edit</button><button  class="btn btn-primary" style="width: 50%"  onclick="deletion(' + index + ')">Delete</button>';
}

function edit(index) {
    selectedIndex = index;
    var stuObj = studentArr[index];
    if (edited){
        selectedIndex--;
    }
    create();
    document.getElementById("name").value = stuObj.name;
    document.getElementById("roll").value = stuObj.roll;
    document.getElementById("age").value = stuObj.age;
    document.getElementById("phone").value = stuObj.phone;
    document.getElementById("cgpa").value = stuObj.cgpa;
    document.getElementById("adduser").innerHTML = "Update";
    edited++;

}

function deletion(index) {
    /*
     var table = document.getElementById("regtable");
     table.deleteRow(index+1);
     */
    studentArr.splice(index, 1);
    localStorage.studentsRecord = JSON.stringify(studentArr);
    init();
}

function clear(){
    document.getElementById("name").value = null;
    document.getElementById("roll").value = null;
    document.getElementById("age").value = null;
    document.getElementById("phone").value = null;
    document.getElementById("cgpa").value = null;
}

function sortATable(k) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("regtable");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[k];
          y = rows[i + 1].getElementsByTagName("TD")[k];
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
          }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
  
  function sortDTable(k) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("regtable");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[k];
          y = rows[i + 1].getElementsByTagName("TD")[k];
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
          }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }