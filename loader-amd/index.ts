// loader-amd

import corejs = require("core-js");
import audi = require("aurelia-dependency-injection");
import aum = require("aurelia-metadata");
import aul = require("aurelia-loader");

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
                // update Origin using loaded 'mod'
                var exportedValue;

                for (var key in mod) {
                    if (mod.hasOwnProperty(key)) {
                        exportedValue = mod[key];

                        if (typeof exportedValue === "function") {
                            // example requirejs implementation called aum.normalize here
                            aum.Origin.set(exportedValue, new aum.Origin(moduleId, key));
                        }
                    }
                }

                // resolve or reject when load is complete
                resolve(mod);
            });
        });
        
        return promise;
    }

    static importAllModules(moduleIds: Array<string>): Promise<any> {
        var modulePromises = new Array<Promise<any>>();
        moduleIds.forEach(moduleId => {
            modulePromises.push(this.importModule(moduleId));
        });
        return Promise.all<any>(modulePromises);
    }
}

export class LoaderAmd extends aul.Loader {
    static createDefaultLoader(): aul.Loader {
        return new LoaderAmd();
    }

    loadModule(moduleId: string): Promise<any> {
        return System.importModule(moduleId);
    }

    loadAllModules(moduleIds: Array<string>): Promise<any> {
        return System.importAllModules(moduleIds);
    }

    loadTemplate(url: string): Promise<any> {
        return this.importTemplate(url);
    }
}

