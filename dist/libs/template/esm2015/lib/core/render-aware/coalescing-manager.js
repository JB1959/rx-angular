import { createPropertiesWeakMap } from '../utils';
const coalescingContextPropertiesMap = createPropertiesWeakMap(ctx => ({
    numCoalescingSubscribers: 0
}));
export function createCoalesceManager(scope = {}) {
    return {
        remove: removeSubscriber,
        add: addSubscription,
        isCoalescing
    };
    // Increments the number of subscriptions in a scope e.g. a class instance
    function removeSubscriber() {
        const numCoalescingSubscribers = coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers -
            1;
        coalescingContextPropertiesMap.setProps(scope, {
            numCoalescingSubscribers
        });
    }
    // Decrements the number of subscriptions in a scope e.g. a class instance
    function addSubscription() {
        const numCoalescingSubscribers = coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers +
            1;
        coalescingContextPropertiesMap.setProps(scope, {
            numCoalescingSubscribers
        });
    }
    // Checks if anybody else is already coalescing atm
    function isCoalescing() {
        return (coalescingContextPropertiesMap.getProps(scope).numCoalescingSubscribers >
            0);
    }
}
//# sourceMappingURL=coalescing-manager.js.map