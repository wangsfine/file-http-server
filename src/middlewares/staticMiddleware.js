const utils = require('../utils/index.js');
module.exports = {
    static(staticPath, routePath) {
        return (req, resp, next) => {
            const path = utils.parseUrl(req.url);
            const result = new RegExp(`${routePath}(.+)`)
            if (new RegExp) {

            }
        }
    }
}