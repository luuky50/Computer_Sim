import {getComponentsOfType} from "../js/dataReceiver.js";
import {postNewComponent, putComponentById} from "../js/dataSender.js";
import {Component} from "./models/model.js";


async function getComponentType(){
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('component');
}


function openComponentPanel(isEditing, data) {
  let componentPanel = document.getElementById('save_panel');
  let componentTypeText = document.getElementById('component_type');
  let headerText = document.getElementById('component_header')
  let componentTypes = document.getElementById('componentTypes').children;
  let dropDown = document.createElement('select');
  let editButton = document.getElementById('edit_button')
  let deleteButton = document.getElementById('delete_button')

  let componentTypeList = dropDown.getElementsByTagName('option');
  let componentName = document.getElementById('component_name')
  let componentPrice= document.getElementById('component_price')

  editButton.style.display = 'none'
  deleteButton.style.display = 'none'
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

    editButton.style.display = 'block'
    deleteButton.style.display = 'block'
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
  let formElement = document.forms.save_panel;
  let formData = new FormData(formElement);
  let name = formData.get('component_name');
  let type = null;
  let componentTypes = formElement.querySelectorAll('select')
  componentTypes.forEach(item => {
    type = item.options[item.selectedIndex];
  })
  let price = formData.get('component_price')
  let component = null
  if(id !== undefined){
    console.log('putting');
    component = new Component(id, type.innerText, name, price);
    putComponentById(id, component);
  }else {
    console.log('posting');
    component = new Component(null, type.innerText, name, price);
    postNewComponent(component).then();
  }
  console.log(component);
}


function deleteComponent(){

}

function getDetails(data){
  console.log(data);
  openComponentPanel(true, data);
}


function addFunctionalityToSaveComponentButton() {
  let saveComponentButton = document.getElementById('save_button');
  saveComponentButton.addEventListener('click', function (){
    saveComponent();
  })
}

function addFunctionalityToAddComponentButton(){
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
