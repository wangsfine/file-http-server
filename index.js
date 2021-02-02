#!/usr/bin/env node

const minimist = require('minimist');
const path = require('path');
const { getIpAddress } = require('./src/utils/index.js');
const app = require('./src/core/app.js');
const fileRouterMiddleware = require('./src/middlewares/fileRouterMiddleware.js');
const staticMiddleware = require('./src/middlewares/staticMiddleware.js');
const proxyMiddleware = require('./src/middlewares/proxyMiddleware.js');

// comandline arguments
const args = minimist(process.argv.slice(2));
const { proxy, port = 8000 } = args;

const middlewares = [
    staticMiddleware.static(path.resolve(__dirname, './src/static'), '/file-http-server'),
];
middlewares.push(proxy ? proxyMiddleware.create(proxy) : fileRouterMiddleware)

app
.port(port)
.middlewares(middlewares)
.start(() => {
    const ip = getIpAddress();
    console.log(
        `Server running at: 
        - Local:   http://localhost:${port}/
        - Network: http://${ip}:${port}/
        `
    )
})