import { Directive, ElementRef, Input } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { zonePatchedEvents } from './unpatch-event-list';
import { unpatchEventListener } from '../../core/utils/make-zone-less';
import * as i0 from "@angular/core";
/**
 * @Directive UnpatchEventsDirective
 *
 * @description
 *
 * The `unpatch` directive helps in partially migrating to zone-less apps as well as getting rid
 * of unnecessary renderings through zones `addEventListener` patches.
 * It can be used on any element you apply event bindings.
 *
 * The current way of binding events to the DOM is to use output bindings:
 *  ```html
 * <button (click)="doStuff($event)">click me</button>
 * ```
 *
 * The problem is that every event registered over `()` syntax, e.g. `(click)`
 * marks the component and all its ancestors as dirty and re-renders the whole component tree.
 * This is because zone.js patches the native browser API and whenever one of the patched APIs is used it re-renders.
 *
 * So even if your button is not related to a change that needs a re-render the app will re-render completely.
 * This leads to bad performance. This is especially helpful if you work with frequently fired events like 'mousemove'
 *
 * `unpatch` directive solves that problem.
 *
 * Included Features:
 *  - by default un-patch all registered listeners of the host it is applied on
 *  - un-patch only a specified set of registered event listeners
 *  - works zone independent (it directly checks the widow for patched APIs and un-patches them without the use of `runOutsideZone` which brings more performance)
 *  - Not interfering with any logic executed by the registered callback
 *
 * @usageNotes
 *
 * The `unpatch` directive can be used like shown here:
 * ```html
 * <button [unoatch] (click)="triggerSomeMethod($event)">click me</button>
 * <button [unoatch]="['mousemove']" (mousemove)="doStuff2($event)" (click)="doStuff($event)">click me</button>
 * ```
 *
 * @publicApi
 */
// tslint:disable-next-line:directive-selector
var UnpatchEventsDirective = /** @class */ (function () {
    function UnpatchEventsDirective(el) {
        this.el = el;
        this.subscription = new Subscription();
        this.events$ = new BehaviorSubject(zonePatchedEvents);
    }
    Object.defineProperty(UnpatchEventsDirective.prototype, "events", {
        set: function (value) {
            if (value && value.length > 0) {
                this.events$.next(value);
            }
            else {
                this.events$.next(zonePatchedEvents);
            }
        },
        enumerable: true,
        configurable: true
    });
    UnpatchEventsDirective.prototype.reapplyEventListenersZoneUnPatched = function (events) {
        var _this = this;
        events.forEach(function (ev) {
            unpatchEventListener(_this.el.nativeElement, ev);
        });
    };
    UnpatchEventsDirective.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    UnpatchEventsDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.subscription = this.events$
            .pipe(tap(function (eventList) { return _this.reapplyEventListenersZoneUnPatched(eventList); }))
            .subscribe();
    };
    UnpatchEventsDirective.ɵfac = function UnpatchEventsDirective_Factory(t) { return new (t || UnpatchEventsDirective)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
    UnpatchEventsDirective.ɵdir = i0.ɵɵdefineDirective({ type: UnpatchEventsDirective, selectors: [["", "unpatch", ""]], inputs: { events: ["unpatch", "events"] } });
    return UnpatchEventsDirective;
}());
export { UnpatchEventsDirective };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(UnpatchEventsDirective, [{
        type: Directive,
        args: [{ selector: '[unpatch]' }]
    }], function () { return [{ type: i0.ElementRef }]; }, { events: [{
            type: Input,
            args: ['unpatch']
        }] }); })();
//# sourceMappingURL=unpatch-events.directive.js.map