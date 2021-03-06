// /* webpack.config.js */
import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HappyPack from 'happypack';
import os from 'os';
import CompressionWebpackPlugin from 'compression-webpack-plugin';
//css整合成1个文件
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
//补全css
import AutoPrefixer from 'autoprefixer';
//css 2x图插件
import PostCssAt2x from 'postcss-at2x';
//css 雪碧图
import PostCssSprites from 'postcss-sprites';

const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
//定义了一些文件夹的路径
const resourcesPath = path.resolve(path.resolve(__dirname), 'resources');
const templatePath = path.resolve(resourcesPath, 'template');
const publicPath = path.resolve(path.resolve(__dirname), 'public');

const config = {
    /*
    source-map  在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包文件的构建速度；
    cheap-module-source-map 在一个单独的文件中生成一个不带列映射的map，不带列映射提高项目构建速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；
    eval-source-map 使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。不过在开发阶段这是一个非常好的选项，但是在生产阶段一定不要用这个选项；
    cheap-module-eval-source-map  这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；
     */
    //devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
    //项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
    entry       : {
        'app': resourcesPath + '/index.js'
    },
    resolve     : {
        extensions: ['.js', '.jsx'],
        alias     : {
            'fts': resourcesPath,
        }
    },
    //输出的文件名 合并以后的js会命名为bundle.js
    output      : {
        path         : publicPath,
        filename     : 'js/[name].js?v=[hash]',
        chunkFilename: 'js/[name].bundle.js?v=[chunkhash]',
        publicPath   : '/',
    },
    //webpack-dev-server
    devServer   : {
        //host: '192.168.0.123',
        historyApiFallback: true,
        hot               : true,
        inline            : true,
        compress          : true,
        watchContentBase  : true,
        open              : true
    },
    module      : {
        rules: [
            {
                test   : /\.(html)$/,
                exclude: /(template)/,
                use    : [
                    {
                        loader : 'file-loader',
                        options: {
                            name: '[name].[ext]',
                        },
                    },
                    'extract-loader',
                    {
                        loader : 'html-loader',
                        options: {
                            attrs: ['img:src', 'link:href'],
                            minimize: true, //生产模式开启压缩
                        }
                    }]
            },
            {
                test   : /\.(png|jpg|jpeg|gif)$/,
                include: resourcesPath,
                use    : [
                    {
                        loader : "url-loader",
                        options: {
                            name      : "[name]-[hash:5].min.[ext]",
                            fallback  : 'file-loader',
                            limit     : 1000, // size <= 1KB
                            publicPath: "/images/",
                            outputPath: "./images",
                        }
                    },
                    {
                        loader : 'image-webpack-loader',
                        options: {
                            pngquant: { // 使用 imagemin-pngquant 压缩 png
                                quality: '65-90',
                                speed  : 4
                            }
                        }
                    }
                ],
            },
            {
                test   : /\.(sa|sc)ss$/,
                include: resourcesPath,
                use    : [
                    {
                        loader:  MiniCssExtractPlugin.loader,
                    },
                    /*{
                        loader:  'file-loader',
                        options: {
                            name: '[name].css',
                            publicPath: "/css/",
                            outputPath: "./css",
                        }
                    },
                    'extract-loader',*/
                    {
                        loader : 'css-loader',
                        options: {
                            //modules: true,
                            //localIdentName: '[local]',
                            // some options
                            minimize: true, //生产模式开启压缩
                        },
                    },
                    {
                        loader : 'postcss-loader',
                        options: {
                            plugins: [
                                new PostCssAt2x(),
                                new AutoPrefixer(),
                                new PostCssSprites({
                                    retina    : true, //支持retina，可以实现合并不同比例图片
                                    verbose   : true,
                                    spritePath: resourcesPath + '/assets/images', //雪碧图合并后存放地址
                                    //styleFilePath: resourcesPath + '/assets/css',
                                    basePath  : './images',
                                    filterBy  : function (image) {
                                        //过滤一些不需要合并的图片，返回值是一个promise，默认有一个exist的filter
                                        if (image.originalUrl.indexOf('?__sprites') === -1) {
                                            return Promise.reject();
                                        }
                                        return Promise.resolve();
                                    },
                                    groupBy   : function (image) {
                                        //将图片分组，可以实现按照文件夹生成雪碧图
                                        var groupName = '/sprite';
                                        var url = path.dirname(image.url);
                                        url = url.replace(/\.\.\//g, '');
                                        url = url.replace(/\.\//g, '');
                                        if (image.url.indexOf('@2x') !== -1) {
                                            groupName = '/sprite@2x';
                                        } else if (image.url.indexOf('@3x') !== -1) {
                                            groupName = '/sprite@3x';
                                        }
                                        if (url == 'images') {
                                            url = '';
                                        }
                                        return Promise.resolve(url + groupName);
                                    },
                                    hooks     : {
                                        onSaveSpritesheet: function (opts, spritesheet) {
                                            // We assume that the groups is not an empty array
                                            var filenameChunks = spritesheet.groups.concat(
                                                spritesheet.extension
                                            );
                                            return path.join(
                                                opts.spritePath,
                                                filenameChunks.join('.')
                                            );
                                        },
                                    },
                                })],
                        },
                    },
                    'sass-loader',
                ]
            },
            {
                test   : /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                include: resourcesPath,
                use    : {
                    loader: 'happypack/loader?id=babel',
                }
            }
        ]
    },
    externals   : [
        {
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
            'mockjs'                       : 'Mock',
            'superagent'                   : 'superagent',
            "react"                        : 'React',
            'react-dom'                    : 'ReactDOM',
            'react-redux'                  : 'ReactRedux',
            'echarts'                      : 'echarts',
            'react-router'                 : 'ReactRouter',
            //'react-router-dom'             : 'ReactRouterDOM',
            'react-router-config'          : 'ReactRouterConfig',
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
        }
    ],
    plugins     : [
        new CleanWebpackPlugin(['public'], {
            verbose: true,
            dry    : false
        }),
        new HtmlWebpackPlugin({
            title   : '记账本',
            template: templatePath + '/index.html',
            filename: publicPath + '/index.html',
            meta    : {
                viewport   : 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no',
                keyword    : 'keyword',
                description: 'description'
            },
            //chunks: ['app','vendors','styles','runtime']
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename     : 'css/[name].css',
            //chunkFilename: 'css/[id].css',
        }),
        new HappyPack({
            id        : 'babel',
            //如何处理  用法和loader 的配置一样
            loaders   : [
                {
                    loader : 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        presets       : [
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
                        plugins       : [
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-proposal-class-properties',
                            '@babel/plugin-transform-runtime',
                            [
                                'babel-plugin-import',
                                {
                                    libraryName            : '@material-ui/icons',
                                    libraryDirectory       : 'esm', // or '' if your bundler does not support ES modules
                                    camel2DashComponentName: false,
                                },
                            ]
                        ],
                    }
                },
                {
                    loader : 'eslint-loader',
                    options: {
                        // some options
                        fix: true,
                    },
                },
            ],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose   : true,
        }),
        new CopyPlugin([
            {from: resourcesPath + '/assets/.htaccess', to: publicPath},
        ]),
        new CompressionWebpackPlugin({
            algorithm: 'gzip',
            test     : /\.(js|css)$/,
            threshold: 10240,
        })
    ],
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        },
        minimizer   : [
            new TerserPlugin(),
            new OptimizeCSSAssetsPlugin()
        ],
        splitChunks : {
            cacheGroups: {
                vendors: {
                    test     : /[\\/]node_modules[\\/]/,
                    name     : 'vendors',
                    minSize  : 30000,
                    minChunks: 1,
                    chunks   : 'initial',
                    priority : 1 // 该配置项是设置处理的优先级，数值越大越优先处理
                },
                styles: {
                    name: 'styles',
                    test: /\.scss$/,
                    chunks: 'all',
                    minChunks: 2, // 最小被引用次数
                    minSize: 0, // 最小体积（默认30000）
                    priority : 10 // 该配置项是设置处理的优先级，数值越大越优先处理
                },
            }
        }
    }
};

export default config;