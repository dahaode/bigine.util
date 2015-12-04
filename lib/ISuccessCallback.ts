/**
 * 声明成功回调函数接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      ISuccessCallback.ts
 */

/// <reference path="IHashTable.ts" />

namespace Util {
    export interface ISuccessCallback<T> {
        (data: IHashTable<T>): void;
    }
}