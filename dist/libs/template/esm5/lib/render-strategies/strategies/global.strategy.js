import { ɵmarkDirty as markDirty } from '@angular/core';
export function getGlobalStrategies(config) {
    return {
        global: createGlobalStrategy(config)
    };
}
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
 * | `global`   | ❌/✔ ️        | mFC  / ɵMD          | ❌               |
 *
 */
/**
 *
 * Global Strategy
 *
 * This strategy is rendering the application root and
 * all it's children that are on a path
 * that is marked as dirty or has components with `ChangeDetectionStrategy.Default`.
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing       |
 * |-------------| --------------| ------------ ------ | ---------------- |
 * | `global`   | ❌/✔️       | mFC / ɵMD           | ❌                |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createGlobalStrategy(config) {
    var renderMethod = function () { return markDirty(config.cdRef.context); };
    return {
        name: 'global',
        renderMethod: renderMethod,
        behavior: function (o) { return o; },
        scheduleCD: function () { return renderMethod(); }
    };
}
//# sourceMappingURL=global.strategy.js.map