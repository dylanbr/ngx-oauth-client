var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Configuration, DefaultHeaders, NgxOAuthClient } from './ngx-oauth-client';
import { Injectable } from '@angular/core';
import { DEFAULT_CFG } from './default-config';
var NgxTestClientOne = /** @class */ (function (_super) {
    __extends(NgxTestClientOne, _super);
    function NgxTestClientOne() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgxTestClientOne.decorators = [
        { type: Injectable },
    ];
    NgxTestClientOne = __decorate([
        Configuration(DEFAULT_CFG),
        DefaultHeaders({
            'Content-Type': 'application/json'
        })
    ], NgxTestClientOne);
    return NgxTestClientOne;
}(NgxOAuthClient));
export { NgxTestClientOne };
//# sourceMappingURL=ngx-test-client-one.js.map