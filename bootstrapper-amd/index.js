define(["require", "exports", "aurelia-dependency-injection"], function (require, exports, audi) {
    function run() {
        // alert("boot !! :)");
        var x = new audi.Singleton();
        alert("Promise exists: " + Promise !== undefined);
    }
    exports.run = run;
});
//# sourceMappingURL=index.js.map