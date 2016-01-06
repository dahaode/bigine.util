/**
 * 声明事件元信息接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Util/IEventMetas.ts
 */

/// <reference path="IHashTable.ts" />

namespace Util {
    export interface IEventMetas<T> extends IHashTable<any> {
        /**
         * 触发对象。
         */
        target: T;
    }
}
