const ip = require('ip');

module.exports = {
    parseUrl(url) {
        return decodeURIComponent(url);
    },
    getIpAddress() {
        return ip.address();
    }
}