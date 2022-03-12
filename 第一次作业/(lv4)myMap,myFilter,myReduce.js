//Map
Array.prototype.myMap = function (cb, thisArg) {
    if (Object.prototype.toString.call(cb) != '[object Function]') {
        throw new TypeError('The first argument must be a function');
    }

    let result = [];
    let currentArr = this;

    for (let i = 0; i < currentArr.length; i++) {
        result[i] = cb.call(thisArg, currentArr[i]);
    }

    return result;
}
//Map测试用例
function foo(item) {
    return item * 2;
}
let a = [1, 2, 3, 4, 5];
let b = a.myMap(foo);

console.log(b);


//Filter
Array.prototype.myFilter = function (cb, thisArg) {
    if (Object.prototype.toString.call(cb) != '[object Function]') {
        throw new TypeError('The first argument must be a function');
    }

    let result = [];
    let currentArr = this;

    for (let i = 0; i < currentArr.length; i++) {
        if (cb.call(thisArg, currentArr[i], i, currentArr)) {
            result.push(currentArr[i]);
        }
    }

    return result;
}
//filter测试用例
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.myFilter(word => word.length > 6);

console.log(result);


//Reduce

Array.prototype.myReduce = function (cb, initValue) {
    if (Object.prototype.toString.call(cb) != '[object Function]') {
        throw new TypeError('The first argument must be a function');
    }
    let arr = this;
    let idx = arguments.length == 1 ? 1 : 0;
    let acc = arguments.length == 1 ? arr[0] : initValue;

    for (let i = idx; i < arr.length; i++) {
        acc = cb(acc, arr[i], i, arr);
    }

    return acc;
}
//reduce测试用例
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1.myReduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
);

console.log(sumWithInitial);
// expected output: 10
