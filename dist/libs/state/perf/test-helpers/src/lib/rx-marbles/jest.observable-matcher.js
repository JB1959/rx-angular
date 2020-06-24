"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observableMatcher_1 = require("./observableMatcher");
exports.jestMatcher = observableMatcher_1.observableMatcher(observableMatcher_1.defaultAssert, function (a, e) {
    return expect(a).toStrictEqual(e);
});
//# sourceMappingURL=jest.observable-matcher.js.map