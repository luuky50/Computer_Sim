import {addDraggableEvents} from "../js/dragController.js";
import {editComputer, postNewComputer} from '../js/dataSender.js';
import {Component, Computer} from "../js/models/model.js"
import {switchPanel} from "../js/component_selecting.js"
import {switchPage} from "../js/main.js";

let componentsOutOfComputer = [];
let current_computer = [];


async function createComputerBlueprint(computer) {
  current_computer = computer;
  await addComponents(computer.components, false);
}

async function addComponents(components, newComputer) {
  let grabbed_components = [];
  let bluePrint = document.getElementById('computer_list');
  let computerArea = document.getElementById('computer_text')
  for (let i = 0; i < components.length; i++) {
    let item = document.createElement('li')
    item.innerHTML = components[i].name;
    item.className = 'draggable';
    item.draggable = true;
    if (newComputer) {
      console.log('adding components');
      componentsOutOfComputer.push(new Component(parseInt(components[i].id), components[i].type, components[i].name, components[i].price));
      bluePrint.append(item);
    } else {
      item.isInPC = true;
      computerArea.append(item);
    }
  }
  if (current_computer.length === 0) {
    current_computer = new Computer(null, "", [])
    console.log(current_computer);
  }
  await addDraggableEvents();
}

function addFunctionalityToCompleteButton() {
  let completeButton = document.getElementById('done_button');
  completeButton.onclick = function () {
    completeNewComputer();
  }
}

function addFunctionalityToSaveButton(isNewComputer) {
  let saveButton = document.getElementById('save_button');
  saveButton.onclick = function () {
    saveComputer(isNewComputer);
  }
}

function addFunctionalityToBackButton() {
  let backButton = document.getElementById('back_button');
  backButton.onclick = function () {
    switchPanel(true);
  }
}

function addFunctionalityToCloseSavePanelButton() {
  let closeButton = document.getElementById('close_panel')
  closeButton.onclick = function () {
    let savePanel = document.getElementById("save_panel");
    savePanel.style.display = "none";
  }
}

if (document.URL.includes('computer_creating.html')) {
  addFunctionalityToCloseSavePanelButton();
  if (location.href.includes('?')) {
    addFunctionalityToSaveButton(false);
  } else {
    addFunctionalityToSaveButton(true);
  }
  addFunctionalityToCompleteButton();
  addFunctionalityToBackButton();
}

function completeNewComputer() {

  console.log(JSON.stringify(current_computer));
  openSavePanel(current_computer);
}

function saveComputer(isNewComputer) {
  if (current_computer !== null) {
    let formElement = document.forms.save_panel;
    let formData = new FormData(formElement);
    let newName = formData.get('computer_name');
    console.log(newName);
    console.log(current_computer.name)
    if (newName === "" || newName === null && current_computer.name === null) {
      let errorMsg = document.getElementById('error_name');
      errorMsg.style.display = 'block';
      return;
    } else {
      current_computer.name = newName;
    }
    console.log(current_computer.name);
    if (isNewComputer) {
      postNewComputer(current_computer).then(switchPage('computers.html'));
      current_computer = [];
    } else {
      console.log(JSON.stringify(current_computer));
      editComputer(current_computer.id, current_computer).then(switchPage('computers.html'));
      current_computer = [];
    }
  } else {
    throw new Error('Current data is null, cannot post new computer!');
  }
}


function openSavePanel(data) {
  let savePanel = document.getElementById("save_panel");
  let componentsDoneList = document.getElementById("done_items");
  let saveButton = document.getElementById('save_button');
  let computerName = document.getElementById('computer_name');
  let errorMsg = document.getElementById('error_name');
  errorMsg.style.display = 'none';
  if (data.name !== undefined) {
    computerName.placeholder = data.name;
  }
  componentsDoneList.innerHTML = '';
  savePanel.style.display = "block";

  if (data.components === undefined || data.components.length === 0) {
    console.log('No components added')
    componentsDoneList.append(document.createElement('div').innerHTML = 'No components added');
    saveButton.style.display = "none";
    return;
  }
  saveButton.style.display = "block";

  data.components.forEach(item => {
    let comp = document.createElement('li')
    if (item.name === undefined) {
      comp.innerHTML = item.className;
    } else {
      comp.innerHTML = item.name;
    }
    componentsDoneList.append(comp);
  })
}


function addItemToComponentList(draggedItem) {
  if (!draggedItem.isInPC) {
    let limit = 1;

    console.log(draggedItem.innerHTML + " is added");
    console.log(componentsOutOfComputer);
    console.log(current_computer.components);
    //console.log(current_computer.components);
    for (const item of componentsOutOfComputer) {
      console.log(item.name);
      console.log(draggedItem.innerHTML);
      if (item.name === draggedItem.innerHTML && limit > 0) {
        if (current_computer.components === undefined) {
          current_computer.components = [];
        }
        let index = componentsOutOfComputer.indexOf(item);
        current_computer.components.push(item);
        componentsOutOfComputer.splice(index, 1);
        limit--;
      }
    }

  }
  draggedItem.isInPC = true;
}

function removeItemFromComponentList(draggedItem) {
  if (draggedItem.isInPC) {
    let limit = 1;
    console.log(draggedItem.innerHTML + " is removed");
    for (const item of current_computer.components) {
      if (item.name === draggedItem.innerHTML && limit > 0) {
        let index = current_computer.components.indexOf(item);
        current_computer.components.splice(index, 1);
        componentsOutOfComputer.push(item);
        limit--;
      }
    }
    draggedItem.isInPC = false;
  }
}


export {createComputerBlueprint, addComponents, addItemToComponentList, removeItemFromComponentList}
