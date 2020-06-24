(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./libs/state/perf/core/transformation-helpers/one-of.suite.ts":
/*!*********************************************************************!*\
  !*** ./libs/state/perf/core/transformation-helpers/one-of.suite.ts ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.oneOfSuite = {
    testSet: {
        'Array#includes': arrayIncludes,
        'Object#prop': objectProperty,
        expression: expression,
        'Array#includes2': arrayIncludes2,
        'Object#prop2': objectProperty2,
        expression2: expression2
    }
};
function arrayIncludes() {
    ['string', 'symbol', 'number'].includes(typeof 'test');
}
function objectProperty() {
    var obj = {
        string: true,
        symbol: true,
        number: true
    };
    obj[typeof 'test'];
}
function expression() {
     true ||
        false;
}
var arr = ['string', 'symbol', 'number'];
function arrayIncludes2() {
    arr.includes(typeof 'test');
}
var obj = {
    string: true,
    symbol: true,
    number: true
};
function objectProperty2() {
    obj[typeof 'test'];
}
var typeOf = typeof 'test';
function expression2() {
    typeOf === 'string' || typeOf === 'symbol' || typeOf === 'number';
}


/***/ }),

/***/ "./libs/state/perf/index.ts":
/*!**********************************!*\
  !*** ./libs/state/perf/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(/*! ./utils */ "./libs/state/perf/utils/index.ts");
var one_of_suite_1 = __webpack_require__(/*! ./core/transformation-helpers/one-of.suite */ "./libs/state/perf/core/transformation-helpers/one-of.suite.ts");
utils_1.runBenchmarkSuit(one_of_suite_1.oneOfSuite);


/***/ }),

/***/ "./libs/state/perf/utils/index.ts":
/*!****************************************!*\
  !*** ./libs/state/perf/utils/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var Benchmark = __webpack_require__(/*! benchmark */ "benchmark");
function runBenchmarkSuit(benchmarkSuite) {
    var suite = new Benchmark.Suite();
    var listeners = tslib_1.__assign({ cycle: function (event) {
            console.log(String(event.target));
        }, complete: function () {
            console.log('Fastest is ' + this.filter('fastest').map('name'));
        } }, (benchmarkSuite.listeners ? benchmarkSuite.listeners : {}));
    var options = tslib_1.__assign({ async: true }, (benchmarkSuite.options ? benchmarkSuite.options : {}));
    // Add tests
    Object.entries(benchmarkSuite.testSet).forEach(function (_a) {
        var _b = tslib_1.__read(_a, 2), name = _b[0], fn = _b[1];
        suite.add(name, fn);
    });
    // Add Listener
    Object.entries(listeners).forEach(function (_a) {
        var _b = tslib_1.__read(_a, 2), name = _b[0], fn = _b[1];
        suite.on(name, fn);
    });
    // Run with options
    suite.run(benchmarkSuite.options || {});
}
exports.runBenchmarkSuit = runBenchmarkSuit;


/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi ./libs/state/perf/index.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\micha\git\rx-angular\libs\state\perf\index.ts */"./libs/state/perf/index.ts");


/***/ }),

/***/ "benchmark":
/*!****************************!*\
  !*** external "benchmark" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("benchmark");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ })

/******/ })));
//# sourceMappingURL=main.js.map