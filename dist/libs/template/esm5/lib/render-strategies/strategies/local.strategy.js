import { coalesceAndSchedule, staticCoalesce } from '../static';
import { SchedulingPriority } from '../rxjs/scheduling/interfaces';
import { getUnpatchedResolvedPromise } from '../../core/utils/unpatched-promise';
import { from, Observable } from 'rxjs';
import { getScheduler } from '../rxjs/scheduling/priority-scheduler-map';
import { observeOn } from 'rxjs/operators';
import { coalesceWith } from '../rxjs/operators/coalesceWith';
import { postTaskScheduler, PostTaskSchedulerPriority } from '../rxjs/scheduling/getPostTaskScheduler';
/**
 * Strategies
 *
 * - VE/I - Options for ViewEngine / Ivy
 * - mFC - `cdRef.markForCheck`
 * - dC - `cdRef.detectChanges`
 * - ɵMD - `ɵmarkDirty`
 * - ɵDC - `ɵdetectChanges`
 * - LV  - `LView`
 * - C - `Component`
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------------- | ---------------- |
 * | `local`    | ✔/✔ ️        | dC / ɵDC            | ✔ ️ + C/ LV     |
 * | `detach`   | ❌/✔ ️       | mFC  / ɵMD          | ❌               |
 * | `postTask` | ❌/✔ ️       | mFC  / ɵMD          | ❌               |
 * | `idleCallback` | ❌/✔ ️   | mFC  / ɵMD          | ❌               |
 *
 */
export function getLocalStrategies(config) {
    return {
        local: createLocalStrategy(config),
        localCoalesce: createLocalCoalesceStrategy(config),
        localCoalesceAndSchedule: createLocalCoalesceAndScheduleStrategy(config),
        localNative: createLocalNativeStrategy(config),
        detach: createDetachStrategy(config),
        userVisible: createUserVisibleStrategy(config),
        userBlocking: createUserBlockingStrategy(config),
        background: createBackgroundStrategy(config),
        idleCallback: createIdleCallbackStrategy(config)
    };
}
export function createLocalNativeStrategy(config) {
    var renderMethod = function () {
        config.cdRef.detectChanges();
    };
    var behavior = function (o) { return o.pipe(); };
    var scheduleCD = function () { return renderMethod(); };
    return {
        name: 'localNative',
        renderMethod: renderMethod,
        behavior: behavior,
        scheduleCD: scheduleCD
    };
}
/**
 *  Local Strategy
 *
 * This strategy is rendering the actual component and
 * all it's children that are on a path
 * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
 *
 * As detectChanges has no coalescing of render calls
 * like `ChangeDetectorRef#markForCheck` or `ɵmarkDirty` has, so we have to apply our own coalescing, 'scoped' on
 * component level.
 *
 * Coalescing, in this very manner,
 * means **collecting all events** in the same
 * [EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick, that would cause a re-render and
 * execute **re-rendering only once**.
 *
 * 'Scoped' coalescing, in addition, means **grouping the collected events by** a specific context.
 * E. g. the **component** from which the re-rendering was initiated.
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------ ------ | ---------------- |
 * | `ɵlocal`    | ✔️/✔️    | dC / dC             | ✔️ + C         |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createLocalStrategy(config) {
    var durationSelector = from(getUnpatchedResolvedPromise());
    var scope = config.cdRef.context;
    var priority = SchedulingPriority.animationFrame;
    var scheduler = getScheduler(priority);
    var renderMethod = function () {
        config.cdRef.detectChanges();
    };
    var behavior = function (o) {
        return o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
    };
    var scheduleCD = function () { return coalesceAndSchedule(renderMethod, priority, scope); };
    return {
        name: 'local',
        renderMethod: renderMethod,
        behavior: behavior,
        scheduleCD: scheduleCD
    };
}
export function createLocalCoalesceStrategy(config) {
    var durationSelector = from(getUnpatchedResolvedPromise());
    var scope = config.cdRef.context;
    var priority = SchedulingPriority.animationFrame;
    var scheduler = getScheduler(priority);
    var renderMethod = function () {
        config.cdRef.detectChanges();
    };
    var behavior = function (o) {
        return o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
    };
    var scheduleCD = function () { return coalesceAndSchedule(renderMethod, priority, scope); };
    return {
        name: 'localCoalesce',
        renderMethod: renderMethod,
        behavior: behavior,
        scheduleCD: scheduleCD
    };
}
export function createLocalCoalesceAndScheduleStrategy(config) {
    var durationSelector = from(getUnpatchedResolvedPromise());
    var scope = config.cdRef.context;
    var priority = SchedulingPriority.animationFrame;
    var scheduler = getScheduler(priority);
    var renderMethod = function () {
        config.cdRef.detectChanges();
    };
    var behavior = function (o) {
        return o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
    };
    var scheduleCD = function () { return coalesceAndSchedule(renderMethod, priority, scope); };
    return {
        name: 'localCoalesceAndSchedule',
        renderMethod: renderMethod,
        behavior: behavior,
        scheduleCD: scheduleCD
    };
}
/**
 *  Detach Strategy
 *
 * This strategy is rendering the actual component and
 * all it's children that are on a path
 * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
 *
 * As detectChanges has no coalescing of render calls
 * like `ChangeDetectorRef#markForCheck` or `ɵmarkDirty` has, so we have to apply our own coalescing, 'scoped' on
 * component level.
 *
 * Coalescing, in this very manner,
 * means **collecting all events** in the same
 * [EventLoop](https://developer.mozilla.org/de/docs/Web/JavaScript/EventLoop) tick, that would cause a re-render and
 * execute **re-rendering only once**.
 *
 * 'Scoped' coalescing, in addition, means **grouping the collected events by** a specific context.
 * E. g. the **component** from which the re-rendering was initiated.
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------ ------ | ---------------- |
 * | `ɵdetach`     | ✔️/✔️          | dC / ɵDC            | ✔️ + C/ LV       |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createDetachStrategy(config) {
    var durationSelector = from(getUnpatchedResolvedPromise());
    var scope = config.cdRef.context;
    var priority = SchedulingPriority.animationFrame;
    var scheduler = getScheduler(priority);
    var renderMethod = function () {
        config.cdRef.reattach();
        config.cdRef.detectChanges();
        config.cdRef.detach();
    };
    var behavior = function (o) {
        return o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
    };
    var scheduleCD = function () { return coalesceAndSchedule(renderMethod, priority, scope); };
    return {
        name: 'detach',
        renderMethod: renderMethod,
        behavior: behavior,
        scheduleCD: scheduleCD
    };
}
/**
 *  PostTask - Priority UserVisible Strategy
 *
 */
