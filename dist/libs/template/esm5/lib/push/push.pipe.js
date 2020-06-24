import { ChangeDetectorRef, Pipe } from '@angular/core';
import { createRenderAware } from '../core';
import { getStrategies } from '../render-strategies';
import { DEFAULT_STRATEGY_NAME } from '../render-strategies/strategies/strategies-map';
import * as i0 from "@angular/core";
/**
 * @Pipe PushPipe
 *
 * @description
 *
 * The `push` pipe serves as a drop-in replacement for the `async` pipe.
 * It contains intelligent handling of change detection to enable us
 * running in zone-full as well as zone-less mode without any changes to the code.
 *
 * The current way of binding an observable to the view looks like that:
 *  ```html
 *  {{observable$ | async}}
 * <ng-container *ngIf="observable$ | async as o">{{o}}</ng-container>
 * <component [value]="observable$ | async"></component>
 * ```
 *
 * The problem is `async` pipe just marks the component and all its ancestors as dirty.
 * It needs zone.js microtask queue to exhaust until `ApplicationRef.tick` is called to render all dirty marked
 *     components.
 *
 * Heavy dynamic and interactive UIs suffer from zones change detection a lot and can
 * lean to bad performance or even unusable applications, but the `async` pipe does not work in zone-less mode.
 *
 * `push` pipe solves that problem.
 *
 * Included Features:
 *  - Take observables or promises, retrieve their values and render the value to the template
 *  - Handling null and undefined values in a clean unified/structured way
 *  - Triggers change-detection differently if `zone.js` is present or not (`detectChanges` or `markForCheck`)
 *  - Distinct same values in a row to increase performance
 *  - Coalescing of change detection calls to boost performance
 *
 * @usageNotes
 *
 * `push` pipe solves that problem. It can be used like shown here:
 * ```html
 * {{observable$ | push}}
 * <ng-container *ngIf="observable$ | push as o">{{o}}</ng-container>
 * <component [value]="observable$ | push"></component>
 * ```
 *
 * @publicApi
 */
var PushPipe = /** @class */ (function () {
    function PushPipe(cdRef) {
        var _this = this;
        this.resetObserver = {
            next: function () {
                _this.renderedValue = undefined;
            }
        };
        this.updateObserver = {
            next: function (value) { return (_this.renderedValue = value); }
        };
        this.RenderAware = createRenderAware({
            strategies: getStrategies({ cdRef: cdRef }),
            updateObserver: this.updateObserver,
            resetObserver: this.resetObserver
        });
        this.subscription = this.RenderAware.subscribe();
    }
    PushPipe.prototype.transform = function (potentialObservable, config) {
        var strategy = config || DEFAULT_STRATEGY_NAME;
        this.RenderAware.nextStrategy(strategy);
        this.RenderAware.nextPotentialObservable(potentialObservable);
        return this.renderedValue;
    };
    PushPipe.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    PushPipe.ɵfac = function PushPipe_Factory(t) { return new (t || PushPipe)(i0.ɵɵinjectPipeChangeDetectorRef()); };
    PushPipe.ɵpipe = i0.ɵɵdefinePipe({ name: "push", type: PushPipe, pure: false });
    return PushPipe;
}());
export { PushPipe };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PushPipe, [{
        type: Pipe,
        args: [{ name: 'push', pure: false }]
    }], function () { return [{ type: i0.ChangeDetectorRef }]; }, null); })();
//# sourceMappingURL=push.pipe.js.map