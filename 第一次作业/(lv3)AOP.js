
Function.prototype.after = function (fun) {
    let _this = this;
    return function () {
        _this.apply(this, arguments);
        fun.apply(this, arguments);
    }
}
Function.prototype.before = function (fun) {
    let _this = this;
    return function () {
        fun.apply(this, arguments);
        return _this.apply(this, arguments);
    }
}
function func() {
    console.log(2);
}


func = func.before((a = 1) => {
    console.log(a)
}).after((b = 3) => {
    console.log(b);
})

func()

