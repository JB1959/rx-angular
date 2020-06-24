"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var includes_1 = require("./core/includes");
var Benchmark = require("benchmark");
var suite = new Benchmark.Suite;
// add tests
Object.entries(includes_1.includesSuit)
    .forEach(function (_a) {
    var _b = tslib_1.__read(_a, 2), name = _b[0], fn = _b[1];
    suite.add(name, fn);
});
suite
    // add listeners
    .on('cycle', function (event) {
    console.log(String(event.target));
})
    .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
})
    // run async
    .run({ 'async': true });
//# sourceMappingURL=index.js.map