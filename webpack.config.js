/**
 * Created by Administrator on 2017/2/8.
 */
var ET = require("extract-text-webpack-plugin");
module.exports = {
    devtool: "source-map",
    entry: __dirname+"/src/script/app.js",  //Ҫ���������ļ�
    output:{
        path: __dirname+"/prd/",
        filename:"boudle.js"  //����֮���Ŀ���ļ�
    },
    module:{
        loaders:[
            {
                test: /\.css$/,  //��css�������ļ�
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
        contentBase: __dirname+"/prd", //���ط����������ص�ҳ������Ŀ¼
        port: "8080",  //�˿ں�
        host: "localhost", //
        historyApiFallback: true, //����ת
        inline: true    //ʵʱˢ��
    },
    plugins:[
        new ET("boudle.css")
    ]
};