import {postNewUser, putUserById, deleteUserById} from "../js/dataSender.js";
import {User} from "./models/model.js";
import {switchPage} from "./main.js";

let current_data = [];


function openUserPanel(isEditing, data) {
  let userPanel = document.getElementById('save_panel');
  let componentTypeText = document.getElementById('component_type');
  let headerText = document.getElementById('component_header');
  let saveButton = document.getElementById('save_button');
  let editButton = document.getElementById('edit_button');
  let deleteButton = document.getElementById('delete_button');
  let errorName = document.getElementById('error_name');
  let errorPrice = document.getElementById('error_price');

  let componentTypeList = dropDown.getElementsByTagName('option');
  let componentName = document.getElementById('component_name');
  let componentPrice= document.getElementById('component_price');

  editButton.style.display = 'none'
  deleteButton.style.display = 'none'
  errorName.style.display = 'none'
  errorPrice.style.display = 'none'
  saveButton.style.display = 'block';
  componentName.placeholder = 'Enter name..'
  componentPrice.placeholder = 'Enter price..'
  componentTypeText.innerHTML = '';
  headerText.innerText = 'Adding new component';

  for (const componentType of componentTypes) {
    let optionElement = document.createElement('option');
    optionElement.innerHTML = "<div>" + componentType.innerHTML + "</div>";
    dropDown.append(optionElement);
  }
  componentTypeText.append(dropDown);

  if(isEditing){
    headerText.innerText = 'Editing component'

    editButton.addEventListener('click',function() {
      saveComponent(data.id);
    })
    deleteButton.addEventListener('click', function (){
      deleteComponent(data.id);
    })

    saveButton.style.display = 'none';
    editButton.style.display = 'block';
    deleteButton.style.display = 'block';
    componentName.placeholder = data.name;
    for (const item of componentTypeList){
      if(item.innerText === data.type){
        dropDown.selectedIndex = item.index;
      }
    }
    componentPrice.placeholder = data.price;
  }

  componentPanel.style.display = 'block';
}

function saveComponent(id){
  let errorName = document.getElementById('error_name');
  let errorPrice = document.getElementById('error_price');
  let formElement = document.forms.save_panel;
  let formData = new FormData(formElement);
  let name = formData.get('component_name');
  let type = null;
  let componentTypes = formElement.querySelectorAll('select')
  componentTypes.forEach(item => {
    type = item.options[item.selectedIndex];
  })
  let price = formData.get('component_price')
  console.log(current_data);
  if(name === "" && current_data.name === undefined){
    errorName.style.display = 'block';
    return;
  }else if(current_data.name !== "" && name === ""){
    name = current_data.name;
  }
  if(price.match("[a-zA-Z]+")){
    errorPrice.innerText = 'Price only accepts numbers';
    errorPrice.style.display = 'block';
    return;
  }
  if(price === "" && current_data.price === undefined){
    errorPrice.innerText = 'Price must be filled in';
    errorPrice.style.display = 'block';
    return;
  }else if(current_data.price !== "" && price === ""){
    price = current_data.price;
  }

  let component = null
  if(id !== undefined){
    console.log('putting');
    component = new Component(id, type.innerText, name, price);
    putUserById(id, component).then(switchPage('components.html'));
  }else {
    console.log('posting');
    component = new User(null, type.innerText, name, price);
    postNewUser(component).then(switchPage('components.html'));
  }
  console.log(component);
  current_data = [];
}


function deleteUser(id){
  deleteUserById(id).then(switchPage('components.html'));
  current_data = [];
}

function getDetails(data){
  current_data = data;
  openComponentPanel(true, data);
}


function addFunctionalityToSaveUserButton() {
  let saveComponentButton = document.getElementById('save_button');
  saveComponentButton.addEventListener('click', function (){
    saveComponent();
  })
}

function addFunctionalityToAddUserButton(){
  let addComponentButton = document.getElementById('add_component');
  addComponentButton.addEventListener('click',function () {
    openComponentPanel(false);
  })
}

function addFunctionalityToCloseSavePanelButton(){
  let closeButton = document.getElementById('close_panel')
  closeButton.onclick = function (){
    let savePanel = document.getElementById("save_panel");
    savePanel.style.display = "none";
  }
}

function addFunctionalityToDetailsButton(item, data){
  //TODO:Should get the index from item
  item.children.item(2).addEventListener('click', function(){getDetails(data)}, false);
}

addFunctionalityToCloseSavePanelButton();
addFunctionalityToAddComponentButton();
addFunctionalityToSaveComponentButton();

async function showContentItems() {
  let data = await getComponentsOfType(await getComponentType());
  console.log(data);
  let list = document.getElementById('items');
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html = "";
    let item = document.createElement('li');
    html += "<div>" + data[i].name + "</div>";
    html += "<div class='prices'>"+"€" + data[i].price + "</div>";
    html += "<button type=\"button\" class=\"itemButton\"> Details</button>";
    item.innerHTML = html;
    await list.appendChild(item);
    addFunctionalityToDetailsButton(item, data[i]);
  }

}

showContentItems().then(() => console.log('Getting items'));
