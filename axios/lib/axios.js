//第一部分
//引入 utils 对象，有很多工具方法
const utils = require('./utils');
//引入 bind 方法
const bind = require('./helpers/bind');
//构造核心函数 Axios
const Axios = require('./core/Axios');
//合并配置方法
const mergeConfig = require('./core/mergeConfig');
//引入默认配置
const defaults = require('./defaults')

//第二部分
function createInstance(defaultConfig) {
    //new 一个 Axios 生成实例对象

    let context = new Axios(defaultConfig);

    //bind返回一个新的wrap 函数
    //也就是为什么调用 axios 是调用 Axios.prototype.request 函数的原因

    let instance = bind(Axios.prototype.request, context);

    //Copy axios.prototype to instance.request
    //赋值 Axios.prototype 到实例上
    //也就是为什么有 axios.get 等别名的方法
    //且调用的是 Axios.prototype.get 等别名的方法

    utils.extend(instance, Axios.prototype, context);

    //Copy context to instance
    //复制 context 到 instance 实例
    //也就是为什么默认配置 axios.default 和拦截器 axios.interceptors 可以使用的原因
    //其实是new Axios().default 和 new Axios().interceptors
    utils.extend(instance, context);
    //最后返回实例对象
    return instance;
}

//Creat the default instance to be exported by the
//导出 创建默认实例
let axios = createInstance(defaults);
//暴露 Axios class 允许 class 继承，也就是可以 new axios.Axios()
//但axios文档中 并没有提到这个，用的也少
axios.Axios = Axios;

//工厂模式 创建新的实例 用户可以自定义一些参数
axios.creat = function creat(instanceConfig) {
    return createInstance(mergeConfig(axios.defaults, instanceConfig));
}

//第三部分
//取消相关API实现，还有all，spread，导出等的实现

axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

axios.all = function all(promises) {
    return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.export = axios;
//可以以以下方式引入
module.exports.default = axios;
