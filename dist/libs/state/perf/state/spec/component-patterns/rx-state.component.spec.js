"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var src_1 = require("../../src");
var fixtures_1 = require("../fixtures");
var rxjs_1 = require("rxjs");
var select_1 = require("../../src/lib/rxjs/operators/select");
var initialParentState = tslib_1.__assign(tslib_1.__assign({}, fixtures_1.initialPrimitiveState), { str: 'initialParent' });
var initialChildState = { str: 'initialChildState' };
var RxStateGlueComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RxStateGlueComponent, _super);
    function RxStateGlueComponent() {
        var _this = _super.call(this) || this;
        _this.afterViewInit = false;
        _this.str$ = _this.select('str');
        _this.strChange = _this.$.pipe(select_1.select('str'));
        _this.strChangeWrong = _this.select('str');
        _this.set(initialChildState);
        return _this;
    }
    Object.defineProperty(RxStateGlueComponent.prototype, "str", {
        set: function (str) {
            if (str !== null && str !== '') {
                this.set({ str: str });
            }
        },
        enumerable: true,
        configurable: true
    });
    RxStateGlueComponent.prototype.ngAfterViewInit = function () {
        this.afterViewInit = true;
    };
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], RxStateGlueComponent.prototype, "str", null);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", rxjs_1.Observable)
    ], RxStateGlueComponent.prototype, "strChange", void 0);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", rxjs_1.Observable)
    ], RxStateGlueComponent.prototype, "strChangeWrong", void 0);
    RxStateGlueComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'rx-angular-state-glue-test',
            template: "\n    <span id=\"child\">{{\n      (str$ | async) == null ? 'undefined' : (str$ | async)\n      }}</span>\n  "
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], RxStateGlueComponent);
    return RxStateGlueComponent;
}(src_1.RxState));
exports.RxStateGlueComponent = RxStateGlueComponent;
var RxStateGlueContainerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RxStateGlueContainerComponent, _super);
    function RxStateGlueContainerComponent() {
        var _this = _super.call(this) || this;
        _this.strChange$ = new rxjs_1.Subject();
        _this.strChangeWrong$ = new rxjs_1.Subject();
        _this.str$ = _this.select('str');
        _this.afterViewInit = false;
        _this.connect('str', _this.strChange$);
        _this.connect('strWrong', _this.strChangeWrong$);
        return _this;
    }
    RxStateGlueContainerComponent.prototype.ngAfterViewInit = function () {
        this.afterViewInit = true;
    };
    tslib_1.__decorate([
        core_1.ViewChild(RxStateGlueComponent),
        tslib_1.__metadata("design:type", RxStateGlueComponent)
    ], RxStateGlueContainerComponent.prototype, "child", void 0);
    RxStateGlueContainerComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'rx-angular-state-glue-container-test',
            template: "\n    <span id=\"parent\">{{\n      (str$ | async) == null ? 'undefined' : (str$ | async)\n      }}</span>\n    <rx-angular-state-glue-test\n      [str]=\"str$ | async\"\n      (strChange)=\"strChange$.next($event)\"\n      (strChangeWrong)=\"strChangeWrong$.next($event)\"\n    >\n    </rx-angular-state-glue-test>\n  "
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], RxStateGlueContainerComponent);
    return RxStateGlueContainerComponent;
}(src_1.RxState));
exports.RxStateGlueContainerComponent = RxStateGlueContainerComponent;
describe('GlueTestComponent', function () {
    var parent;
    var parentFixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [RxStateGlueComponent, RxStateGlueContainerComponent]
        }).compileComponents();
        parentFixture = testing_1.TestBed.createComponent(RxStateGlueContainerComponent);
        parentFixture.detectChanges();
        parent = parentFixture.componentInstance;
    });
    it('should render values in parent initial', function () {
        var _a;
        parent.set(fixtures_1.initialPrimitiveState);
        expect((_a = parent.get()) === null || _a === void 0 ? void 0 : _a.str).toBe(fixtures_1.initialPrimitiveState.str);
    });
    it('should render values changes in parent', function () {
        var _a, _b;
        parent.set(fixtures_1.initialPrimitiveState);
        expect((_a = parent.get()) === null || _a === void 0 ? void 0 : _a.str).toBe(fixtures_1.initialPrimitiveState.str);
        parent.set({ str: 'changeInParent' });
        // @TODO use state checker
        expect((_b = parent.get()) === null || _b === void 0 ? void 0 : _b.str).toBe('changeInParent');
    });
    it('should render values in child initial', function () {
        var _a;
        parent.set(fixtures_1.initialPrimitiveState);
        parentFixture.detectChanges();
        expect((_a = parent.child.get()) === null || _a === void 0 ? void 0 : _a.str).toBe(fixtures_1.initialPrimitiveState.str);
    });
    it('should pass values from parent to child', function () {
        var _a, _b;
        parent.set(fixtures_1.initialPrimitiveState);
        parentFixture.detectChanges();
        expect((_a = parent.child.get()) === null || _a === void 0 ? void 0 : _a.str).toBe(fixtures_1.initialPrimitiveState.str);
        parent.set({ str: 'newParent' });
        parentFixture.detectChanges();
        expect((_b = parent.child.get()) === null || _b === void 0 ? void 0 : _b.str).toBe('newParent');
    });
    it('should work with output initialisation', function () {
        expect(parent.afterViewInit).toBeTruthy();
        expect(parent.child.afterViewInit).toBeTruthy();
        expect(parent.get().str).toBe(undefined);
        expect(parent.child.get().str).toBe(initialChildState.str);
        var value1FromParent = 'value1FromParent';
        parent.set({ str: value1FromParent });
        expect(parent.get().str).toBe(value1FromParent);
        expect(parent.child.get().str).toBe(initialChildState.str);
        parentFixture.detectChanges();
        expect(parent.get().str).toBe(value1FromParent);
        expect(parent.child.get().str).toBe(value1FromParent);
    });
    it('should work wrong output initialisation', function () {
        expect(parent.afterViewInit).toBeTruthy();
        expect(parent.child.afterViewInit).toBeTruthy();
        expect(parent.get().str).toBe(undefined);
        expect(parent.get().strWrong).toBe(initialChildState.str);
        expect(parent.child.get().str).toBe(initialChildState.str);
    });
});
//# sourceMappingURL=rx-state.component.spec.js.map