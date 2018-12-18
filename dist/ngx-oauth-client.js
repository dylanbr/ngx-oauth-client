import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgxRequest } from './ngx-request';
import { map, catchError } from 'rxjs/operators';
var NgxOAuthClient = /** @class */ (function () {
    /**
     *
     * @param {HttpClient} http
     */
    function NgxOAuthClient(http) {
        this.http = http;
    }
    NgxOAuthClient.prototype.getConfig = function () {
    };
    NgxOAuthClient.prototype.getDefaultHeaders = function () {
    };
    /**
     *
     * @param request
     * @returns {any}
     */
    NgxOAuthClient.prototype.requestInterceptor = function (request) {
        return request;
    };
    /**
     *
     * @param request
     * @param response
     * @returns {any}
     */
    NgxOAuthClient.prototype.responseInterceptor = function (request, response) {
        return response;
    };
    /**
     *
     * @param request
     * @param error
     * @returns {any}
     */
    NgxOAuthClient.prototype.errorInterceptor = function (request, error) {
        return error;
    };
    NgxOAuthClient.prototype.getClient = function () {
        return this.http;
    };
    /**
     *
     * @param endpoint
     * @param query
     * @param options
     * @returns {Observable<any>}
     */
    NgxOAuthClient.prototype.get = function (endpoint, query, options) {
        return this.request('GET', endpoint, query, options);
    };
    /**
     *
     * @param endpoint
     * @param data
     * @param options
     * @returns {Observable<any>}
     */
    NgxOAuthClient.prototype.post = function (endpoint, data, options) {
        return this.request('POST', endpoint, data, options);
    };
    /**
     *
     * @param endpoint
     * @param data
     * @param options
     * @returns {Observable<any>}
     */
    NgxOAuthClient.prototype.put = function (endpoint, data, options) {
        return this.request('PUT', endpoint, data, options);
    };
    /**
     *
     * @param endpoint
     * @param data
     * @param options
     * @returns {Observable<any>}
     */
    NgxOAuthClient.prototype.patch = function (endpoint, data, options) {
        return this.request('PATCH', endpoint, data, options);
    };
    /**
     *
     * @param endpoint
     * @param data
     * @param options
     * @returns {Observable<any>}
     */
    NgxOAuthClient.prototype.delete = function (endpoint, options) {
        return this.request('delete', endpoint, {}, options);
    };
    /**
     * Uses formtype to comply with the OAuth2.0 Spec, this will not change
     *
     * @param data
     * @param grant_type
     * @returns {Observable<any>}
     */
    NgxOAuthClient.prototype.getToken = function (grant_type, data) {
        var _this = this;
        if (grant_type && ['client_credentials', 'authorization_code', 'password', 'refresh_token'].indexOf(grant_type) === -1) {
            throw new Error("Grant type " + grant_type + " is not supported");
        }
        var config = this.getConfig();
        var defaults = {
            grant_type: grant_type || 'client_credentials'
        };
        if (this.fetchConfig('key')) {
            defaults.client_id = this.fetchConfig('key');
        }
        if (this.fetchConfig('secret')) {
            defaults.client_secret = this.fetchConfig('secret');
        }
        var payload = Object.assign(defaults, data);
        var params = [];
        for (var key in payload) {
            if (payload.hasOwnProperty(key)) {
                params.push(key + "=" + payload[key]);
            }
        }
        var headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
        return this.http.post(config.host + '/' + config.token, params.join('&'), { headers: headers }).pipe(map(function (res) {
            _this.setToken(res);
            return res;
        }));
    };
    NgxOAuthClient.prototype.setToken = function (token) {
        this.fetchConfig("storage").setItem(this.fetchStorageName(), JSON.stringify(token));
    };
    /**
     *
     * @param {string} key
     * @returns {any}
     */
    NgxOAuthClient.prototype.fetchToken = function (key) {
        var token = this.fetchConfig("storage").getItem(this.fetchStorageName());
        if (token) {
            var parsedToken = JSON.parse(token);
            if (key && parsedToken.hasOwnProperty(key)) {
                return parsedToken[key];
            }
            else if (!key) {
                return parsedToken;
            }
        }
        return null;
    };
    /**
     *
     */
    NgxOAuthClient.prototype.clearToken = function () {
        this.fetchConfig("storage").removeItem(this.fetchStorageName());
    };
    /**
     * Performs an HTTP request
     *
     * @param {string} method
     * @param {string} endpoint
     * @param payload
     * @param options
     * @returns {Observable<any>}
     */
    NgxOAuthClient.prototype.request = function (method, endpoint, payload, options) {
        var _this = this;
        var request = new NgxRequest(method, this.buildEndpoint(endpoint));
        if (method === 'GET' && payload && Object.keys(payload).length > 0) {
            request.setParams(payload);
        }
        if (['POST', 'PUT', 'PATCH'].indexOf(method) !== -1) {
            request.setBody(payload);
        }
        request
            .setHeaders(this.getDefaultHeaders(), options ? options.headers : undefined)
            .setReportProgress(this.fetchOption(options, 'reportProgress', false))
            .setObserve(this.fetchOption(options, 'observe', 'body'))
            .setResponseType(this.fetchOption(options, 'responseType', 'json'))
            .setWithCredentials(this.fetchOption(options, 'withCredentials', false));
        if (options && options.params instanceof HttpParams) {
            request.setHttpParams(options.params);
        }
        return this.http.request(method, this.buildEndpoint(endpoint), this.requestInterceptor(request)).pipe(map(function (res) { return _this.responseInterceptor(request, res); }), catchError(function (err) { return _this.errorInterceptor(request, err); }));
    };
    /**
     * Fetch options and fallback to config defaults
     * @param options
     * @param option
     * @param fallback
     * @returns {any}
     */
    NgxOAuthClient.prototype.fetchOption = function (options, option, fallback) {
        if (fallback === void 0) { fallback = null; }
        if (options && typeof options[option] !== 'undefined') {
            return options[option];
        }
        return this.fetchConfig(option, fallback);
    };
    /**
     *
     * @param key
     * @param fallback
     * @returns {any}
     */
    NgxOAuthClient.prototype.fetchConfig = function (key, fallback) {
        if (fallback === void 0) { fallback = null; }
        if (typeof this.getConfig()[key] !== 'undefined') {
            return this.getConfig()[key];
        }
        return fallback;
    };
    /**
     * Gets the name of the storage token
     *
     * @returns {string}
     */
    NgxOAuthClient.prototype.fetchStorageName = function () {
        var prefix = this.fetchConfig('storage_prefix');
        var suffix = this.fetchConfig('storage_suffix', 'auth_token');
        var token = '';
        if (prefix) {
            token += prefix;
        }
        token += suffix;
        return token;
    };
    /**
     *
     * @param endpoint
     * @returns {string}
     */
    NgxOAuthClient.prototype.buildEndpoint = function (endpoint) {
        if (!endpoint) {
            throw new Error('Endpoint cannot be empty!');
        }
        if (endpoint.charAt(0) === '/') {
            endpoint = endpoint.substr(1);
        }
        return this.getConfig().host.replace(/\/$/, '') + '/' + endpoint;
    };
    NgxOAuthClient = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], NgxOAuthClient);
    return NgxOAuthClient;
}());
export { NgxOAuthClient };
/**
 * Set the base URL of REST resource
 * @param {Object} config - API confiugration
 */
export function Configuration(config) {
    return function (Target) {
        Target.prototype.getConfig = function () {
            if (!config.storage) {
                config.storage = localStorage;
            }
            return config;
        };
        return Target;
    };
}
/**
 * Set default headers for every method of the RESTClient
 * @param {Object} headers - deafult headers in a key-value pair
 */
export function DefaultHeaders(headers) {
    return function (Target) {
        Target.prototype.getDefaultHeaders = function () {
            return headers;
        };
        return Target;
    };
}
//# sourceMappingURL=ngx-oauth-client.js.map