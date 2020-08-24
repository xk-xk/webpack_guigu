console.log('index.js 被加载了')


document.getElementById('btn').onclick = function () {
    import( /* webpackChunkName:'test' */ './test.js').then(({
        mul
    }) => {
        mul(2, 4)
    })
}

// 注册 serviceWorker
// 
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(() => {
                console.log('sw注册成功')
            }).catch(() => {
                console.log('注册失败')
            })
    })
}