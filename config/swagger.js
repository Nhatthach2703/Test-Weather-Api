const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

// Load YAML file
const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'));

// Optional: Nếu muốn vẫn sử dụng JSDoc comments từ routes
// thì có thể combine với YAML file
const options = {
  definition: swaggerDocument,
  apis: [], // Không cần scan routes nữa vì đã define trong YAML
};

// Hoặc sử dụng trực tiếp YAML document
const specs = swaggerDocument;

module.exports = {
  swaggerUi,
  specs
};
