//返回一个新函数 wrap
module.exports = function bind(fn, thisArg) {
    return function wrap() {
        let args = new Array(arguments.length);
        for (let i = 0; i < args.length; i++) {
            //把参数放在args中
            args[i] = arguments[i];
        }

        return fn.apply(thisArg, args);
    }
}


