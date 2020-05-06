// 对象中即为打包时webpack所接收到的配置参数
let path = require("path");
module.exports = {
    entry:"./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'dist')
    },
    mode: "production",
    devServer: {
        publicPath: '/dist'
    }
};
