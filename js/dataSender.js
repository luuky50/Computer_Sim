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

async function deleteComponentById(componentID){
  const response = await fetch(dataBaseURL + '/components/' + componentID, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return response.status.toString();
}

async function postNewUser(newUser){
  const response = await fetch(dataBaseURL + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
  });

  return await response.json();
}

async function putUserById(id, user){
  const response = await fetch(dataBaseURL + '/users/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  return await response.json();
}

async function deleteUserById(userId){
  const response = await fetch(dataBaseURL + '/users/' + userId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return response.status.toString();
}

export {postNewComputer, deleteComputer, editComputer, postNewComponent, putComponentById, deleteComponentById, postNewUser, putUserById, deleteUserById};
