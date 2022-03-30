function Axios(instanceConfig) {
    //默认参数
    this.defaults = instanceConfig;
    //拦截器 请求和相应拦截器
    this.interceptor = {
        request: new InterceptorManger(),
        response: new InterceptorManger()
    };
}

Axios.prototype.request = function request(config) {
    if (typeof config === 'string') {
        config = arguments[1] || {};
        config.url = arguments[0];
    } else {
        config = config || {};
    }

    //合并默认参数和用户传递的参数
    config = mergeConfig(this.defaults, config);

    //设置 默认请求方法为get
    if (config.method) {
        config.method = con
    } else {
        config.method = 'get';
    }

    //组成promise链
    //把xhr请求的dispatchRequest和undefined 放在一个数组里
    let chain = [dispatchRequest, undefined];
    let promise = Promise.resolve(config);

    //遍历用户设置的请求拦截器,放到数组的chain前面
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected)
    })
    //遍历用户设置的响应拦截器,放到数组的chain前面
    this.interceptors.response.forEach(function pushResponseInterceptor(interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected)
    })

    //遍历chain数组
    while (chain.length) {
        //两两对应移出来，放到then的两个参数里
        promise = promise.then(chain.shift(), chain.shift())
    }
    return promise;
}

//这是获取URL的函数，这里省略
Axios.prototype.getUrl = function () { }
//provide aliases for supported request methids
//遍历执行
//也就是为啥我们可以 axios.get等别名的方式调用，而且调用的是Axios.prototype.request的方法
utils.forEach(['delete', 'get', 'head', 'option'], function forEachMethodNoData(method) {
    Axios.prototype[method] == function (url, config) {
        return this.request(utils.merge(config || {}, {
            method: method,
            url: url,
        }));
    };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodNoData(method) {
    Axios.prototype[method] == function (url, config) {
        return this.request(utils.merge(config || {}, {
            method: method,
            url: url,
            data: data,
        }));
    };
});

module.exports = Axios;