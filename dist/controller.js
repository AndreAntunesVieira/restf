"use strict";var __extends=this&&this.__extends||function(){var n=function(e,t){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(e,t)};return function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}}(),__spreadArrays=this&&this.__spreadArrays||function(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length;for(var n=Array(e),s=0,t=0;t<r;t++)for(var o=arguments[t],i=0,u=o.length;i<u;i++,s++)n[s]=o[i];return n},__importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var jsonwebtoken_1=__importDefault(require("jsonwebtoken")),cache_1=__importDefault(require("./cache")),_ControllerModels_1=__importDefault(require("./.ControllerModels")),RestfController=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.currentMethod="undefined",e}return __extends(e,t),e.prototype.cached=function(e,t){return(new cache_1.default).use(e,t)},e.prototype.clearCache=function(e){return(new cache_1.default).clear(e)},e.prototype.run=function(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return this.currentMethod=e,this[e].apply(this,t)},e.prototype.status=function(e){return this.res.status(e),this},e.prototype.respondWith=function(e,t){return void 0===e&&(e={}),void 0===t&&(t={}),this.sent?null:((t.status||e.statusCode)&&(this.res.status(t.status||e.statusCode),delete e.statusCode),t.status||0<Object.keys(e).length?this.sendWithMiddlewares(e):(this.sent=!0,this.res.status(204),this.res.send()))},e.prototype.send=function(e){return void 0===e&&(e={}),this.sent?null:(e.statusCode&&(this.res.status(e.statusCode),delete e.statusCode),0===Object.keys(e).length?this.sendEmptyResponses():this.sendWithMiddlewares(e))},Object.defineProperty(e.prototype,"routeParams",{get:function(){return this.req.params||{}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"queryParams",{get:function(){return this.req.query||{}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"body",{get:function(){return this.req.body||{}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"headers",{get:function(){return this.req.headers||{}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"pathname",{get:function(){return this.req.url},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"currentUser",{get:function(){if(this.req.credentials)return this.req.credentials;if(this.req.headers.uid&&this.req.headers["access-token"])return this.req.credentials={uid:this.req.headers.uid,accessToken:this.req.headers["access-token"]},this.req.credentials;var e=this.req.cookies.token||this.req.headers.authorization;if(!e)return null;var t=e.replace(/bearer( +)?/i,"");return t?(this.req.credentials=this.tokenToCredentials(t),Object.defineProperty(this.req.credentials,"iat",{enumerable:!1}),Object.defineProperty(this.req.credentials,"exp",{enumerable:!1}),this.req.credentials):null},enumerable:!0,configurable:!0}),e.prototype.tokenToCredentials=function(e){return jsonwebtoken_1.default.verify(e,process.env.JWT_SECRET||"")},e.prototype.serialize=function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var n=this.constructor.serializer;if(!n)return null;var s=this.currentMethod;return(e=new n(this))[s].apply(e,t)},e.prototype.sendWithMiddlewares=function(e,t){var r=this;return void 0===t&&(t=0),this.req.afterMiddlewares&&t<this.req.afterMiddlewares.length?this.req.afterMiddlewares[t](this,e,function(e){return r.sendWithMiddlewares(e,t+1)}):this.sent?null:(this.sent=!0,"string"==typeof e?this.res.send(e):this.res.json(e))},e.prototype.params=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r=this.permit;return r&&(e=__spreadArrays(r,e)),0===e.length?this.req.body:objectFilter(this.req.body,e)},e.prototype.sendEmptyResponses=function(){return this.sent=!0,this.res.status(204),this.res.send()},e.serialize=void 0,e}(_ControllerModels_1.default);function objectFilter(r,e){return e.reduce(function(e,t){return r[t]&&(e[t]=r[t]),e},{})}exports.default=RestfController;