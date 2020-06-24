import { NgModule } from '@angular/core';
import { LetDirective } from './let.directive';
import * as i0 from "@angular/core";
var EXPORTED_DECLARATIONS = [LetDirective];
var LetModule = /** @class */ (function () {
    function LetModule() {
    }
    LetModule.ɵmod = i0.ɵɵdefineNgModule({ type: LetModule });
    LetModule.ɵinj = i0.ɵɵdefineInjector({ factory: function LetModule_Factory(t) { return new (t || LetModule)(); } });
    return LetModule;
}());
export { LetModule };
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LetModule, { declarations: [LetDirective], exports: [LetDirective] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LetModule, [{
        type: NgModule,
        args: [{
                declarations: EXPORTED_DECLARATIONS,
                exports: [EXPORTED_DECLARATIONS]
            }]
    }], null, null); })();
//# sourceMappingURL=let.module.js.map