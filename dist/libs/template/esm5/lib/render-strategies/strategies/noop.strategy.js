/**
 * Noop Strategy
 *
 * This strategy is does nothing. It serves for debugging only
 *
 * | Name        | ZoneLess VE/I | Render Method VE/I  | Coalescing VE/I  |
 * |-------------| --------------| ------------ ------ | ---------------- |
 * | `noop`      | ❌/❌         | no rendering        | ❌               |
 *
 * @param config { RenderStrategyFactoryConfig } - The values this strategy needs to get calculated.
 * @return {RenderStrategy<T>} - The calculated strategy
 *
 */
export function createNoopStrategy() {
    return {
        name: 'noop',
        renderMethod: function () { },
        behavior: function (o) { return o; },
        scheduleCD: function () { }
    };
}
//# sourceMappingURL=noop.strategy.js.map