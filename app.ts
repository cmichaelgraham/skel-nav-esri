import auf = require("aurelia-framework");

alert("hello from app :)");

export function configure(aurelia: auf.Aurelia) {
    alert("hello from app.configure :)");
}



//$(document).ready(() =>
//{
//    require(["esri/map", "dojo/domReady!"], function (Map) {
//    var map = new Map("map", {
//        center: [-118, 34.5],
//        zoom: 8,
//        basemap: "topo"
//    });
//})});