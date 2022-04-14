class InterceptorsMange {
    constructor() {
        this.handlers = [];
    }
    use(fufilled, rejected) {
        this.handlers.push({
            fufilled,
            rejected
        })
    }
}
class Axios {
    constructor() {
        this.interceptos = {
            request: new InterceptorsMange,
            response: new InterceptorsMange
        }
    }

    request(config) {
        this.sendXHR(config);
        let chain = [this.sendXHR.bind(this), undefined];

        this.interceptos.request.handlers.forEach(interceptor => {
            chain.unshift(interceptor.fufilled, interceptor.rejected);
        })
        this.interceptos.response.handlers.forEach(interceptor => {
            chain.push(interceptor.fufilled, interceptor.rejected);
        })

        let promise = Promise.resolve(config);
        while (chain.length > 0) {
            promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
    }

    sendXHR(config) {
        return new Promise((resolve, reject) => {
            const { url = '', method = 'get', data = {} } = config;
            let xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.onload = function () {
                console.log(xhr.responseText);
                resolve(xhr.responseText);
            }
            xhr.send(data);
        })
    }
}


const methods = ['get', 'post'];
methods.forEach(method => {
    Axios.prototype[method] = function () {
        console.log(method);
        if (method == 'get') {
            return this.request({
                method: method,
                url: arguments[0],
                ...arguments[1] || {}
            })
        } else {
            return this.request({
                method: method,
                url: arguments[0],
                data: arguments[1] || {},
                ...arguments[2] || {}
            })
        }
    }
})

const utils = {
    extend(a, b, context) {
        for (key in b) {
            if (b.hasOwnProperty(key)) {
                if (typeof b[key] === 'function') {
                    a[key] = b[key].bind(context);
                } else {
                    a[key] = b[key]
                }
            }
        }
    }
}

function CreatAxiosFn() {
    let axios = new Axios();
    let req = axios.request.bind(axios);
    utils.extend(req, Axios.prototype, axios)

    utils.extend(req, axios)
    return req;
}

let axios = CreatAxiosFn();