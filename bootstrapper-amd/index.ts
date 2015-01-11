// bootstrapper-amd

import corejs = require("core-js");
import audi = require("aurelia-dependency-injection");
import lamd = require("loader-amd");
import auf = require("aurelia-framework");
import aulc = require("aurelia-logging-console")

var logger = auf.LogManager.getLogger("bootstrapper");

function ready(global: Window) {
    return new Promise((resolve, reject) => {
        function completed() {
            global.document.removeEventListener("DOMContentLoaded", completed, false);
            global.removeEventListener("load", completed, false);
            resolve(global.document);
        }

        if (global.document.readyState === "complete") {
            resolve(global.document);
        } else {
            global.document.addEventListener("DOMContentLoaded", completed, false);
            global.addEventListener("load", completed, false);
        }
    });
}

function loadPolyfills() {
    return lamd.System.normalize('aurelia-bootstrapper')
        .then(bootstrapperName => lamd.System.normalize('aurelia-framework', bootstrapperName)
            .then(frameworkName => {
                lamd.System.map['aurelia-framework'] = frameworkName;

                return lamd.System.normalize('aurelia-loader', frameworkName).then(loaderName => {
                    var toLoad = [];

                    logger.debug('loading core-js');
                    toLoad.push(lamd.System.normalize('core-js', loaderName)
                        .then(name => lamd.System.importModule(name)));

                    toLoad.push(lamd.System.normalize('aurelia-depedency-injection', frameworkName)
                        .then(name => {
                            lamd.System.map['aurelia-depedency-injection'] = name;
                        }));

                    toLoad.push(lamd.System.normalize('aurelia-router', bootstrapperName)
                        .then(name => {
                            lamd.System.map['aurelia-router'] = name;
                        }));

                    toLoad.push(lamd.System.normalize('aurelia-logging-console', bootstrapperName)
                        .then(name => {
                            lamd.System.map['aurelia-logging-console'] = name;
                        }));

                    if (!('import' in document.createElement('link'))) {
                        logger.debug('loading the HTMLImports polyfill');
                        toLoad.push(lamd.System.normalize('webcomponentsjs/HTMLImports.min', loaderName)
                            .then(name => lamd.System.importModule(name)));
                    }

                    if (!("content" in document.createElement("template"))) {
                        logger.debug('loading the HTMLTemplateElement polyfill');
                        toLoad.push(lamd.System.normalize('aurelia-html-template-element', loaderName)
                            .then(name => lamd.System.importModule(name)));
                    }

                    return Promise.all(toLoad);
                });
            }));
}

function configureAurelia(aurelia) {
    return lamd.System.normalize('aurelia-bootstrapper')
        .then(bName => {
            var toLoad = [];

            toLoad.push(lamd.System.normalize('aurelia-templating-binding', bName)
                .then(templatingBinding => {
                    aurelia.plugins.installBindingLanguage = function () {
                        aurelia.plugins.install(templatingBinding);
                        return this;
                    };
                }));

            toLoad.push(lamd.System.normalize('aurelia-history-browser', bName)
                .then(historyBrowser => {
                    return lamd.System.normalize('aurelia-templating-router', bName)
                        .then(templatingRouter => {
                            aurelia.plugins.installRouter = function () {
                                aurelia.plugins.install(historyBrowser);
                                aurelia.plugins.install(templatingRouter);
                                return this;
                            };
                        });
                }));

            toLoad.push(lamd.System.normalize('aurelia-templating-resources', bName)
                .then(name => {
                    aurelia.plugins.installResources = function () {
                        aurelia.plugins.install(name);
                        return this;
                    }
                }));

            toLoad.push(lamd.System.normalize('aurelia-event-aggregator', bName).then(eventAggregator => {
                lamd.System.map['aurelia-event-aggregator'] = eventAggregator;
                aurelia.plugins.installEventAggregator = function () {
                    aurelia.plugins.install(eventAggregator);
                    return this;
                };
            }));

            return Promise.all(toLoad);
        });
}

function handleMain(mainHost) {
    var mainModuleId = mainHost.getAttribute('aurelia-main') || 'main',
        loader = new lamd.LoaderAmd();

    return loader.loadModule(mainModuleId)
        .then(m => {
            var aurelia = new auf.Aurelia(loader);
            return configureAurelia(aurelia).then(() => { return m.configure(aurelia); });
        }).catch(e => {
            setTimeout(() => { throw e; }, 0);
        });
}

function handleApp(appHost) {
    var appModuleId = appHost.getAttribute('aurelia-app') || 'app',
        loader = new lamd.LoaderAmd(),
        aurelia = new auf.Aurelia(loader);

    return configureAurelia(aurelia).then(() => {
        aurelia.plugins
            .installBindingLanguage()
            .installResources()
            .installRouter()
            .installEventAggregator();

        return aurelia.start()
            .then(a => {
                // alert("aurelia started: " + a.started);
                return a.setRoot(appModuleId, appHost);
            });
    }).catch(e => {
            setTimeout(() => { throw e; }, 0);
        });
}

function runningLocally() {
    return window.location.protocol !== 'http' &&
        window.location.protocol !== 'https';
}

function run() {
    return ready(window).then((doc: Document) => {
        var mainHost = doc.querySelectorAll("[aurelia-main]"),
            appHost = doc.querySelectorAll("[aurelia-app]"),
            i, ii;

        // alert("mainHost count: " + mainHost.length + "\r\nappHost count: " + appHost.length);

        if (appHost.length && !mainHost.length && runningLocally()) {
            auf.LogManager.addAppender(new aulc.ConsoleAppender());
            auf.LogManager.setLevel(auf.LogManager.levels.debug);
        }

        return loadPolyfills().then(() => {
            for (i = 0, ii = mainHost.length; i < ii; ++i) {
                handleMain(<HTMLElement>mainHost[i]);
            }

            for (i = 0, ii = appHost.length; i < ii; ++i) {
                handleApp(<HTMLElement>appHost[i]);
            }
        });
    });
}

run();
