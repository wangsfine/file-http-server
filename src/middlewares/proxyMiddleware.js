const httpProxy = require('http-proxy');

/**
 * 实现代理功能
 */
module.exports = {
    create(target) {
        const proxy = httpProxy.createProxyServer({
            target,
            secure: false, // https
        });
        return (req, resp, next) => {
            proxy.web(req, resp);
            next(false);
        };
    }
}