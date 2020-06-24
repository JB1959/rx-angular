"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
function mutationManagerFactory(obj, props) {
    var originals = Object.entries(props).reduce(function (originalObj, _a) {
        var _b;
        var _c = tslib_1.__read(_a, 2), prop = _c[0], defaultValue = _c[1];
        return tslib_1.__assign(tslib_1.__assign({}, originalObj), (_b = {}, _b[prop] = obj.hasOwnProperty(prop) ? obj[prop] : defaultValue, _b));
    }, {});
    return {
        restore: function () {
            Object.entries(originals).forEach(function (_a) {
                var _b = tslib_1.__read(_a, 2), prop = _b[0], value = _b[1];
                obj[prop] = value;
            });
        },
        set: function (prop, value) {
            obj[prop] = value;
        }
    };
}
exports.mutationManagerFactory = mutationManagerFactory;
//# sourceMappingURL=mutation-manager.js.map