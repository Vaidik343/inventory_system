const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 7005;
const connectDB = require("./config/db")
const app = express();
const fs = require('fs')
const path = require('path')
const cookieParser = require("cookie-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
app.use(express.json())
app.use(cors())
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send("inventory system api")
})


const routesPath = path.join(__dirname, 'routes');

fs.readdirSync(routesPath).forEach( (file) => {
    if(file.endsWith('Routes.js')) {

        const route = require(path.join(routesPath, file));

        //Validate that the file exports a router
        if(route && typeof route === 'function')
        {
            app.use('/api', route);
            console.log(`Loaded route: ${file}`);
        }
        else {
            console.warm(`skipped ${file}: not a valid router export`);
        }
    }    
});

// ✅ Load all Swagger doc files from api-doc folder
const apiDocsPath = path.join(__dirname, 'api-doc');
const apiFiles = fs
  .readdirSync(apiDocsPath)
  .filter((file) => file.endsWith('.js'))
  .map((file) => path.join(apiDocsPath, file));

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory System API',
      version: '1.0.0',
      description: 'API documentation ',
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === 'production'
            ? `http://localhost:${PORT}`
            : `http://localhost:${PORT}`,
      },
    ],
  },
  apis: apiFiles,
};


const swaggerSpec = swaggerJsdoc(options);

// 🧾 Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log('✅ Swagger docs loaded from:', apiFiles);
connectDB();

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})