import {getComponentsOfType} from "../js/dataReceiver.js";
import {createNewComputerBlueprint} from "../js/computer_creating.js";

let components_local = [];

window.onload = function(){
  if(location.href.includes('?')){
    console.log('Already created computer');
    switchPanel(false);
    let url = location.href.split('?');
    console.log(url);
    let currentData = [];
    currentData.name = url[1].split('=')[1];
    url[2] = url[2].replaceAll('%22', '');
    let componentAmount = url[2].split('},{')

    for (let i = 0; i < componentAmount.length; i++) {
      currentData.components = [];
      let component = componentAmount[i].split(',');

      let newComponent = new Component(component[0].split(':')[1], component[1].split(':')[1], component[2].split(':')[1], component[3].split(':')[1])
      components_local.push(newComponent);
    }
    console.log(JSON.stringify(components_local));
    createNewComputerBlueprint(components_local);
  }
}

function Component(id, type, name, price){
  this.id = id;
  this.name = name;
  this.type = type;
  this.price = price;
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
    await createNewComputerBlueprint(components);
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


async function populateSelectionList(type) {
  let data = await getComponentsOfType(type)
  let amountOfComponents = data.length;
  let optionList = document.getElementById(type)
  let lists = optionList.querySelectorAll('select')
  lists.forEach(element => {
    if(element.options.length < amountOfComponents) {
      for (let i = 0; i < amountOfComponents; i++) {
        let option = document.createElement('option');
        option.className = data[i].name;
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

function switchPanel(onSelectingPage){
  let componentsMenu = document.getElementById("selectionComp");
  let computerMenu = document.getElementById("computer_build");
  componentsMenu.style.display += onSelectingPage ? "block" : "none";
  computerMenu.style.display += onSelectingPage ? "none" : "block";
  return onSelectingPage;
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
      if(loc.name === comp.className){
        comp.id = loc.id;
        comp.type = loc.type;
        comp.price = loc.price;
      }
    })
  })
  return components;
}

export {Component}
export {switchPanel}
