﻿interface Creator<T> {
    new (...args): T;
}

declare module "aurelia-logging-console" {
    class ConsoleAppender { }
}

declare module "loader-amd" { }

declare module "aurelia-dependency-injection" {
    interface HandlerCallback {
        (container: Container): void;
    }

    class Container {
        get: <T>(key: any) => T;
        registerSingleton: <T>(key: any, fn?: Creator<T>) => void;
        registerTransient: <T>(key: any, fn?: Creator<T>) => void;
        registerInstance: (key: any, instance: any) => void;
        registerHandler: (key: any, callback: HandlerCallback) => void;
    }

    class Transient { }

    class Singleton { }
}

declare module "aurelia-router" {
    interface IRoute {
        // todo: update "route" to union type (string | Array<string>) when union types are mainstream
        route: any;
        moduleId: string;
        nav: boolean;
        title?: string;
    }

    interface IRouterConfig {
        title: string;
        map: (routeArray: Array<IRoute>) => void;
    }

    class Router {
        configure: (callback: (config: IRouterConfig) => void) => void;
    }
}


interface IPromise<T> {
    then: (callback: (response: T) => void) => void;
}

declare module "aurelia-http-client" {
    interface IJsonpContent {
        items: Array<Object>;
    }

    interface IJsonpResponse {
        content: IJsonpContent;
    }

    class HttpClient {
        jsonp: (url: string) => IPromise<IJsonpResponse>;
    }
}

declare module "aurelia-framework" {
    class Property {
        constructor(propertyName: string);
    }

    class Aurelia { }

    module LogManager {
        function getLogger(id: string): Logger;
        enum levels {
            none = 0,
            error = 1,
            warn = 2,
            info = 3,
            debug = 4
        }
        function setLevel(level: levels): void;
        function addAppender(appender: AuAppender): void;
    }

    class Logger { }

    interface AuAppender {}

    class ConsoleAppender implements AuAppender {}
}

declare module "aurelia-logging" {
    module LogManager {
        function getLogger(id: string): Logger;
        enum levels {
            none = 0,
            error = 1,
            warn = 2,
            info = 3,
            debug = 4
        }
        function setLevel(level: levels): void;
        function addAppender(appender: Appender): void;
    }

    interface Appender { }

    class ConsoleAppender implements Appender { }

    class Logger { }
}
