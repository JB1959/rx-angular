export declare function createPropertiesWeakMap<O extends object, P extends object>(getDefaults: (o: O) => P): {
    getProps: (ctx: O) => P;
    setProps: (ctx: O, props: Partial<P>) => P;
};
