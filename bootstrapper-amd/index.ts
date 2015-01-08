import corejs = require("core-js");
import audi = require("aurelia-dependency-injection");

export function run() {
    // alert("boot !! :)");
    var x = new audi.Singleton();
    alert("Promise exists: " + Promise !== undefined);
}