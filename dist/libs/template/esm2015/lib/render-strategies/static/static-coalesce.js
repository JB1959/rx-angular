import { createCoalesceManager } from '../../core/render-aware/coalescing-manager';
export function staticCoalesce(work, durationSelector, scope = {}) {
    const coalescingManager = createCoalesceManager(scope);
    if (!coalescingManager.isCoalescing()) {
        coalescingManager.add();
        durationSelector.subscribe(() => {
            tryExecuteWork();
        });
    }
    // =====
    function tryExecuteWork() {
        coalescingManager.remove();
        if (!coalescingManager.isCoalescing()) {
            return work();
        }
    }
}
//# sourceMappingURL=static-coalesce.js.map