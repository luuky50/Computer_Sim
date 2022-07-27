import {getComputerData} from "../js/dataReceiver.js";
import {deleteComputer} from "../js/dataSender.js";
import {switchPage} from "../js/main.js";

function getDetails(data){

  let savePanel = document.getElementById("details_panel");
  let components = document.getElementById('components');
  let computerName = document.getElementById('computer_name');
  let editButton = document.getElementById('edit_computer')
  let deleteButton = document.getElementById('delete_computer');
  let totalPrice = 0;

  components.innerHTML = "";
  computerName.innerHTML = data.name;

  for (const comp of data.components) {
    let listItem = document.createElement('li');
    let itemHtml = "";
    itemHtml += "<div>" + "Name: " + comp.name + "</div>";
    itemHtml += "<div>" + "Type: " +comp.type + "</div>";
    itemHtml += "<div>" + "Price: " +comp.price + "</div>";
    listItem.innerHTML = itemHtml;
    totalPrice += comp.price;
    components.append(listItem);
  }

  addFunctionalityToEditButton(editButton, data)
  addFunctionalityToDeleteButton(deleteButton, data.id)

  savePanel.append(computerName)
  savePanel.style.display = "block";
}

function addFunctionalityToEditButton(editButton, data){
  console.log(editButton);
  editButton.addEventListener('click', function () {
    switchPage('computer_creating.html?name=' + data.name + "?components=" + JSON.stringify(data.components))}, false);
}

function addFunctionalityToDeleteButton(deleteButton, computerID){
  deleteButton.addEventListener('click', function (){deleteComputer(computerID)}, false);
}

function addFunctionalityToDetailsButton(item, data){
  //Should get the index from item
  item.children.item(2).addEventListener('click', function(){getDetails(data)}, false);
}

function addFunctionalityToCloseComputerPanelButton(){
  let closeButton = document.getElementById('close_panel')
  closeButton.onclick = function (){
    let savePanel = document.getElementById("details_panel");
    savePanel.style.display = "none";
  }
}

addFunctionalityToCloseComputerPanelButton()

async function showContentItems() {
  let data = await getComputerData();

  let list = document.getElementById('computers');
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html = "";

    let item = document.createElement('li');
    html += "<div class='computerName'>" + data[i].name + "</div>";
    html += "<div class='invisible_Comp'>" + data[i].components + "</div>";
    html += "<button type=\"button\" class=\"detailsComputer\"> Details</button>";

    item.innerHTML = html;

    await list.append(item);
    addFunctionalityToDetailsButton(item, data[i])
  }
}

showContentItems();

