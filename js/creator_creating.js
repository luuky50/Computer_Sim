import {postNewUser, putUserById, deleteUserById, deleteComputer} from "../js/dataSender.js";
import {getComputerData, getCreatorData} from "../js/dataReceiver.js"
import {User} from "./models/model.js";
import {switchPage} from "./main.js";

let allData = [];
let current_data = [];


function openUserPanel(isEditing, data) {
  let userPanel = document.getElementById('save_panel');
  let headerText = document.getElementById('user_header');
  let saveButton = document.getElementById('save_button');
  let editButton = document.getElementById('edit_button');
  let deleteButton = document.getElementById('delete_button');
  let errorName = document.getElementById('error_name');
  let errorDescription = document.getElementById('error_description');

  let userName = document.getElementById('user_name');
  let userDescription = document.getElementById('user_description');
  let userComputer = document.getElementById('user_computers');

  editButton.style.display = 'none'
  deleteButton.style.display = 'none'
  errorName.style.display = 'none'
  errorDescription.style.display = 'none';
  saveButton.style.display = 'block';
  userName.placeholder = 'Enter name..'
  userDescription.placeholder = 'Enter description..'


  if (isEditing) {
    headerText.innerText = 'Editing user'

    editButton.addEventListener('click', function () {
      saveUser(data.id);
    })
    deleteButton.addEventListener('click', async function () {
      for (let item of await getComputerData())
        if(item.madeBy.id ===  data.id){
          await deleteComputer(item.id);
        }
      deleteUser(data.id);
    })

    userName.placeholder = data.name;
    userDescription.innerText = data.description.toString();
    saveButton.style.display = 'none';
    editButton.style.display = 'block';
    deleteButton.style.display = 'block';

  }

  userPanel.style.display = 'block';
}

function saveUser(id) {
  let errorName = document.getElementById('error_name');
  let errorDescription = document.getElementById('error_description');
  let formElement = document.forms.save_panel;
  let formData = new FormData(formElement);
  let name = formData.get('user_name');
  let description = formData.get('user_description')
  console.log(current_data);
  for (let item of allData) {
    if (item.name === name) {
      errorName.innerHTML = 'Name already exists';
      errorName.style.display = 'block';
      return;
    }
  }
  if (name === "" && current_data.name === undefined) {
    errorName.innerHTML = 'Must give computer a name';
    errorName.style.display = 'block';
    return;
  } else if (current_data.name !== "" && name === "") {
    name = current_data.name;

  }
  if (description.length > 1000) {
    errorDescription.style.display = 'block';
    return;
  }

  let user = null
  if (id !== undefined) {
    console.log('putting');
    user = new User(id, name, description, null);
    putUserById(id, user);
  } else {
    console.log('posting');
    user = new User(null, name, description, null);
    postNewUser(user);
  }
  console.log(user);
  current_data = [];
}


function deleteUser(id) {
  deleteUserById(id);
  current_data = [];
}

function getDetails(data) {
  current_data = data;
  openUserPanel(true, data);
}


function addFunctionalityToSaveUserButton() {
  let saveComponentButton = document.getElementById('save_button');
  saveComponentButton.addEventListener('click', function () {
    saveUser();
  })
}

function addFunctionalityToAddUserButton() {
  let addComponentButton = document.getElementById('add_user');
  addComponentButton.addEventListener('click', function () {
    openUserPanel(false);
  })
}

function addFunctionalityToCloseSavePanelButton() {
  let closeButton = document.getElementById('close_panel')
  closeButton.onclick = function () {
    let savePanel = document.getElementById("save_panel");
    savePanel.style.display = "none";
  }
}

function addFunctionalityToDetailsButton(item, data) {
  //TODO:Should get the index from item
  item.children.item(2).addEventListener('click', function () {
    getDetails(data)
  }, false);
}

addFunctionalityToCloseSavePanelButton();
addFunctionalityToAddUserButton();
addFunctionalityToSaveUserButton();

async function showContentItems() {
  let data = await getCreatorData();
  let computers = await getComputerData();
  allData = data;
  console.log(data);
  let list = document.getElementById('users');
  let html = "";
  let counter = 0;
  for (let computer of computers) {
    for (let i = 0; i < data.length; i++) {
      if (computer.madeBy.id === data[i].id) {
        counter++;
      }
    }
  }
  for (let i = 0; i < data.length; i++) {
    html = "";
    let item = document.createElement('li');
    html += "<div>" + data[i].name + "</div>";
    html += "<div>" + "Total computers: " + counter + "</div>";
    html += "<button type=\"button\" class=\"detailsComputer\"> Details</button>";
    item.innerHTML = html;
    await list.appendChild(item);
    addFunctionalityToDetailsButton(item, data[i]);
  }


}

showContentItems().then(() => console.log('Getting items'));
