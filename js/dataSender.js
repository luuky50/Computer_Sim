const dataBaseURL = 'http://localhost:8080';


async function postNewComputer(newComputer){

  const response = await fetch(dataBaseURL + '/computers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newComputer)
  });

  return await response.json();
}


async function deleteComputer(computerID){
  const response = await fetch(dataBaseURL + '/computers/' + computerID, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return response.status.toString();
}

async function editComputer(computerID, updateComputer){
  const response = await fetch(dataBaseURL + '/computers/' + computerID, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateComputer)
  });

  return await response.json();
}

async function postNewComponent(newComponent){
  const response = await fetch(dataBaseURL + '/components', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newComponent)
  });

  return await response.json();
}

async function putComponentById(id, component){
  const response = await fetch(dataBaseURL + '/components/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(component)
  });

  return await response.json();
}

export {postNewComputer, deleteComputer, editComputer, postNewComponent, putComponentById};
