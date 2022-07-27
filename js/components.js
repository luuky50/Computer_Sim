import {getComponentsOfType} from "../js/dataReceiver.js";


async function getComponentType(){
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('component');
}




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
    html += "<button type=\"button\" class=\"itemButton\" onclick='console.log(getComponentType())'> Details</button>";


    item.innerHTML = html;


    list.appendChild(item);
  }
}

showContentItems().then(() => console.log('Getting items'));
