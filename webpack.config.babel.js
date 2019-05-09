// /* webpack.config.js */
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
//定义了一些文件夹的路径
let JS_PATH = path.resolve(path.resolve(__dirname), 'resources/js');
let TEMPLATE_PATH = path.resolve(path.resolve(__dirname), 'resources/html');
let PUBLIC_PATH = path.resolve(path.resolve(__dirname), 'public');
let config = {
    /*
    source-map  在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包文件的构建速度；
    cheap-module-source-map 在一个单独的文件中生成一个不带列映射的map，不带列映射提高项目构建速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；
    eval-source-map 使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。不过在开发阶段这是一个非常好的选项，但是在生产阶段一定不要用这个选项；
    cheap-module-eval-source-map  这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；
     */
    //devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry       : {
        'app': JS_PATH + '/app.js',
    },
    resolve     : {
        extensions: ['.js', '.jsx'],
        alias     : {
            //'vue$': 'vue/dist/vue.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    },
    //输出的文件名 合并以后的js会命名为bundle.js
    output      : {
        path         : PUBLIC_PATH,
        filename     : 'js/build/[name].js?v=[chunkhash]',
        chunkFilename: 'js/build/[name].bundle.js?v=[chunkhash]',
        publicPath   : 'http://localhost/fts3232/cash-note/public/',
    },
    //webpack-dev-server
    devServer   : {
        //host: '192.168.0.123',
        historyApiFallback: true,
        hot               : true,
        inline            : true,
    },
    module      : {
        rules: [
            {
                test: /\.css$/,
                use : [
                    {
                        loader : "style-loader/url"
                    },
                    {
                        loader : "file-loader",
                        options: {
                            name: '[name].[ext]?v=[hash]',
                            outputPath: 'css/build'
                        },
                    },
                ]
            },
            {
                test   : /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                include: JS_PATH,
                use    : {
                    loader : 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    "targets": {
                                        "browsers": ["last 2 versions", "ie >= 9"]
                                    }
                                }
                            ],
                            ["@babel/preset-react"]
                        ],
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-proposal-class-properties'
                        ],
                    }
                },
            }
        ]
    },
    externals   : {
        'vue'                          : 'Vue',
        'element-ui'                   : 'ELEMENT',
        'element-ui/lib/locale/lang/en': 'ELEMENT.lang.en',
        'vue-i18n'                     : 'VueI18n',
        'vuex'                         : 'Vuex',
        'vue-router'                   : 'VueRouter',
        'postcss-loader'               : 'postcss-loader',
        'style-loader'                 : 'style-loader',
        'sass-loader'                  : 'sass-loader',
        "lodash"                       : 'lodash',
        "react"                        : 'React',
        'mockjs'                       : 'Mock',
        'superagent'                   : 'superagent',
        'react-dom'                    : 'ReactDOM',
        'react-router'                 : 'ReactRouter',
        'react-router-dom'             : 'ReactRouterDOM',
        'history/createBrowserHistory' : 'history',//history插件
        'moment/moment.js'             : 'moment',//时间插件
        'pubsub-js'                    : 'PubSub',//pubSub插件
        'react-quill'                  : 'ReactQuill',//富文本编辑器
        'jquery'                       : '$',
        'bootstrap'                    : true,
        'fancybox'                     : true,
        'co'                           : true,
        '_'                            : true,
        'async'                        : true,
        'datetimepicker'               : true,
        'selectpicker'                 : true,
        'sweetalert'                   : true,
        'highcharts'                   : true,
        'director'                     : true
    },
    plugins     : [
        new CleanWebpackPlugin(['js/build', 'index.html', 'css/build'], {
            root   : PUBLIC_PATH,
            verbose: true,
            dry    : false
        }),
        new HtmlWebpackPlugin({
            template: TEMPLATE_PATH + '/index.html',
            filename: PUBLIC_PATH + '/index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    optimization: {
        runtimeChunk: {
            name: 'runtime.bundle'
        },
        minimizer   : [
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin()
        ],
        splitChunks : {
            chunks                : 'async',
            minSize               : 30000,
            maxSize               : 0,
            minChunks             : 1,
            maxAsyncRequests      : 5,
            maxInitialRequests    : 3,
            automaticNameDelimiter: '~',
            name                  : true,
            cacheGroups           : {
                vendors: {
                    test    : /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks         : 2,
                    priority          : -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
};

export default config;