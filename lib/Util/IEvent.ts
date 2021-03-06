/**
 * 声明事件接口规范。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Util/IEvent.ts
 */

/// <reference path="IEventMetas.ts" />

namespace Util {
    export interface IEvent<T> {
        /**
         * 事件触发对象。
         */
        target: T;

        // constructor(metas: IEventMetas<T>): IEvent<T>;

        /**
         * 获取类型。
         */
        gT(): string;
    }
}
