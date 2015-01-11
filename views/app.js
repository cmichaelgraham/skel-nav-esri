define(["require", "exports", "aurelia-router"], function (require, exports, aur) {
    var App = (function () {
        function App(router) {
            this.router = router;
            this.router.configure(function (config) {
                config.title = "Aurelia VS/TS";
                config.map([
                    { route: ["", "views/welcome"], moduleId: "views/welcome", nav: true, title: "Welcome to VS/TS" },
                    { route: "views/flickr", moduleId: "views/flickr", nav: true },
                    { route: "views/esri-map", moduleId: "views/esri-map", nav: true },
                    { route: "views/child-router", moduleId: "views/child-router", nav: true, title: "Child Router" }
                ]);
            });
        }
        App.inject = [aur.Router];
        return App;
    })();
    exports.App = App;
});
//# sourceMappingURL=app.js.map