import audi = require("aurelia-dependency-injection");

export function run() {
    // alert("boot !! :)");
    var x = new audi.Singleton();
    alert("audi: " + JSON.stringify(x));
}