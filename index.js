const path = require('path');
const minimist = require('minimist');

const app = require('./src/core/app.js');
const fileRouterMiddleware = require('./src/middlewares/fileRouterMiddleware.js');
const staticMiddleware = require('./src/middlewares/staticMiddleware.js');
const proxyMiddleware = require('./src/middlewares/proxyMiddleware.js');

const args = minimist(process.argv.slice(2));
const proxy = args.proxy;

app
.port(8000)
.middleware(proxy ? proxyMiddleware.create(proxy) : null)
.middleware(staticMiddleware.static(path.resolve(__dirname, './src/static'), '/simple-http-server'))
.middleware(fileRouterMiddleware)
.start()