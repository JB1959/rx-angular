import { ChangeDetectorRef, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { createRenderAware } from '../core';
import { DEFAULT_STRATEGY_NAME, getStrategies } from '../render-strategies/strategies/strategies-map';
import * as i0 from "@angular/core";
/**
 * @Directive LetDirective
 *
 * @description
 *
 * The `*rxLet` directive serves a convenient way of binding observables to a view context (a dom element scope).
 * It also helps with several internal processing under the hood.
 *
 * The current way of binding an observable to the view looks like that:
 * ```html
 * <ng-container *ngIf="observableNumber$ as n">
 * <app-number [number]="n">
 * </app-number>
 * <app-number-special [number]="n">
 * </app-number-special>
 * </ng-container>
 *  ```
 *
 *  The problem is `*ngIf` is also interfering with rendering and in case of a `0` the component would be hidden
 *
 * Included Features:
 * - binding is always present. (`*ngIf="truthy$"`)
 * - it takes away the multiple usages of the `async` or `push` pipe
 * - a unified/structured way of handling null and undefined
 * - triggers change-detection differently if `zone.js` is present or not (`ChangeDetectorRef.detectChanges` or
 *   `ChangeDetectorRef.markForCheck`)
 * - triggers change-detection differently if ViewEngine or Ivy is present (`ChangeDetectorRef.detectChanges` or
 *   `ɵdetectChanges`)
 * - distinct same values in a row (distinctUntilChanged operator),
 *
 * @usageNotes
 *
 * The `*rxLet` directive take over several things and makes it more convenient and save to work with streams in the
 *   template
 * `<ng-container *rxLet="observableNumber$ as c"></ng-container>`
 *
 * ```html
 * <ng-container *rxLet="observableNumber$ as n">
 * <app-number [number]="n">
 * </app-number>
 * </ng-container>
 *
 * <ng-container *rxLet="observableNumber$; let n">
 * <app-number [number]="n">
 * </app-number>
 * </ng-container>
 * ```
 *
 * In addition to that it provides us information from the whole observable context.
 * We can track the observables:
 * - next value
 * - error value
 * - complete base-state
 *
 * ```html
 * <ng-container *rxLet="observableNumber$; let n; let e = $error, let c = $complete">
 * <app-number [number]="n"  *ngIf="!e && !c">
 * </app-number>
 * <ng-container *ngIf="e">
 * There is an error: {{e}}
 * </ng-container>
 * <ng-container *ngIf="c">
 * Observable completed: {{c}}
 * </ng-container>
 * </ng-container>
 * ```
 *
 * @publicApi
 */
var LetDirective = /** @class */ (function () {
    function LetDirective(cdRef, templateRef, viewContainerRef) {
        var _this = this;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.ViewContext = {
            $implicit: undefined,
            rxLet: undefined,
            $error: false,
            $complete: false
        };
        this.resetObserver = {
            next: function () {
                // if not initialized no need to set undefined
                if (_this.embeddedView) {
                    _this.ViewContext.$implicit = undefined;
                    _this.ViewContext.rxLet = undefined;
                    _this.ViewContext.$error = false;
                    _this.ViewContext.$complete = false;
                }
            }
        };
        this.updateObserver = {
            next: function (value) {
                // to have initial rendering lazy
                if (!_this.embeddedView) {
                    _this.createEmbeddedView();
                }
                _this.ViewContext.$implicit = value;
                _this.ViewContext.rxLet = value;
            },
            error: function (error) {
                // to have initial rendering lazy
                if (!_this.embeddedView) {
                    _this.createEmbeddedView();
                }
                _this.ViewContext.$error = true;
            },
            complete: function () {
                // to have initial rendering lazy
                if (!_this.embeddedView) {
                    _this.createEmbeddedView();
                }
                _this.ViewContext.$complete = true;
            }
        };
        this.strategies = getStrategies({ cdRef: cdRef });
        this.renderAware = createRenderAware({
            strategies: this.strategies,
            resetObserver: this.resetObserver,
            updateObserver: this.updateObserver
        });
        this.renderAware.nextStrategy(DEFAULT_STRATEGY_NAME);
    }
    Object.defineProperty(LetDirective.prototype, "rxLet", {
        set: function (potentialObservable) {
            this.renderAware.nextPotentialObservable(potentialObservable);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LetDirective.prototype, "strategy", {
        set: function (strategy) {
            this.renderAware.nextStrategy(strategy || DEFAULT_STRATEGY_NAME);
        },
        enumerable: true,
        configurable: true
    });
    LetDirective.ngTemplateContextGuard = function (dir, ctx) {
        return true;
    };
    LetDirective.prototype.ngOnInit = function () {
        this.subscription = this.renderAware.subscribe();
    };
    LetDirective.prototype.createEmbeddedView = function () {
        this.embeddedView = this.viewContainerRef.createEmbeddedView(this.templateRef, this.ViewContext);
    };
    LetDirective.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
        this.viewContainerRef.clear();
    };
    LetDirective.ɵfac = function LetDirective_Factory(t) { return new (t || LetDirective)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.TemplateRef), i0.ɵɵdirectiveInject(i0.ViewContainerRef)); };
    LetDirective.ɵdir = i0.ɵɵdefineDirective({ type: LetDirective, selectors: [["", "rxLet", ""]], inputs: { rxLet: "rxLet", strategy: ["rxLetStrategy", "strategy"] } });
    return LetDirective;
}());
export { LetDirective };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LetDirective, [{
        type: Directive,
        args: [{ selector: '[rxLet]' }]
    }], function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.TemplateRef }, { type: i0.ViewContainerRef }]; }, { rxLet: [{
            type: Input
        }], strategy: [{
            type: Input,
            args: ['rxLetStrategy']
        }] }); })();
//# sourceMappingURL=let.directive.js.map