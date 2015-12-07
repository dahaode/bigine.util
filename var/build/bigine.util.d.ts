/// <reference path="../../include/tsd.d.ts" />
/// <reference path="../../include/XDomainRequest.d.ts" />
declare namespace __Bigine_Util {
    interface IArrayIterator<T, U> {
        (element: T, index?: number, array?: T[]): U;
    }
    interface IHashTable<T> {
        [index: string]: T;
    }
    interface IObjectIterator<T, U> {
        (element: T, index?: string, object?: IHashTable<T>): U;
    }
    function each<T>(array: T[], iterator: IArrayIterator<T, any>, thisArg?: any): void;
    function each<T>(object: IHashTable<T>, iterator: IObjectIterator<T, any>, thisArg?: any): void;
    function every<T>(array: T[], iterator: IArrayIterator<T, boolean>, thisArg?: any): boolean;
    function every<T>(object: IHashTable<T>, iterator: IObjectIterator<T, boolean>, thisArg?: any): boolean;
    function some<T>(array: T[], iterator: IArrayIterator<T, boolean>, thisArg?: any): boolean;
    function some<T>(object: IHashTable<T>, iterator: IObjectIterator<T, boolean>, thisArg?: any): boolean;
    function indexOf<T>(array: T[], element: T, offset?: number): number;
    function indexOf<T>(object: IHashTable<T>, element: T): string | number;
    function clone<T>(orig: T[]): T[];
    function clone<T>(orig: T): T;
    namespace Q {
        function every<T, U>(array: T[], iterator: IArrayIterator<T, U | Thenable<U>>, $this?: any): Promise<U>;
    }
    interface IEnvType {
        Window: boolean;
        Node: {
            JS: boolean;
            Webkit: boolean;
        };
        Screen: {
            Width: number;
            Height: number;
        };
        Protocol: string;
        Canvas: boolean;
        Mobile: boolean;
        MSIE: boolean;
    }
    var ENV: IEnvType;
    interface ISuccessCallback<T> {
        (data: IHashTable<T>): void;
    }
    interface IFailureCallback {
        (error: Error, status?: number): void;
    }
    namespace Remote {
        function format(url: string): string;
        function get<T>(url: string, onSuccess: ISuccessCallback<T>, onFailure: IFailureCallback): void;
        function post<T>(url: string, data: IHashTable<number | string>, onSuccess: ISuccessCallback<T>, onFailure: IFailureCallback): void;
        enum Method {
            GET = 0,
            POST = 1,
        }
        function http<T>(method: Method, url: string, data: IHashTable<number | string>, onSuccess: ISuccessCallback<T>, onFailure: IFailureCallback): void;
    }
    interface ILogger {
        d(...parts: any[]): void;
        i(...parts: any[]): void;
        w(...parts: any[]): void;
        e(...parts: any[]): void;
        o(title: string): void;
        c(title: string): void;
        l(level: ILogger.Level): ILogger;
    }
    namespace ILogger {
        enum Level {
            Debug = 0,
            Info = 1,
            Warn = 2,
            Error = 3,
        }
    }
    class ConsoleLogger implements ILogger {
        private _l;
        private _c;
        static singleton(): ConsoleLogger;
        constructor();
        d(...parts: any[]): void;
        i(...parts: any[]): void;
        w(...parts: any[]): void;
        e(...parts: any[]): void;
        o(title: string): void;
        c(title: string): void;
        l(level: ILogger.Level): ConsoleLogger;
        private p(method, contents);
    }
    var version: string;
}

declare module "bigine.util" {
    export = __Bigine_Util;
}
