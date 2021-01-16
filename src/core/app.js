const http = require('http');
const { isFunction } = require('lodash');



const DEFAULT_PORT = 8000;
const DEFAULT_CALLBACK = () => {
    console.log(`your server is started at port ${DEFAULT_PORT}`);
};

// configs
const configs = {
    proxy: '',
    port: DEFAULT_PORT,
    middlewares: [],
};

async function registMiddlewares(req, resp, middlewares) {
    for (let i = 0; i < middlewares.length; i++) {
        const middleware = middlewares[i];
        const flag = await promisfyMiddleware(middleware, req, resp);
        if (!flag) {
            break;
        }
    }
}

function promisfyMiddleware(middleware, ...args) {
    return new Promise((resolve) => {
        middleware.call(null, ...args, (flag = true) => {
            resolve(flag);
        });
    });
}

module.exports = {

    proxy(proxy) {
        configs.proxy = proxy;
        return this;
    },

    port(port) {
        configs.port = port;
        return this;
    },

    middleware(middleware) {
        if (!isFunction(middleware)) {
            throw new Error('middleware format error, you need a function')
        }
        if (configs.middlewares.indexOf(middleware) > -1) {
            throw new Error('you registed the same middleware');
        }
        configs.middlewares.push(middleware);
        return this;
    },

    start(callback = DEFAULT_CALLBACK) {
        const server = http.createServer((req, resp) => {
            registMiddlewares(req, resp, configs.middlewares);
        });
        server.listen(configs.port, callback);
    }
}