/** A shared promise instance to cause a delay of one microtask */
import { getGlobalThis } from './get-global-this';
import { apiZonePatched } from './zone-checks';
let resolvedPromise = null;
export function getUnpatchedResolvedPromise() {
    resolvedPromise =
        resolvedPromise ||
            (apiZonePatched('Promise')
                ? getGlobalThis().__zone_symbol__Promise.resolve()
                : Promise.resolve());
    return resolvedPromise;
}
//# sourceMappingURL=unpatched-promise.js.map