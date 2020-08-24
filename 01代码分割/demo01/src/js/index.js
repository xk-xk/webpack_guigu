// import { sum } from './test.js'

// console.log(sum)

import(/* webpackChunkName:'test' */'./test').then(res => {
  console.log(res)
}).catch(err => {
  console.log('文件加载失败')
})