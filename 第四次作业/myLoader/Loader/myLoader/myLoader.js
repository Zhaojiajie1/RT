const loaderUtils = require('loader-utils');

function myLoder(source) {
    const opts = loaderUtils.getOptions(this);
    const cb = this.async();
    setTimeout(() => {
        const result = source.replace("Bakehyun", opts.name)
        cb(null, result);
    })

    return result`export default ${JSON.stringify(source)}`
}
module.exports = myLoder;