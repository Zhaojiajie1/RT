class OutLogPlugin {
    constructor(options) {
        console.log(options)
    }

    apply(compiler) {
        compiler.hooks.compile.tap('CopyrightWebpackPlugin', () => {
            console.log('compiler');
        });

        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (Compilation, cb) => {
            debugger;
            Compilation.assets['copyright.txt'] = {
                source: function () {
                    return 'copyright by monday';
                },
                size: function () {
                    return 19;
                }
            };
            cb();
        })
    }
}
module.exports = OutLogPlugin