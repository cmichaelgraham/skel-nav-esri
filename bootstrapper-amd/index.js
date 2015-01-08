define(["require", "exports", "aurelia-dependency-injection"], function (require, exports, audi) {
    function run() {
        // alert("boot !! :)");
        var x = new audi.Singleton();
        alert("audi: " + JSON.stringify(x));
    }
    exports.run = run;
});
//# sourceMappingURL=index.js.map