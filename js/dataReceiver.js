const dataBaseURL = 'http://localhost:8080';


async function getComponentsOfType(type){
  console.log(type);
  if(type === null){
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
  return await fetch(dataBaseURL + '/computers/hash/' + id, {
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
  return await fetch(dataBaseURL + '/computers/' + hashCode, {
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

async function getCreatorById(id){
  return await fetch(dataBaseURL + '/creators/' + id, {
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

export {getComponentsOfType, getComputerByHashCode, getComputerData, getComputerHashCode, getCreatorData, getCreatorById};
