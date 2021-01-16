const { middleware } = require('./src/core/app.js');
const app = require('./src/core/app.js');
const fileRouterMiddleware = require('./src/middlewares/fileRouterMiddleware.js');

app
.port(8000)
.middleware(fileRouterMiddleware)
.start()