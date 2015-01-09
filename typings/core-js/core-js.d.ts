declare module "core-js" {
}

interface PromiseCallback { (resolve: (param: any) => void, reject: (param: any) => void): void; }
declare class Promise {
    constructor(callback: PromiseCallback);
    then: (arg: any) => Promise;
}