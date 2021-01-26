const fs = require('fs');
const fsPromise = require('fs/promises');
const zlib = require('zlib');
const ejs = require('ejs');
const util = require('util');
const utils = require('../utils/index.js');
const { resolve, join } = require('path');



const renderFile = util.promisify(ejs.renderFile);


async function registRoutes(req, resp) {
    const path = utils.parseUrl(req.url);
    try {
        const absolutePath = join(process.cwd(), path);
        const stat = await fsPromise.stat(absolutePath);
        // dir
        if (stat.isDirectory()) {
            const dirents = [];
            const dirs = await fsPromise.opendir(absolutePath);
            for await (const dirent of dirs) {
                dirent.path = join(path, dirent.name);
                dirents.push(dirent);
            }
            const preLink = join(path, '../');
            const templateName = resolve(__dirname, '../template/index.ejs');
            const html = await renderFile(templateName, { dirents, preLink }, { cache: true, filename: templateName});
            return resp.end(html);
        }
        // file
        if (stat.isFile()){
            fs.createReadStream(absolutePath).pipe(zlib.createGzip()).pipe(resp);
        }

    } catch (error) {
        // 404
        const templateName = resolve(__dirname, '../template/404.ejs');
        const html = await renderFile(templateName,  {}, { cache: true, filename: templateName});
        return resp.end(html);
    }
}


module.exports = (req, resp, next) => {
    registRoutes(req, resp);
    next(false);
};