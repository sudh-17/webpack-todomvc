var htmlWebpackPlugin = require('html-webpack-plugin')//导入webpack的HTML插件模板
var path = require('path');
//var precss = require('precss');
//var autoprefixer = require('autoprefixer');
var webpack = require('webpack');

module.exports={
    context: __dirname,//上下文
    entry: {
        index: __dirname + '/src/js/index.js'
    },
    output:{
        path: __dirname+'/dist/',
        filename: 'js/[name].min.js',
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname +'src'),
                exclude: path.resolve( __dirname +'node_modules'),
                options:{
                    presets:['latest']
                }
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    browsers:['last 2 versions']
                                })
                            ]
                        }
                    }
                ]
                
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    // browsers:['last 2 versions']
                                    browsers : ['last 30 versions', "> 2%", "Firefox >= 10", "ie 6-11"]
                                })
                            ]
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)/i,
                //使用base64方式编译图片
                use: [{
                        loader: 'url-loader',
                        options:{
                            limit: 20000,//如果编译后的大小大于20k则交给file-loader处理
                            name: 'assets/[name]-[hash:5].[ext]' //编译之后的图片的命名规则（文件大于limit才生效）
                        }
                    },
                    // 'image-webpack-loader' //图片压缩的loader
                ]
                //使用普通的请求方式编译图片
                /*use: [{
                        loader:'file-loader',
                        options: {
                            name: 'assets/[name]-[hash:5].[ext]' //编译之后的图片的命名规则
                        }
                }],*/
                
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                  limit: 10000
                }
            }
        ]
    },
    plugins:[
        //html插件
        new htmlWebpackPlugin({
            filename:'index.html',//HTML文件名称
            template: './src/index.html', //HTML模板
            inject: 'head',
            chunks: ['index'] //对应entry入口的js，按需加载js
        }),
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery: 'jquery',
           'window.jQuery': 'jquery'
        })
    ]
}