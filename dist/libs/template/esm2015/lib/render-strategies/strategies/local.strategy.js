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
    const renderMethod = () => {
        config.cdRef.detectChanges();
    };
    const behavior = o => o.pipe();
    const scheduleCD = () => renderMethod();
    return {
        name: 'localNative',
        renderMethod,
        behavior,
        scheduleCD
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
    const durationSelector = from(getUnpatchedResolvedPromise());
    const scope = config.cdRef.context;
    const priority = SchedulingPriority.animationFrame;
    const scheduler = getScheduler(priority);
    const renderMethod = () => {
        config.cdRef.detectChanges();
    };
    const behavior = o => o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
    const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);
    return {
        name: 'local',
        renderMethod,
        behavior,
        scheduleCD
    };
}
export function createLocalCoalesceStrategy(config) {
    const durationSelector = from(getUnpatchedResolvedPromise());
    const scope = config.cdRef.context;
    const priority = SchedulingPriority.animationFrame;
    const scheduler = getScheduler(priority);
    const renderMethod = () => {
        config.cdRef.detectChanges();
    };
    const behavior = o => o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
    const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);
    return {
        name: 'localCoalesce',
        renderMethod,
        behavior,
        scheduleCD
    };
}
export function createLocalCoalesceAndScheduleStrategy(config) {
    const durationSelector = from(getUnpatchedResolvedPromise());
    const scope = config.cdRef.context;
    const priority = SchedulingPriority.animationFrame;
    const scheduler = getScheduler(priority);
    const renderMethod = () => {
        config.cdRef.detectChanges();
    };
    const behavior = o => o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
    const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);
    return {
        name: 'localCoalesceAndSchedule',
        renderMethod,
        behavior,
        scheduleCD
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
    const durationSelector = from(getUnpatchedResolvedPromise());
    const scope = config.cdRef.context;
    const priority = SchedulingPriority.animationFrame;
    const scheduler = getScheduler(priority);
    const renderMethod = () => {
        config.cdRef.reattach();
        config.cdRef.detectChanges();
        config.cdRef.detach();
    };
    const behavior = o => o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
    const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);
    return {
        name: 'detach',
        renderMethod,
        behavior,
        scheduleCD
    };
}
/**
 *  PostTask - Priority UserVisible Strategy
 *
 */
export function createUserVisibleStrategy(config) {
    const durationSelector = new Observable(subscriber => {
        from(postTaskScheduler.postTask(() => void 0, {
            priority: PostTaskSchedulerPriority.userVisible,
            delay: 0
        })).subscribe(subscriber);
    });
    const scope = config.cdRef.context;
    const priority = SchedulingPriority.background;
    const scheduler = getScheduler(priority);
    const renderMethod = () => {
        config.cdRef.detectChanges();
    };
    const behavior = o => o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
    const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);
    return {
        name: 'userVisible',
        renderMethod,
        behavior,
        scheduleCD
    };
}
/**
 *  PostTask - Priority UserBlocking Strategy
 *
 */
export function createUserBlockingStrategy(config) {
    const durationSelector = new Observable(subscriber => {
        from(postTaskScheduler.postTask(() => void 0, {
            priority: PostTaskSchedulerPriority.userVisible,
            delay: 0
        })).subscribe(subscriber);
    });
    const scope = config.cdRef.context;
    const priority = SchedulingPriority.background;
    const scheduler = getScheduler(priority);
    const renderMethod = () => {
        config.cdRef.detectChanges();
    };
    const behavior = o => o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
    const scheduleCD = () => {
        staticCoalesce(renderMethod, durationSelector, scope);
        // coalesceAndSchedule(renderMethod, priority, scope);
    };
    return {
        name: 'userBlocking',
        renderMethod,
        behavior,
        scheduleCD
    };
}
/**
 *  PostTask - Priority Background Strategy
 *
 */
export function createBackgroundStrategy(config) {
    const durationSelector = new Observable(subscriber => {
        from(postTaskScheduler.postTask(() => void 0, {
            priority: PostTaskSchedulerPriority.userVisible,
            delay: 0
        })).subscribe(subscriber);
    });
    const scope = config.cdRef.context;
    const priority = SchedulingPriority.background;
    const scheduler = getScheduler(priority);
    const renderMethod = () => {
        config.cdRef.detectChanges();
    };
    const behavior = o => o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
    const scheduleCD = () => {
        staticCoalesce(renderMethod, durationSelector, scope);
        // coalesceAndSchedule(renderMethod, priority, scope);
    };
    return {
        name: 'background',
        renderMethod,
        behavior,
        scheduleCD
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
    const durationSelector = from(getUnpatchedResolvedPromise());
    const scope = config.cdRef.context;
    const priority = SchedulingPriority.idleCallback;
    const scheduler = getScheduler(priority);
    const renderMethod = () => {
        config.cdRef.detectChanges();
    };
    const behavior = o => o.pipe(coalesceWith(durationSelector, scope), observeOn(scheduler));
    const scheduleCD = () => coalesceAndSchedule(renderMethod, priority, scope);
    return {
        name: 'idleCallback',
        renderMethod,
        behavior,
        scheduleCD
    };
}
//# sourceMappingURL=local.strategy.js.map