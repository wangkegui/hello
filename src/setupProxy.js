
const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy(
            '/cgi-bin',
            {
                target: 'https://api.weixin.qq.com',
                changeOrigin: true
            }
        )
    );
};