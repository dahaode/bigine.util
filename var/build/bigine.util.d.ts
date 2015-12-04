/// <reference path="../../include/tsd.d.ts" />
declare namespace Util {
    interface IArrayIterator<T, U> {
        (element: T, index?: number, array?: T[]): U;
    }
}
declare namespace Util {
    interface IHashTable<T> {
        [index: string]: T;
    }
}
declare namespace Util {
    interface IObjectIterator<T, U> {
        (element: T, index?: string, object?: IHashTable<T>): U;
    }
}
declare namespace Util {
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
}
declare namespace Util {
    namespace Q {
        function every<T, U>(array: T[], iterator: Util.IArrayIterator<T, U | Thenable<U>>, $this?: any): Promise<U>;
    }
}
declare namespace Util {
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
}
declare namespace Util {
    interface ISuccessCallback<T> {
        (data: IHashTable<T>): void;
    }
}
declare namespace Util {
    interface IFailureCallback {
        (error: Error, status?: number): void;
    }
}
declare var XDomainRequest: typeof XMLHttpRequest;
declare namespace Util {
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
}
declare namespace Util {
    var version: string;
}
declare module "bigine.util" {
    export = Util;
}
