let express = require('express');

let app = express();

let propertiesRoute = require('./routes/properties');

app.use(propertiesRoute);

//Handler for 404 - Resource Not Found
app.use((request, response, next) => {
  response.status(404).send({
    "name": "Not Found",
    "message": `Property ${request.params.name} not found`,
    "status": 404
  })
});

//Handler for 500 - Resource Not Found
app.use((error, request, response, next) => {
  console.error(error.stack);

  response.status(500).send({
    "name": "Internal Server Error",
    "message": "Something wrong",
    "status": 500,
    "stackTrace": error.stack
  });
});


const PORT = process.env.API_PORT || 3779;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));