import { ChangeDetectorRef, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, ObservableInput, Unsubscribable } from 'rxjs';
import { RenderAware } from '../core';
import * as i0 from "@angular/core";
export interface LetViewContext<T> {
    $implicit?: T;
    rxLet?: T;
    $error?: boolean;
    $complete?: boolean;
}
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
export declare class LetDirective<U> implements OnInit, OnDestroy {
    private readonly templateRef;
    private readonly viewContainerRef;
    static ngTemplateGuard_rxLet: 'binding';
    set rxLet(potentialObservable: ObservableInput<U> | null | undefined);
    set strategy(strategy: string | Observable<string> | undefined);
    readonly strategies: any;
    private embeddedView;
    private readonly ViewContext;
    protected subscription: Unsubscribable;
    readonly renderAware: RenderAware<U | null | undefined>;
    private readonly resetObserver;
    private readonly updateObserver;
    static ngTemplateContextGuard<U>(dir: LetDirective<U>, ctx: unknown | null | undefined): ctx is LetViewContext<U>;
    constructor(cdRef: ChangeDetectorRef, templateRef: TemplateRef<LetViewContext<U>>, viewContainerRef: ViewContainerRef);
    ngOnInit(): void;
    createEmbeddedView(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDef<LetDirective<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<LetDirective<any>, "[rxLet]", never, { "rxLet": "rxLet"; "strategy": "rxLetStrategy"; }, {}, never>;
}
