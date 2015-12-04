/**
 * 声明数组遍历函数接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      IArrayIterator.ts
 */
/**
 * 声明哈希表接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      IHashTable.ts
 */
/**
 * 声明对象遍历函数接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      IObjectIterator.ts
 */
/// <reference path="IHashTable.ts" />
/**
 * 定义数组类工具方法。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      _iterator.ts
 */
/// <reference path="IArrayIterator.ts" />
/// <reference path="IObjectIterator.ts" />
var Util;
(function (Util) {
    function each(obj, cb, $this) {
        $this = $this || {};
        var ii;
        if (obj instanceof Array) {
            if (obj.forEach)
                return obj.forEach(cb, $this);
            for (ii = 0; ii < obj.length; ii++)
                cb.call($this, obj[ii], ii, obj);
            return;
        }
        for (ii in obj)
            if (obj.hasOwnProperty(ii))
                cb.call($this, obj[ii], ii, obj);
    }
    Util.each = each;
    function every(obj, cb, $this) {
        $this = $this || {};
        var ii;
        if (obj instanceof Array) {
            if (obj.every)
                return obj.every(cb, $this);
            for (ii = 0; ii < obj.length; ii++)
                if (!cb.call($this, obj[ii], ii, obj))
                    return false;
        }
        else
            for (ii in obj)
                if (obj.hasOwnProperty(ii) && !cb.call($this, obj[ii], ii, obj))
                    return false;
        return true;
    }
    Util.every = every;
    function some(obj, cb, $this) {
        $this = $this || {};
        var ii;
        if (obj instanceof Array) {
            if (obj.some)
                return obj.some(cb, $this);
            for (ii = 0; ii < obj.length; ii++)
                if (cb.call($this, obj[ii], ii, obj))
                    return true;
        }
        else
            for (ii in obj)
                if (obj.hasOwnProperty(ii) && cb.call($this, obj[ii], ii, obj))
                    return true;
        return false;
    }
    Util.some = some;
    function indexOf(obj, item, offset) {
        if (offset === void 0) { offset = 0; }
        var ii;
        if (obj instanceof Array) {
            if (obj.indexOf)
                return obj.indexOf(item, offset);
            for (ii = offset; ii < obj.length; ii++)
                if (obj[ii] == item)
                    return ii;
        }
        else
            for (ii in obj)
                if (obj.hasOwnProperty(ii) && obj[ii] == item)
                    return ii;
        return -1;
    }
    Util.indexOf = indexOf;
    function clone(orig) {
        if ('object' != typeof orig)
            return orig;
        if (orig instanceof Array)
            return orig.slice(0);
        var dolly = {};
        Util.each(orig, function (value, key) {
            dolly[key] = clone(value);
        });
        return dolly;
    }
    Util.clone = clone;
})(Util || (Util = {}));
/**
 * 定义基于 Promise 的序列调度组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Q.ts
 */
/// <reference path="../include/tsd.d.ts" />
/// <reference path="_iterator.ts" />
var Util;
(function (Util) {
    if ('undefined' == typeof Promise)
        require('es6-promise').polyfill();
    var Q;
    (function (Q) {
        /**
         * 顺序遍历数组。
         */
        function every(array, iterator, $this) {
            $this = $this || array;
            var q;
            Util.each(array, function (element, index) {
                q = index ?
                    q.then(function () { return iterator.call($this, element, index, array); }) :
                    new Promise(function (resolve) {
                        resolve(iterator.call($this, element, index, array));
                    });
            });
            return q;
        }
        Q.every = every;
    })(Q = Util.Q || (Util.Q = {}));
})(Util || (Util = {}));
/**
 * 定义环境信息探测组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Env.ts
 */
