import './iconfont.css'
import './index.less'
import print from './print.js'
console.log('index.js被加载了')
print()

function add(a, b) {
    return a + b
}

console.log(add(1, 4))

if (module.hot) {
    // 如果 module.hot 为 true，说明开启了 HMR ，让 HMR 功能代码生效
    module.hot.accept('./print.js', function () {
        // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会打包构建
        // 会执行后面的回调函数
        print()
    })
}