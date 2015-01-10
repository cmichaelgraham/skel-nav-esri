import corejs = require("core-js");
import audi = require("aurelia-dependency-injection");

export class System {
    normalize(moduleid: string): Promise<string> {
        var promise = new Promise<string>((resolve, reject) => {
            resolve(moduleid);
        });
        return promise;
    }
}
