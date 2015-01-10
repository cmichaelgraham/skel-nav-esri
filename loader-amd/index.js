define(["require", "exports"], function (require, exports) {
    var System = (function () {
        function System() {
        }
        System.prototype.normalize = function (moduleid) {
            var promise = new Promise(function (resolve, reject) {
                resolve(moduleid);
            });
            return promise;
        };
        return System;
    })();
    exports.System = System;
});
//# sourceMappingURL=index.js.map