/// <reference path="../include/tsd.d.ts" />
var Util;
(function (Util) {
    Util.ENV = {
        /**
         * 是否存在 Window 对象。
         */
        Window: 'undefined' !== typeof window,
        /**
         * 是否为 NodeJS 环境。
         */
        Node: {
            JS: !!('undefined' !== typeof process && process.version && process.arch),
            Webkit: false
        },
        /**
         * 屏幕信息。
         */
        Screen: {
            Width: 1920,
            Height: 1080
        },
        /**
         * 通信协议。
         */
        Protocol: 'http:',
        /**
         * 是否支持 Canvas 功能。
         */
        Canvas: false,
        /**
         * 是否为移动设备。
         */
        Mobile: false,
        /**
         * IE 浏览器。
         */
        MSIE: false
    };
    (function (env) {
        if (env.Node.JS)
            env.Node.Webkit = !!(('node-webkit' in process.versions) || ('atom-shell' in process.versions) || ('electron' in process.versions));
        var detect = function () {
            var ua = navigator.userAgent.toLowerCase(), pick = function (pattern) {
                var match = ua.match(pattern);
                return (match && 1 < match.length) ? match[1] : '';
            }, ios = pick(/(ipod|iphone|ipad)/), android = /android/.test(ua) && !/like android/.test(ua), tablet = /tablet/.test(ua), mobile = !tablet && /[^-]mobi/.test(ua), osver = 0, msie = false;
            if (android)
                osver = parseInt(pick(/android[ \/-](\d+(\.\d+)*)/), 10);
            if ('ipad' == ios || (android && (3 == osver || (4 == osver && !mobile))) || /silk/.test(ua)) {
                tablet = true;
            }
            else if ('ipod' == ios || 'iphone' == ios || android || /blackberry|\bbb\d+/.test(ua) || /rim\stablet/.test(ua) || /(web|hpw)os/.test(ua) || /bada/i.test(ua))
                mobile = true;
            if (/windows phone/.test(ua)) {
                if (!/edge\/(\d+(\.\d+)?)/.test(ua))
                    msie = true;
            }
            else if (/msie|trident/.test(ua))
                msie = true;
            return [tablet || mobile, msie];
        };
        if (env.Window) {
            if ('https:' == location.protocol)
                env.Protocol = 'https:';
            env.Canvas = 'CanvasRenderingContext2D' in window;
            var desult = detect(), doc = document.documentElement;
            env.Mobile = desult[0];
            env.MSIE = desult[1];
            // window.devicePixelRatio @?x
            env.Screen.Width = desult[0] ? doc.clientWidth : screen.width;
            env.Screen.Height = desult[0] ? doc.clientHeight : screen.height;
        }
    })(Util.ENV);
})(Util || (Util = {}));
/**
 * 声明成功回调函数接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      ISuccessCallback.ts
 */
/// <reference path="IHashTable.ts" />
/**
 * 声明失败回调函数接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      IFailureCallback.ts
 */
/**
 * 定义远端通信组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      Remote.ts
 */
/// <reference path="ENV.ts" />
/// <reference path="ISuccessCallback.ts" />
/// <reference path="IFailureCallback.ts" />
/// <reference path="_iterator.ts" />
var Util;
(function (Util) {
    var xdrs = [];
    var Remote;
    (function (Remote) {
        /**
         * 格式化。
         */
        function format(url) {
            return Util.ENV.Protocol + url.replace(/^.+\/\//, '//').replace(/\?.*$/, '');
        }
        Remote.format = format;
        /**
         * HTTP GET 远端数据。
         */
        function get(url, onSuccess, onFailure) {
            http(Method.GET, url, {}, onSuccess, onFailure);
        }
        Remote.get = get;
        /**
         * HTTP POST 远端数据。
         */
        function post(url, data, onSuccess, onFailure) {
            http(Method.POST, url, data, onSuccess, onFailure);
        }
        Remote.post = post;
        /**
         * HTTP 请求方法。
         */
        (function (Method) {
            Method[Method["GET"] = 0] = "GET";
            Method[Method["POST"] = 1] = "POST";
        })(Remote.Method || (Remote.Method = {}));
        var Method = Remote.Method;
        ;
        /**
         * HTTP 请求远端数据。
         */
        function http(method, url, data, onSuccess, onFailure) {
            var qs = [], xhr;
            if (Util.ENV.Node.JS) {
                xhr = require('./xhr').create();
            }
            else if ('undefined' != typeof XDomainRequest) {
                xhr = new XDomainRequest();
                xdrs.push(xhr);
            }
            else
                xhr = new XMLHttpRequest();
            xhr.onload = function () {
                try {
                    var resp = JSON.parse(xhr.responseText);
                    if ('reason' in resp)
                        throw new Error(resp['reason']);
                    if ('status' in xhr && 200 != xhr.status)
                        throw new Error(xhr.statusText);
                    onSuccess(resp);
                }
                catch (error) {
                    onFailure(error, xhr.status);
                }
            };
            xhr.onprogress = function () {
                //
            };
            xhr.onerror = function (event) {
                onFailure(event.error);
            };
            xhr.ontimeout = function () {
                onFailure(new Error('Timeout'));
            };
            xhr.open(Method.GET == method ? 'GET' : 'POST', format(url), true);
            Util.each(data, function (value, key) {
                qs.push(key + '=' + encodeURIComponent(value));
            });
            if (qs.length && 'setRequestHeader' in xhr)
                xhr['setRequestHeader']('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(qs.length ? qs.join('&') : null);
        }
        Remote.http = http;
    })(Remote = Util.Remote || (Util.Remote = {}));
})(Util || (Util = {}));
/**
 * 定义包主程序文件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      @module.ts
 */
/// <reference path="Q.ts" />
/// <reference path="Remote.ts" />
var Util;
(function (Util) {
    Util.version = '0.1.0';
})(Util || (Util = {}));
module.exports=Util;
//# sourceMappingURL=bigine.util.js.map