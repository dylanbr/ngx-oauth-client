import { HttpHeaders, HttpParams } from '@angular/common/http';
var NgxRequest = /** @class */ (function () {
    function NgxRequest(method, url) {
        this.method = method;
        this.url = url;
    }
    NgxRequest.prototype.setHeaders = function (headers, override) {
        this.headers = new HttpHeaders(Object.assign(headers, override));
        return this;
    };
    NgxRequest.prototype.setBody = function (body) {
        this.body = body;
        return this;
    };
    NgxRequest.prototype.setObserve = function (type) {
        this.observe = type;
        return this;
    };
    NgxRequest.prototype.setParams = function (params) {
        var resource = new HttpParams();
        for (var key in params) {
            if (typeof params === 'object' && params.hasOwnProperty(key)) {
                resource = resource.set(key, params[key]);
            }
        }
        this.params = resource;
        return this;
    };
    NgxRequest.prototype.setHttpParams = function (params) {
        this.params = params;
        return this;
    };
    NgxRequest.prototype.setReportProgress = function (value) {
        this.reportProgress = value;
        return this;
    };
    NgxRequest.prototype.setResponseType = function (type) {
        this.responseType = type;
        return this;
    };
    /**
     *
     * @param {boolean} value
     * @returns {NgxRequest}
     */
    NgxRequest.prototype.setWithCredentials = function (value) {
        this.withCredentials = value;
        return this;
    };
    return NgxRequest;
}());
export { NgxRequest };
//# sourceMappingURL=ngx-request.js.map