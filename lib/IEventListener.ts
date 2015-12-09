/**
 * 声明事件监听函数接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2015 Dahao.de
 * @license   GPL-3.0
 * @file      IEventListener.ts
 */

/// <reference path="IEvent.ts" />

namespace Util {
    export interface IEventListener<T> {
        (event: IEvent<T>): void;
    }
}
