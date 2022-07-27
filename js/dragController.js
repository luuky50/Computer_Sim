import {addItemToList} from "../js/computer_creating.js";
import {removeItemFromList} from "../js/computer_creating.js";

let dropZones = document.querySelectorAll('.dropzone');

dropZones.forEach(element => {
  element.addEventListener('dragover', ev => {
    ev.preventDefault();
  })
})

dropZones.forEach(element =>{
  element.addEventListener('drop', ev =>{
    const dragItem = document.querySelector('.dragging');
    if(dragItem == null){
      throw new Error("Dragged item is null");
    }

    element.appendChild(dragItem)

    if(element.id === 'computer_text')
      addItemToList(dragItem);
    else if(element.id === 'computer_list')
      removeItemFromList(dragItem);

  })
})

async function addDraggableEvents(){
  let dragables = document.querySelectorAll('.draggable');
  dragables.forEach(element =>{
    element.addEventListener('dragstart',() => {
      element.classList.add('dragging')
    })

    console.log("Setting listeners");


    element.addEventListener('dragend', () => {
      element.classList.remove('dragging')
    })
  });
}

function reset(droppedItems){

}

export {addDraggableEvents}
