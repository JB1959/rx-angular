"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rx_state_service_1 = require("./rx-state.service");
exports.RxState = rx_state_service_1.RxState;
var operators_1 = require("./rxjs/operators");
exports.select = operators_1.select;
exports.stateful = operators_1.stateful;
exports.distinctUntilSomeChanged = operators_1.distinctUntilSomeChanged;
exports.selectSlice = operators_1.selectSlice;
//# sourceMappingURL=index.js.map