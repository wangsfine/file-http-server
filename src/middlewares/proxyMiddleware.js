const request = require('request');
const utils = require('../utils/index.js');

/**
 * 实现代理功能
 */
module.exports = {
    create(proxy) {
        return (req, resp, next) => {
            const path = utils.parseUrl(req.url);
            const targetUrl = new URL(path, proxy);
            request(targetUrl.toString()).pipe(resp);
            next(false);
        };
    }
}