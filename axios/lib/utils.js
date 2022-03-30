let bind = require('bind');

let toString = Object.prototype.toString;
//遍历参数 b 对象，复制到 a 对象上
function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
            a[key] = bind(val, thisArg);
        } else {
            a[key] = val;
        }
    })
    return a;
}

//工具方法 utils.forEach
function forEach(obj, fn) {
    if (obj === null || typeof obj === 'undefined') {
        throw new Error('not a obj');
    }

    if (typeof obj !== 'object') {
        obj = [obj];
    }

    if (isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            fn.call(null, obj[i], i, obj);
        }
    } else {
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}

function merge() {
    let result = {};
    function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
            result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
            result[key] = merge({}, val);
        } else if (isArray(val)) {
            result[key] = val.slice();
        } else {
            result[key] = val;
        }

    }
    for (let i = 0, l = arguments.length; i < l; i++) {
        forEach(arguments[i], assignValue)
    }
}
module.exports = {
    merge,
    forEach,
    extend,
    toString
}