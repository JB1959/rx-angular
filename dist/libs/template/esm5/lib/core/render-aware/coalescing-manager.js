import { createPropertiesWeakMap } from '../utils';
var coalescingContextPropertiesMap = createPropertiesWeakMap(function (ctx) { return ({
    numCoalescingSubscribers: 0
}); });
export function createCoalesceManager(scope) {
    if (scope === void 0) { scope = {}; }
    return {
        remove: removeSubscriber,
        add: addSubscription,
        isCoalescing: isCoalescing
    };
    // Increments the number of subscriptions in a scope e.g. a class instance
    function removeSubscriber() {
        var numCoalescingSubscribers = coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers -
            1;
        coalescingContextPropertiesMap.setProps(scope, {
            numCoalescingSubscribers: numCoalescingSubscribers
        });
    }
    // Decrements the number of subscriptions in a scope e.g. a class instance
    function addSubscription() {
        var numCoalescingSubscribers = coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers +
            1;
        coalescingContextPropertiesMap.setProps(scope, {
            numCoalescingSubscribers: numCoalescingSubscribers
        });
    }
    // Checks if anybody else is already coalescing atm
    function isCoalescing() {
        return (coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers >
            0);
    }
}
//# sourceMappingURL=coalescing-manager.js.map