// loader-amd

import corejs = require("core-js");
import audi = require("aurelia-dependency-injection");

export class System {
    static normalize(moduleid: string): Promise<string> {
        var promise = new Promise<string>((resolve, reject) => {
            resolve(moduleid);
        });
        return promise;
    }
    static map: Object = {};
    static importModule(moduleId: string): Promise<any> {
        var promise = new Promise<string>((resolve, reject) => {
            // initiate load using require
            require([moduleId], (mod) => {
                // resolve or reject when load is complete
                resolve(mod);
            });
        });
        
        return promise;
    }
}

export class LoaderAmd {
    loadModule(moduleId: string): Promise<any> {
        return System.importModule(moduleId);
    }
}

