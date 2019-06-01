module.exports = {
    env          : {
        browser : true,
        commonjs: true,
        es6     : true,
        node    : true,
    },
    parser       : 'babel-eslint',
    extends      : ['airbnb', 'prettier'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion : 2018,
        sourceType  : 'module',
    },
    plugins      : ['react', 'prettier'],
    rules        : {
        // 执行一致的缩进 4个空格
        'indent'                               : ['error', 4, {'SwitchCase': 1}],
        // 禁止验证执行import 文件的后缀名
        'import/extensions'                    : 0,
        // 执行一致的换行符
        'linebreak-style'                      : ["error", "windows"],
        // 定义字符串使用 要求尽可能使用单引号
        'quotes'                               : ['error', 'single'],
        // 在语句结尾处需要分号
        'semi'                                 : ['error', 'always'],
        // 禁止console
        'no-console'                           : 'off',
        // 禁止未声明的变量 typeof例外
        'no-undef'                             : ['error', {"typeof": false}],
        // 需要使用箭头函数进行回调
        'prefer-arrow-callback'                : 'warn',
        // 禁止var定义
        'no-var'                               : 'error',
        // func 最大参数数量
        'max-params'                           : ['error', 4],
        // jsx 缩进 4个空格
        'react/jsx-indent'                     : ['error', 4],
        // 允许jsx 的文件格式 .js .jsx
        'react/jsx-filename-extension'         : ['error', {'extensions': ['.js', '.jsx']},],
        // JSX中的每一行限制为一个表达式
        'react/jsx-one-expression-per-line'    : 0,
        // 禁止在标识符中悬挂下划线 例外 _this
        'no-underscore-dangle'                 : ['error', {'allow': ['_this']}],
        // 验证禁止的prop参数类型
        'react/forbid-prop-types'              : 0,
        // 键值间距  例：{ "foo": 42 }
        'key-spacing'                          : ["error", {"beforeColon": false, "align": "colon"}],
        // 关键字间距 例：if (){} else {}
        'keyword-spacing'                      : ["error", {"before": true, "after": true}],
        // 在块之前需要空格 例 if () {}
        'space-before-blocks'                  : ['error', 'always'],
        // 需要在中缀运算符周围的间距 例：1 + 2
        'space-infix-ops'                      : ["error", {"int32Hint": false}],
        // 块间距 例：function foo() { return true; }
        'block-spacing'                        : ['error', 'always'],
        // 强制逗号旁边的间距 例：[1, 2, 3]
        'comma-spacing'                        : ["error", {"before": false, "after": true}],
        // 禁止使用尾随逗号 例：{bar: "baz",bar: "baz",bar: "baz"}
        'comma-dangle'                         : ["error", "never"],
        // 在大括号内强制一致的间距 例：{ a:1,b:2 }
        'object-curly-spacing'                 : ['error', 'always'],
        //验证JSX开始和结束括号内和周围的空格
        'react/jsx-tag-spacing'                : ['error', {'beforeSelfClosing': 'never'}],
        //不强制函数式组件
        'react/prefer-stateless-function'      : 0,
        //prop参数缩进
        'react/jsx-indent-props'               : ['error', 4],
        //防止在数组中遍历中使用数组key做索引
        "react/no-array-index-key"             : 0,
        //在模板字符串中强制使用间距 例：${ i }
        "template-curly-spacing"               : ['error', 'always'],
        //允许++
        "no-plusplus"                          : 0,
        //强制label必须设置for
        'jsx-a11y/label-has-for'               : 0,
        //强制button必须设置type
        "react/button-has-type"                : 0,
        //强制方类法必须使用this
        'class-methods-use-this'               : 0,
        //强制jsx不使用bind
        "react/jsx-no-bind"                    : 0,
        //点击事件必须拥有键盘事件
        "jsx-a11y/click-events-have-key-events": 0,
        //必须支持tab交互
        "jsx-a11y/interactive-supports-focus"  : 0,
        //export 单一对象时使用default
        'import/prefer-default-export'         : 0,
        //禁止重新赋值参数
        'no-param-reassign'                    : 0,
        //禁止一个文件内出现多个component
        'react/no-multi-comp'                  : 0,
        //禁止全局变量
        'no-restricted-globals'                : 0,
        'react/no-unused-prop-types'           : 0,
        'react/prop-types'                     : 0,
        'react/destructuring-assignment'       : 0,
        'react/no-access-state-in-setstate'    : 0,
        'no-case-declarations'                 : 0,
        'no-alert'                             : 0,
        'no-unused-expressions'                : 0,
        'guard-for-in'                         : 0,
        "no-restricted-syntax"                 : 0,
        'import/no-unresolved'                 : 0,
        'no-unused-vars':0
    },
};
