const users = {};

const respondJSON = (resuest, response, status, object) => {
  // Set status code and type
  response.writeHead(status, { 'Content-Type': 'application/json' });
  // Stringify and write response obj
  response.write(JSON.stringify(object));
  // End response
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getUsers = (request, response, requestMethod) => {
  const responseJSON = {};

  if (requestMethod === 'GET') responseJSON.users = users;

  respondJSON(request, response, 200, responseJSON);
};

const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
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
  }
  return respondJSONMeta(request, response, responseCode);
};

const notReal = (request, response) => {
  const responseJSON = {
    message: 'Error: Not Real',
  };

  respondJSON(request, response, 404, responseJSON);
};

const notRealMeta = (request, response) => respondJSONMeta(request, response, 404);

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notReal,
  notRealMeta,
  notFound,
};
