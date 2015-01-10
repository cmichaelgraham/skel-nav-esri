// loader-amd
define(["require", "exports"], function (require, exports) {
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
                    // resolve or reject when load is complete
                    resolve(mod);
                });
            });
            return promise;
        };
        System.map = {};
        return System;
    })();
    exports.System = System;
    var LoaderAmd = (function () {
        function LoaderAmd() {
        }
        LoaderAmd.prototype.loadModule = function (moduleId) {
            return System.importModule(moduleId);
        };
        return LoaderAmd;
    })();
    exports.LoaderAmd = LoaderAmd;
});
//# sourceMappingURL=index.js.map