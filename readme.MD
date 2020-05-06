1、最原始的打包命令
```javascript
npx webpack --entry=./index.js --output-filename=bundle.js --mode=development
```
其中entry为资源打包入口文件，webpack从这里开始进行模块依赖的查找
output-filename为输出文件名
mode表示打包模式，webpack为开发者提供了development、production、none三种模式。当置于development和production两种模式下的时候，他会自动添加适合于当前模式的一系列配置，减少了人为的工作量。

2、使用npm scripts
```javascript
// scripts是npm提供的脚本命令功能，在这里我们可以直接使用由模块所添加的指令（比如webpack取代之前的 ‘npx webpack’）
"scripts": {
    "build": "webpack --entry=./index.js --output-filename=bundle.js --mode=production"
}
// 之后在命令行中直接输入npm run build即可进行打包
```
3、使用默认目录配置
通常情况下我们会分别设置源码目录与资源输出目录
工程源代码放在/src中，输出资源放在/dist中
webpack默认的源代码入口就是src/index.js，因此如果当入口文件index.js在src文件夹下时，可省略entry的配置；

4、使用配置文件
当项目需要越来越多的配置时，就需要向命令行中添加更多的参数，那么后期维护就会变得比较困难；
为了解决这个问题，可以把这些参数改为对象的形式专门放在一个配置文件中，在webpack每次打包的时候读取改文件即可；
webpack的默认配置文件是webpack.config.js；
webpack对于output.path的要求是使用绝对路径（从项目根目录开始的完整路径）

5、webpack-dev-server
便捷的本地开发工具 —— 只要编辑项目源文件就会自动刷新页面
使用方法：
1)安装命令
```javascript
npm install webpack-dev-server --save-dev
```
参数说明：
--save-dev: 将webpack-dev-server作为工程的devDependencies（开发环境依赖）记录在package.json中。
    这样做是因为webpack-dev-server仅仅在本地开发时才会用到，在生产环境并不会用到它，所以放在devDependencies中。
    假如工程上线要进行依赖安装，就可以通过 npm install --production 过滤掉devDependencies中的冗余模块，从而加快安装和发布的速度。
2)便捷启动方式：在package.json中添加dev命令
```json
"scripts":{
    "build":"webpack",
    "dev":"webpack-dev-server" // 这里就是添加的dev命令
}
```
3)添加完启动方式之后，需要对webpack.config.js进行配置：
```json5
// 对象中即为打包时webpack所接收到的配置参数
let path = require("path");
module.exports = {
    entry:"./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'dist')
    },
    mode: "development",
    // 在配置中专门添加了一个devServer对象，专门用来放webpack-dev-server配置
    // webpack-dev-server可以看做是一个服务者，主要工作就是接收浏览器的请求，然后将资源进行返回。
    devServer: {
        publicPath: '/dist'
    }
};
```
工作流程：
webpack-dev-server可以看做是一个服务者，主要工作就是接收浏览器的请求，然后将资源进行返回。
当服务启动时，会先让webpack进行模块打包并将资源准备好，
当webpack-dev-server接收到浏览器的资源请求的时候，它会首先进行URL的地址校验。
如果该地址是资源服务地址（配置中的publicPath）,就会从webpack的打包结果中寻找该资源并返回给浏览器。反之，如果请求地址不属于资源服务地址，则直接读取硬盘中的源文件并将其返回。

webpack-dev-server两大职能：
1）令webpack进行模块打包，并处理打包结果的资源请求。
2）作为普通的web-server，处理静态资源文件请求。

直接使用webpack开发和使用webpack-dev-server有一个很大的区别：
前者每次都会生成bundle.js；
而webpack-dev-server只是将打包结果放在内存中，并不会写入实际的bundle.js，在每次webpack-dev-server接收到请求时都只是将内存中的打包结果返回给浏览器。

webpack-dev-server还有一项很便捷的特性就是live-reloadin（自动刷新）。
之后还会讲到hot-module-replacement（模块热替换），我们甚至不需要刷新浏览器就能获取到更新之后的内容。





