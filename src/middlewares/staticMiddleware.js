const utils = require('../utils/index.js');
const { join } = require('path');
const fs = require('fs');
const fsPromise = require('fs').promises;

/**
 * 静态资源中间件
 */
module.exports = {
    static(staticPath, routePath) {
        return async (req, resp, next) => {
            const path = utils.parseUrl(req.url);
            const result = new RegExp(`${routePath}/(.+)`).exec(path);
            if (!result) {
                return next(true);
            }
            const absolutePath = join(staticPath, result[1]);
            try {
                await fsPromise.access(absolutePath, fs.constants.R_OK);
                fs.createReadStream(absolutePath).pipe(resp);
            } catch (error) {
                next(true);
            }
        }
    }
}