"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../../src/lib/core/utils");
var operators_1 = require("rxjs/operators");
describe('pipeFromArray', function () {
    it('should return true for arrays of function', function () {
        expect(typeof utils_1.pipeFromArray(undefined) === 'function').toBeTruthy();
        expect(typeof utils_1.pipeFromArray([]) === 'function').toBeTruthy();
        expect(typeof utils_1.pipeFromArray([operators_1.map(function () { })]) === 'function').toBeTruthy();
        expect(typeof utils_1.pipeFromArray([operators_1.map(function () { }), function () { }]) === 'function').toBeTruthy();
    });
});
//# sourceMappingURL=pipe-from-array.spec.js.map