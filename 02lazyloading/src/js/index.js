console.log('index.js 被加载了')


document.getElementById('btn').onclick = function () {
    import(/* webpackChunkName:'test' */'./test.js').then(({ mul }) => {
        mul(2, 4)
    })
}

