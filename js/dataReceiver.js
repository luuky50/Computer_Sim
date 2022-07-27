const dataBaseURL = 'http://localhost:8080';


async function getComponentsOfType(type){
  console.log(type);
  if(type == null){
    type = "";
  }
  return await fetch(dataBaseURL + '/components/' + type, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    });
}


async function getComputerData(){
  return await fetch(dataBaseURL + '/computers/', {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log(error);
    });
}

async function refreshData(data){

}

export {getComponentsOfType};
export {getComputerData};
