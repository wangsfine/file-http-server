const fsPromise = require('fs/promises');
const ejs = require('ejs');
const util = require('util');
const { resolve } = require('path');

function parseUrl(url) {
    return url;
}

async function registRoutes(req, resp) {
    const path = parseUrl(req.url);
    if (path === '/') {
        const dirents = [];
        const dirs = await fsPromise.opendir(process.cwd());
        for await (const dirent of dirs) {
            dirents.push(dirent);
        }
        const templateName = resolve(__dirname, '../template/index.ejs');
        ejs.renderFile(templateName, { dirents }, { cache: true, filename: templateName}, (err, str) => {
            resp.end(str);
        })
        return;
    }
}

const fileRouterMiddleware = (req, resp, next) => {
    registRoutes(req, resp);
    next(false);
};

module.exports = fileRouterMiddleware