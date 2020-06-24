"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var src_1 = require("../src");
var fixtures_1 = require("./fixtures");
var rxjs_1 = require("rxjs");
var select_1 = require("../src/lib/rxjs/operators/select");
var initialChildState = { str: 'initialChildState' };
var stateChecker = fixtures_1.createStateChecker(function (actual, expected) {
    if (typeof expected === 'object') {
        expect(actual).toEqual(expected);
    }
    else {
        expect(actual).toBe(expected);
    }
});
var RxStateInheritanceComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RxStateInheritanceComponent, _super);
    function RxStateInheritanceComponent() {
        var _this = _super.call(this) || this;
        _this.value$ = _this.select();
        return _this;
    }
    RxStateInheritanceComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'rx-angular-state-inheritance-test',
            template: "\n    <span>{{ value$ }}</span>\n  "
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], RxStateInheritanceComponent);
    return RxStateInheritanceComponent;
}(src_1.RxState));
exports.RxStateInheritanceComponent = RxStateInheritanceComponent;
var RxStateInjectionComponent = /** @class */ (function () {
    function RxStateInjectionComponent(state) {
        this.state = state;
        this.num$ = this.state.select();
    }
    RxStateInjectionComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'rx-angular-state-local-provider-test',
            template: "\n    <span>{{ (num$ | async) == null ? 'undefined' : (num$ | async) }}</span>\n  ",
            providers: [src_1.RxState]
        }),
        tslib_1.__metadata("design:paramtypes", [src_1.RxState])
    ], RxStateInjectionComponent);
    return RxStateInjectionComponent;
}());
exports.RxStateInjectionComponent = RxStateInjectionComponent;
var RxStateGlueComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RxStateGlueComponent, _super);
    function RxStateGlueComponent() {
        var _this = _super.call(this) || this;
        _this.str$ = _this.select('str');
        _this.strChange = _this.$.pipe(select_1.select('str'));
        _this.set(initialChildState);
        return _this;
    }
    Object.defineProperty(RxStateGlueComponent.prototype, "str", {
        set: function (str) {
            this.set({ str: str });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RxStateGlueComponent.prototype, "strO", {
        set: function (str$) {
            this.connect('str', str$);
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", String),
        tslib_1.__metadata("design:paramtypes", [String])
    ], RxStateGlueComponent.prototype, "str", null);
    tslib_1.__decorate([
        core_1.Input(),
        tslib_1.__metadata("design:type", rxjs_1.Observable),
        tslib_1.__metadata("design:paramtypes", [rxjs_1.Observable])
    ], RxStateGlueComponent.prototype, "strO", null);
    tslib_1.__decorate([
        core_1.Output(),
        tslib_1.__metadata("design:type", rxjs_1.Observable)
    ], RxStateGlueComponent.prototype, "strChange", void 0);
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
        _this.str$ = _this.select('str');
        _this.connect('str', _this.strChange$);
        return _this;
    }
    tslib_1.__decorate([
        core_1.ViewChild(RxStateGlueComponent),
        tslib_1.__metadata("design:type", RxStateGlueComponent)
    ], RxStateGlueContainerComponent.prototype, "child", void 0);
    RxStateGlueContainerComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'rx-angular-state-glue-container-test',
            template: "\n    <span id=\"parent\">{{\n      (str$ | async) == null ? 'undefined' : (str$ | async)\n      }}</span>\n    <rx-angular-state-glue-test\n      [str]=\"str$ | async\"\n      (strChange)=\"strChange$.next($event)\"\n    >\n    </rx-angular-state-glue-test>\n  "
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], RxStateGlueContainerComponent);
    return RxStateGlueContainerComponent;
}(src_1.RxState));
exports.RxStateGlueContainerComponent = RxStateGlueContainerComponent;
describe('LocalProviderTestComponent', function () {
    var component;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [RxStateInjectionComponent]
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(RxStateInjectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        stateChecker.checkSubscriptions(component.state, 1);
    });
});
describe('InheritanceTestComponent', function () {
    var component;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [RxStateInheritanceComponent]
        }).compileComponents();
        fixture = testing_1.TestBed.createComponent(RxStateInheritanceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        stateChecker.checkSubscriptions(component, 1);
        component.ngOnDestroy();
        stateChecker.checkSubscriptions(component, 0);
    });
});
//# sourceMappingURL=rx-state.component.spec.js.map