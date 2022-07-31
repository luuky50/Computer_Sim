import {getComponentsOfType, getComputerByHashCode} from "../js/dataReceiver.js";
import {createComputerBlueprint, addComponents} from "../js/computer_creating.js";
import {Component, Computer} from "../js/models/model.js"




let components_local = [];


window.onload = function(){
  if(location.href.includes('#')) {
    getCurrentComputer().then(() => console.log('Loading current computer'));
  }
}

async function getCurrentComputer(){
  console.log('Already created computer');
  switchPanel(false);
  let hash = location.hash;
  console.log(hash.replaceAll('#', ''));
  let currentComputer = await getComputerByHashCode(hash.replaceAll('#', ''))
  let computerModel = new Computer(currentComputer.id, currentComputer.name, currentComputer.components)
  createComputerBlueprint(computerModel).then(() => console.log(computerModel));
}

function addFunctionalityToSelectButtons() {
  let selects = document.querySelectorAll('select')

  selects.forEach(element => {
    populateSelectionList(element.name)
  })
}

function addFunctionalityToNewComponentButtons() {
  let selects = document.querySelectorAll('button[class="addComponent"]')
  selects.forEach(element => {
    element.onclick = function () {
      addNewComponent(element.id)
    };
  })
}

function addFunctionalityToCreateComputerButton(){
  let button = document.getElementById('createButton');
  button.onclick = async function () {
    let components = await getComponents();
    await addComponents(components, true);
    switchPanel(false)
  }
}

function addNewComponent(type) {
  let typeString = type.split(':')
  let options = document.getElementById(typeString[1])
  let component = document.createElement('select');
  options.append(component)
  populateSelectionList(typeString[1]).then(() => {
    console.log(typeString[1]);
  })
}

function switchPanel(onSelectingPage){
  let componentsMenu = document.getElementById("selectionComp");
  let computerMenu = document.getElementById("computer_build");
  componentsMenu.style.display = onSelectingPage ? "block" : "none";
  computerMenu.style.display = onSelectingPage ? "none" : "block";
}

async function populateSelectionList(type) {
  let data = await getComponentsOfType(type)
  let amountOfComponents = data.length;
  let optionList = document.getElementById(type)
  let lists = optionList.querySelectorAll('select')
  lists.forEach(element => {
    if(element.options.length < amountOfComponents) {
      for (let i = 0; i < amountOfComponents; i++) {
        let option = document.createElement('option');
        option.name = data[i].name;
        option.innerHTML = "<div>" + data[i].name + "</div>";
        components_local.push(new Component(data[i].id, data[i].type, data[i].name, data[i].price));
        element.append(option);
      }

    }
  })

}
if(document.URL.includes('computer_creating.html')){
  addFunctionalityToSelectButtons();
  addFunctionalityToNewComponentButtons();
  addFunctionalityToCreateComputerButton();
}


async function getComponents() {

  let componentList = document.querySelectorAll('select')
  let components = [];
  componentList.forEach(item => {
    if (item.options[item.selectedIndex] !== undefined){
      components[components.length] = (item.options[item.selectedIndex]);
  }})

  components.forEach(comp =>{
    components_local.forEach(loc => {
      if(loc.name === comp.name){
        comp.id = loc.id;
        comp.type = loc.type;
        comp.price = loc.price;
      }
    })
  })
  return components;
}


export {switchPanel}
