const fs = require('fs');
const fsPromise = require('fs/promises');
const ejs = require('ejs');
const util = require('util');
const utils = require('../utils/index.js');
const { resolve, join } = require('path');



const renderFile = util.promisify(ejs.renderFile);


async function registRoutes(req, resp) {
    const path = utils.parseUrl(req.url);
    if (path === '/favicon.ico'){
        return fs.createReadStream(resolve(__dirname, '../static/favicon.ico')).pipe(resp);
    }
    try {
        const absolutePath = join(process.cwd(), path);
        const stat = await fsPromise.stat(absolutePath);
        if (stat.isDirectory()) {
            const dirents = [];
            const dirs = await fsPromise.opendir(absolutePath);
            for await (const dirent of dirs) {
                dirent.path = join(path, dirent.name);
                dirents.push(dirent);
            }
            const templateName = resolve(__dirname, '../template/index.ejs');
            const html = await renderFile(templateName, { dirents }, { cache: true, filename: templateName});
            return resp.end(html);
        } else if (stat.isFile()){
            fs.createReadStream(absolutePath).pipe(resp);
        }

    } catch (error) {
        const templateName = resolve(__dirname, '../template/404.ejs');
        const html = await renderFile(templateName,  {}, { cache: true, filename: templateName});
        return resp.end(html);
    }
}


module.exports = (req, resp, next) => {
    registRoutes(req, resp);
    next(false);
};