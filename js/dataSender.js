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
  const response = await fetch(dataBaseURL + '/computers/' + + computerID, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updateComputer)
  });

  return await response.json();
}


export {postNewComputer};
export {deleteComputer};
export {editComputer};


