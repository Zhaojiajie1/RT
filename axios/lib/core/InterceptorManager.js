function InterceptorManager() {
    //handles 用于存储拦截器函数
    this.handlers = [];
}

//followings are three method "use","eject","forEach"

InterceptorManager.prototype.use = function use(fulfilled, rejected) {//传递两个函数作为参数
    this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected
    });
    return this.handlers.length - 1;//返回数字ID，用于移除拦截器
}

InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
        this.handlers[id] = null;
    }
};

InterceptorManager.prototype.forEach = function forEach(fn) {
    urils.forEach(this.handlers, function forEachHandlers(h) {
        if (h !== null) {
            fn(h);
        }
    });
};