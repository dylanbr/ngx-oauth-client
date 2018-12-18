import * as tslib_1 from "tslib";
import { Configuration, DefaultHeaders, NgxOAuthClient } from './ngx-oauth-client';
import { Injectable } from '@angular/core';
import { DEFAULT_CFG } from './default-config';
var NgxTestClientOne = /** @class */ (function (_super) {
    tslib_1.__extends(NgxTestClientOne, _super);
    function NgxTestClientOne() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgxTestClientOne = tslib_1.__decorate([
        Configuration(DEFAULT_CFG),
        DefaultHeaders({
            'Content-Type': 'application/json'
        }),
        Injectable()
    ], NgxTestClientOne);
    return NgxTestClientOne;
}(NgxOAuthClient));
export { NgxTestClientOne };
//# sourceMappingURL=ngx-test-client-one.js.map