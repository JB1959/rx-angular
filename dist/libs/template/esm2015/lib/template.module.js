import { NgModule } from '@angular/core';
import { LetModule } from './let';
import { PushModule } from './push';
import { UnpatchEventsModule } from './unpatch/events';
import * as i0 from "@angular/core";
export class TemplateModule {
}
TemplateModule.ɵmod = i0.ɵɵdefineNgModule({ type: TemplateModule });
TemplateModule.ɵinj = i0.ɵɵdefineInjector({ factory: function TemplateModule_Factory(t) { return new (t || TemplateModule)(); }, imports: [LetModule, PushModule, UnpatchEventsModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TemplateModule, { exports: [LetModule, PushModule, UnpatchEventsModule] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(TemplateModule, [{
        type: NgModule,
        args: [{
                exports: [LetModule, PushModule, UnpatchEventsModule]
            }]
    }], null, null); })();
//# sourceMappingURL=template.module.js.map