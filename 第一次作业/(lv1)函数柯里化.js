function curry(func, ...args) {

    return function (...innerArgs) {
        innerArgs = args.concat(innerArgs);

        if (innerArgs.length < func.length) {
            return curry.call(this, func, ...innerArgs);
        }
        else {
            return func.apply(this, innerArgs);
        }
    }
}
function sum(a, b, c) {
    return a + b + c;
}
let curriedSum = curry(sum);


console.log(curriedSum(1, 2, 3)); // 6，仍然可以被正常调用
console.log(curriedSum(1)(2, 3)); // 6，对第一个参数的柯里化
console.log(curriedSum(1)(2)(3)); // 6，全柯里化

