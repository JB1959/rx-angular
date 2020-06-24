"use strict";
// tslint:disable
Object.defineProperty(exports, "__esModule", { value: true });
exports.includesSuit = {
    'RegExp#test': regExp,
    'String#indexOf': indexOf,
    'String#match': match
};
function regExp() {
    /o/.test('Hello World!');
}
function indexOf() {
    'Hello World!'.indexOf('o') > -1;
}
function match() {
    !!'Hello World!'.match(/o/);
}
//# sourceMappingURL=includes.js.map