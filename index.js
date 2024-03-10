const express = require('express');
const app = express();
const port = 4000;
const db = require('./config/mongoose');
const passportJWT = require('./config/password-jwt');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

// user the express for json
app.use(express.json());

// connect our swageer with our express and show the swagger documentations
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/', require('./routes'));
app.listen(port, (err)=>{
    if(err){
        console.log("Error in listening the port",err)
    }
    console.log("server successfull listen the port", port)
})