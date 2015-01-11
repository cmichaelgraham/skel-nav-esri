// loader-amd
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "aurelia-metadata", "aurelia-loader"], function (require, exports, aum, aul) {
    var System = (function () {
        function System() {
        }
        System.normalize = function (moduleid) {
            var promise = new Promise(function (resolve, reject) {
                resolve(moduleid);
            });
            return promise;
        };
        System.importModule = function (moduleId) {
            var promise = new Promise(function (resolve, reject) {
                // initiate load using require
                require([moduleId], function (mod) {
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
        };
        System.importAllModules = function (moduleIds) {
            var _this = this;
            var modulePromises = new Array();
            moduleIds.forEach(function (moduleId) {
                modulePromises.push(_this.importModule(moduleId));
            });
            return Promise.all(modulePromises);
        };
        System.map = {};
        return System;
    })();
    exports.System = System;
    var LoaderAmd = (function (_super) {
        __extends(LoaderAmd, _super);
        function LoaderAmd() {
            _super.apply(this, arguments);
        }
        LoaderAmd.createDefaultLoader = function () {
            return new LoaderAmd();
        };
        LoaderAmd.prototype.loadModule = function (moduleId) {
            return System.importModule(moduleId);
        };
        LoaderAmd.prototype.loadAllModules = function (moduleIds) {
            return System.importAllModules(moduleIds);
        };
        LoaderAmd.prototype.loadTemplate = function (url) {
            return this.importTemplate(url);
        };
        return LoaderAmd;
    })(aul.Loader);
    exports.LoaderAmd = LoaderAmd;
});
//# sourceMappingURL=index.js.map