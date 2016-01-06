/**
 * 定义控制台日志记录器组件。
 *
 * @author    郑煜宇 <yzheng@atfacg.com>
 * @copyright © 2016 Dahao.de
 * @license   GPL-3.0
 * @file      Util/ConsoleLogger.ts
 */

/// <reference path="ILogger.ts" />

namespace Util {
    /**
     * 实例。
     */
    var instance: ConsoleLogger;

    export class ConsoleLogger implements ILogger {
        /**
         * 日志级别。
         */
        private _l: ILogger.Level;

        /**
         * 控制台。
         */
        private _c: Console;

        /**
         * 获取实例。
         */
        public static singleton(): ConsoleLogger {
            if (!instance)
                instance = new ConsoleLogger();
            return instance;
        }

        /**
         * 构造函数。
         */
        constructor() {
            this._l = ILogger.Level.Error;
            this._c = 'undefined' != typeof console ?
                console :
                undefined;
        }

        /**
         * 调试。
         */
        public d(...parts: any[]): void {
            if (this._l > ILogger.Level.Debug || !this._c) return;
            this.p(this._c.debug || this._c.log, parts);
        }

        /**
         * 信息。
         */
        public i(...parts: any[]): void {
            if (this._l > ILogger.Level.Info || !this._c) return;
            this.p(this._c.info || this._c.log, parts);
        }

        /**
         * 警告。
         */
        public w(...parts: any[]): void {
            if (this._l > ILogger.Level.Warn || !this._c) return;
            this.p(this._c.warn || this._c.log, parts);
        }

        /**
         * 错误。
         */
        public e(...parts: any[]): void {
            if (this._c)
                this.p(this._c.error, 1 < parts.length ? parts : [parts[0]['stack'] || parts[0]]);
        }

        /**
         * 分组。
         */
        public o(title: string): void {
            if (ILogger.Level.Debug == this._l && this._c)
                this.p(this._c.group, [title]);
        }

        /**
         * 分组结束。
         */
        public c(title: string): void {
            if (ILogger.Level.Debug == this._l && this._c)
                this.p(this._c.groupEnd, [title]);
        }

        /**
         * 设置日志等级。
         */
        public l(level: ILogger.Level): ConsoleLogger {
            this._l = level;
            return this;
        }

        /**
         * 打印。
         */
        private p(method: typeof console.log, contents: any[]): void {
            if (!method) return;
            if ('apply' in method)
                return method.apply(this._c, contents);
            method(contents.join(' '));
        }
    }
}
