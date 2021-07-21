const express = require('express');
const path = require('path');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.static(path.join(__dirname, 'build')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', require(path.join(__dirname, 'api')));

app.listen(3000, () => {});