const dataBaseURL = 'http://localhost:8080';


async function getComponentsOfType(type){
  console.log(type);
  if(type === null){
    type = "";
  }
  return await fetch(dataBaseURL + '/components/' + "?type=" + type, {
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
  return await fetch(dataBaseURL + '/computers', {
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

async function getComputerHashCode(id){
  return await fetch(dataBaseURL + '/computers/hash?id=' + id, {
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

async function getComputerByHashCode(hashCode){
  return await fetch(dataBaseURL + '/computers/' + "hashcode" + "?hashcode=" + hashCode, {
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

async function getCreatorData(){
  return await fetch(dataBaseURL + '/creators', {
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

export {getComponentsOfType, getComputerByHashCode, getComputerData, getComputerHashCode, getCreatorData};
