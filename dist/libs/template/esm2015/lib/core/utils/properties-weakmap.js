/*
 * createPropertiesWeakMap
 *
 * @param getDefaults: (o: O) => P
 * Example:
 *
 * export interface Properties {
 *   isCoalescing: boolean;
 * }
 *
 * const obj: object = {
 *   foo: 'bar',
 *   isCoalescing: 'weakMap version'
 * };
 *
 * const getDefaults = (ctx: object): Properties => ({isCoalescing: false});
 * const propsMap = createPropertiesWeakMap<object, Properties>(getDefaults);
 *
 * console.log('obj before:', obj);
 * // {foo: "bar", isCoalescing: "weakMap version"}
 * console.log('props before:', propsMap.getProps(obj));
 * // {isCoalescing: "weakMap version"}
 *
 * propsMap.setProps(obj, {isCoalescing: true});
 * console.log('obj after:', obj);
 * // {foo: "bar", isCoalescing: "weakMap version"}
 * console.log('props after:', propsMap.getProps(obj));
 * // {isCoalescing: "true"}
 * */
export function createPropertiesWeakMap(getDefaults) {
    const propertyMap = new WeakMap();
    return {
        getProps: getProperties,
        setProps: setProperties
    };
    function getProperties(ctx) {
        const defaults = getDefaults(ctx);
        const propertiesPresent = propertyMap.get(ctx);
        let properties;
        if (propertiesPresent !== undefined) {
            properties = propertiesPresent;
        }
        else {
            properties = {};
            Object.entries(defaults).forEach(([prop, value]) => {
                properties[prop] = hasKey(ctx, prop) ? ctx[prop] : value;
            });
            propertyMap.set(ctx, properties);
        }
        return properties;
    }
    function setProperties(ctx, props) {
        const properties = getProperties(ctx);
        Object.entries(props).forEach(([prop, value]) => {
            properties[prop] = value;
        });
        propertyMap.set(ctx, properties);
        return properties;
    }
    function hasKey(ctx, property) {
        return ctx[property] != null;
    }
}
//# sourceMappingURL=properties-weakmap.js.map