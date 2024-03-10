const swaggerDoc = require('swagger-jsdoc');

// here we have setup our options for swagger documents
const options = {
    definition:{
        openapi: '3.0.0',
        info:{
            title: 'Social Networking API',
            version: '1.0.0'
        },
        servers:[
            {
                url: 'http://localhost:4000'
            }
        ]
    },

    // we have given apis to document each and every operation
    apis: ['./model/post.js',
            './model/sigup.js',
            './model/userProfile.js',
            './controller/following_controller.js',
            './controller/home_controller.js',
            './controller/post_controller.js',
            './controller/user_controller.js',
            './controller/userProfile_controller.js']
}
const swaggerSpec = swaggerDoc(options);

module.exports = swaggerSpec;