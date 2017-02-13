/**
 * Created by Administrator on 2017/2/8.
 */
var ET = require("extract-text-webpack-plugin");
module.exports = {
    devtool: "source-map",
    entry: __dirname+"/src/script/app.js",  //要编译的入口文件
    output:{
        path: __dirname+"/prd/",
        filename:"boudle.js"  //编译之后的目标文件
    },
    module:{
        loaders:[
            {
                test: /\.css$/,  //以css结束的文件
                loader: "style-loader!css-loader"
            },
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.sass$/,
                //loader: "style-loader!css-loader!sass-loader"
                loader:ET.extract({
                    fallbackLoader:'style-loader',
                    loader:'css-loader!sass-loader'
                })
            }
        ]
    },
    devServer:{
        contentBase: __dirname+"/prd", //本地服务器所加载的页面所在目录
        port: "8080",  //端口号
        host: "localhost", //
        historyApiFallback: true, //不跳转
        inline: true    //实时刷新
    },
    plugins:[
        new ET("boudle.css")
    ]
};