import { NgModule } from '@angular/core';
import { PushPipe } from './push.pipe';
import * as i0 from "@angular/core";
var DECLARATIONS = [PushPipe];
var PushModule = /** @class */ (function () {
    function PushModule() {
    }
    PushModule.ɵmod = i0.ɵɵdefineNgModule({ type: PushModule });
    PushModule.ɵinj = i0.ɵɵdefineInjector({ factory: function PushModule_Factory(t) { return new (t || PushModule)(); }, imports: [[]] });
    return PushModule;
}());
export { PushModule };
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(PushModule, { declarations: [PushPipe], exports: [PushPipe] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PushModule, [{
        type: NgModule,
        args: [{
                declarations: DECLARATIONS,
                imports: [],
                exports: DECLARATIONS
            }]
    }], null, null); })();
//# sourceMappingURL=push.module.js.map