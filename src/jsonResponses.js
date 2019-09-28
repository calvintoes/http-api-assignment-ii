// Note this object is purely in memory
const users = {};

// THe actual data that will be sent
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// THe 'type' of information that will be sent back
const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-type': 'text/html',
  };

  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  return respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const addUsers = (request, response, body) => {
  const responseJSON = {
    message: 'Name and Age are both required',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return (respondJSON(request, response, 400, responseJSON));
  }

  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  } if (responseCode === 204) {
    return respondJSON(request, response, responseCode, responseJSON);
  }
  return false;
};

const notReal = (request, response) => {
  const responseJSON = {
    message: 'Page you are looking for is not found',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const notRealMeta = (request, response) => respondJSONMeta(request, response, 404);

const notFound = (request, response) => {
  const responseJSON = {
    message: 'Page you are looking for is not found',
    id: 'notFound',
  };

  return respondJSON(request, response, 400, responseJSON);
};

const notFoundMeta = (request, response) => respondJSONMeta(request, response, 404);

module.exports = {
  addUsers,
  getUsers,
  getUsersMeta,
  notReal,
  notRealMeta,
  notFound,
  notFoundMeta,
};
