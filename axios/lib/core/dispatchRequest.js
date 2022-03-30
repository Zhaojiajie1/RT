/* 
1.如果已经取消，则 throw 原因报错，使Promise走向rejected。
2.确保 config.header 存在。
3.利用用户设置的和默认的请求转换器转换数据。
4.拍平 config.header。
5.删除一些 config.header。
6.返回适配器adapter（Promise实例）执行后 then执行后的 Promise实例。返回结果传递给响应拦截器处理。
*/
let utils = require('./../utils');
let isCancel = require();
//let defaults = require(../defaults);

module.exports = function dispatchRequest(config) {
    config.header = config.header || {};

    config.header = utils.merge(
        config.headers.common || {},
        config.header[config.method] || {},
        config.headers || {}
    );

    utils.forEach(
        ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
        function cleanHeaderConfig(method) {
            delete config.header[method];
        }
    );
};