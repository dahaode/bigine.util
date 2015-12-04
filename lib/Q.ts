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

namespace Util {
    if ('undefined' == typeof Promise)
        require('es6-promise').polyfill();

    export namespace Q {
        /**
         * 顺序遍历数组。
         */
        export function every<T, U>(array: T[], iterator: Util.IArrayIterator<T, U | Thenable<U>>, $this?: any): Promise<U> {
            $this = $this || array;
            var q: Promise<U>;
            each(array, (element: T, index: number) => {
                q = index ?
                    q.then<U>(() => iterator.call($this, element, index, array)) :
                    new Promise<U>((resolve: (value?: U | Thenable<U>) => void) => {
                        resolve(iterator.call($this, element, index, array));
                    });
            });
            return q;
        }
    }
}
