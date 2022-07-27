import {addDraggableEvents} from "../js/dragController.js";
import {postNewComputer} from '../js/dataSender.js';
import {Component} from "../js/component_selecting.js";

let selected_components = [];
let grabbed_components = [];
let currentData = [];



async function createNewComputerBlueprint(components){
  console.log(JSON.stringify(components));
  let bluePrint = document.getElementById('computer_list');
  for (let i = 0; i < components.length; i++) {
    let item = document.createElement('li')
    grabbed_components.push(new Component(components[i].id, components[i].type, components[i].name, components[i].price));
    if(components[i].name === undefined) {
      item.innerHTML = components[i].className;
    }
    else if(components[i].className === undefined){
      item.innerHTML = components[i].name;
    }
    item.className = 'draggable';
    item.draggable = true;
    bluePrint.append(item);
  }
  console.log(grabbed_components);
  await addDraggableEvents();
  return bluePrint;
}

function addFunctionalityToCompleteButton(){
  let completeButton = document.getElementById('done_button');
  completeButton.onclick = function (){
    completeNewComputer();
  }
}

function addFunctionalityToSaveButton(){
  console.log('Running');
  let saveButton = document.getElementById('save_button');
  saveButton.onclick = function (){
    saveComputer();
  }
}

function addFunctionalityToCloseSavePanelButton(){
  let closeButton = document.getElementById('close_panel')
  closeButton.onclick = function (){
    let savePanel = document.getElementById("save_panel");
    savePanel.style.display = "none";
    currentData = null;
    resetItems();
  }
}

if(document.URL.includes('computer_creating.html')) {
  addFunctionalityToCloseSavePanelButton();
  addFunctionalityToSaveButton();
  addFunctionalityToCompleteButton();
}

function completeNewComputer(){

  let newComputerData = {
    components : selected_components
  };
  console.log(JSON.stringify(newComputerData));
  openSavePanel(newComputerData);
}

function saveComputer(){
  if(currentData !== null){
    let formElement = document.forms.save_panel;
    let formData = new FormData(formElement);
    currentData.name = formData.get('computer_name');
    console.log(currentData.name);
    postNewComputer(currentData).then(() => window.location.href = 'computers.html');
    currentData = null;
  }
  else{
    throw new Error('Current data is null, cannot post new computer!');
  }
}


function openSavePanel(data){
  let savePanel = document.getElementById("save_panel");
  let componentsDoneList = document.getElementById("done_items");
  componentsDoneList.innerHTML = '';
  savePanel.style.display = "block";

  if(data.components.length === 0){
    console.log('No components added')
    return;
  }
  currentData = data;

  data.components.forEach(item =>{
    let comp = document.createElement('li')
    comp.innerHTML = item.name;
    componentsDoneList.append(comp);
  })
}



function addItemToList(draggedItem){
  if(!draggedItem.isInPC) {
    let limit = 1;

    console.log(draggedItem.innerHTML);
    grabbed_components.forEach(grabItem => {
      console.log(limit);
      if (grabItem.name === draggedItem.innerHTML && limit > 0) {
        selected_components.push(grabItem);
        limit--;
      }
    })
    draggedItem.isInPC = true;
  }

}

function removeItemFromList(draggedItem){
  if(draggedItem.isInPC) {
    let limit = 1;
    console.log(draggedItem + "is removed");
    for (const item of selected_components) {
      if (item.name === draggedItem.innerHTML && limit > 0) {
        let index = selected_components.indexOf(item);
        selected_components.splice(index, 1);
        limit--;
      }
    }
    draggedItem.isInPC = false;
  }
}



function resetItems(){
  selected_components = [];
  let computer = document.getElementById('computer_case')
  let componentsInComputer = computer.querySelectorAll('li[draggable=true]')
  let bluePrint = document.getElementById('computer_list');
  componentsInComputer.forEach(element =>{
    element.isInPC = false;
    bluePrint.appendChild(element);
  })
}

export {createNewComputerBlueprint}
export {addItemToList}
export {removeItemFromList}