export function createUserVisibleStrategy(config) {
    var durationSelector = new Observable(function (subscriber) {
        from(postTaskScheduler.postTask(function () { return void 0; }, {
            priority: PostTaskSchedulerPriority.userVisible,
            delay: 0
        })).subscribe(subscriber);
    });
    var scope = config.cdRef.context;
    var priority = SchedulingPriority.background;
    var scheduler = getScheduler(priority);
    var renderMethod = function () {
        config.cdRef.detectChanges();
    };
    var behavior = function (o) {
        return o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
    };
    var scheduleCD = function () { return coalesceAndSchedule(renderMethod, priority, scope); };
    return {
        name: 'userVisible',
        renderMethod: renderMethod,
        behavior: behavior,
        scheduleCD: scheduleCD
    };
}
/**
 *  PostTask - Priority UserBlocking Strategy
 *
 */
export function createUserBlockingStrategy(config) {
    var durationSelector = new Observable(function (subscriber) {
        from(postTaskScheduler.postTask(function () { return void 0; }, {
            priority: PostTaskSchedulerPriority.userVisible,
            delay: 0
        })).subscribe(subscriber);
    });
    var scope = config.cdRef.context;
    var priority = SchedulingPriority.background;
    var scheduler = getScheduler(priority);
    var renderMethod = function () {
        config.cdRef.detectChanges();
    };
    var behavior = function (o) {
        return o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
    };
    var scheduleCD = function () {
        staticCoalesce(renderMethod, durationSelector, scope);
        // coalesceAndSchedule(renderMethod, priority, scope);
    };
    return {
        name: 'userBlocking',
        renderMethod: renderMethod,
        behavior: behavior,
        scheduleCD: scheduleCD
    };
}
/**
 *  PostTask - Priority Background Strategy
 *
 */
export function createBackgroundStrategy(config) {
    var durationSelector = new Observable(function (subscriber) {
        from(postTaskScheduler.postTask(function () { return void 0; }, {
            priority: PostTaskSchedulerPriority.userVisible,
            delay: 0
        })).subscribe(subscriber);
    });
    var scope = config.cdRef.context;
    var priority = SchedulingPriority.background;
    var scheduler = getScheduler(priority);
    var renderMethod = function () {
        config.cdRef.detectChanges();
    };
    var behavior = function (o) {
        return o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
    };
    var scheduleCD = function () {
        staticCoalesce(renderMethod, durationSelector, scope);
        // coalesceAndSchedule(renderMethod, priority, scope);
    };
    return {
        name: 'background',
        renderMethod: renderMethod,
        behavior: behavior,
        scheduleCD: scheduleCD
    };
}
/**
 *  IdleCallback Strategy
 *
 * This strategy is rendering the actual component and
 * all it's children that are on a path
 * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
 *
 * As detectChanges is used the coalescing described in `ɵlocal` is implemented here.
 *
 * 'Scoped' coalescing, in addition, means **grouping the collected events by** a specific context.
 * E. g. the **component** from which the re-rendering was initiated.
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------ ------ | ---------------- |
 * | `ɵdetach`     | ✔️/✔️          | dC / ɵDC            | ✔️ + C/ LV       |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createIdleCallbackStrategy(config) {
    var durationSelector = from(getUnpatchedResolvedPromise());
    var scope = config.cdRef.context;
    var priority = SchedulingPriority.idleCallback;
    var scheduler = getScheduler(priority);
    var renderMethod = function () {
        config.cdRef.detectChanges();
    };
    var behavior = function (o) {
        return o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
    };
    var scheduleCD = function () { return coalesceAndSchedule(renderMethod, priority, scope); };
    return {
        name: 'idleCallback',
        renderMethod: renderMethod,
        behavior: behavior,
        scheduleCD: scheduleCD
    };
}
//# sourceMappingURL=local.strategy.js.map