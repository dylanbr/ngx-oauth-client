import * as tslib_1 from "tslib";
import { Configuration, NgxOAuthClient } from './ngx-oauth-client';
import { Injectable } from '@angular/core';
var NgxTestClientTwo = /** @class */ (function (_super) {
    tslib_1.__extends(NgxTestClientTwo, _super);
    function NgxTestClientTwo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgxTestClientTwo = tslib_1.__decorate([
        Configuration({
            host: 'http://127.0.0.1',
            token: 'oauth/token',
            key: 'my_key',
            storage_prefix: 'two_'
        }),
        Injectable()
    ], NgxTestClientTwo);
    return NgxTestClientTwo;
}(NgxOAuthClient));
export { NgxTestClientTwo };
//# sourceMappingURL=ngx-test-client-two.js.map