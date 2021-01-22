const minimist = require('minimist');
const path = require('path');
const app = require('./src/core/app.js');
const fileRouterMiddleware = require('./src/middlewares/fileRouterMiddleware.js');
const staticMiddleware = require('./src/middlewares/staticMiddleware.js');
const proxyMiddleware = require('./src/middlewares/proxyMiddleware.js');

// comandline arguments
const args = minimist(process.argv.slice(2));
const { proxy, port = 8000 } = args;

const middlewares = [
    staticMiddleware.static(path.resolve(__dirname, './src/static'), '/simple-http-server'),
    fileRouterMiddleware,
];
if (proxy) {
    middlewares.shift(proxyMiddleware.create(proxy));
}

app
.port(port)
.middlewares(middlewares)
.start(() => {
    console.log(`server is started at port ${port}, http://localhost:${port}`)
})