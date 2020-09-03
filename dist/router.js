"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var express_1=require("express"),_routeDocsRender_1=__importDefault(require("./private/_routeDocsRender")),_routeController_1=__importDefault(require("./private/_routeController")),_helpers_1=require("./private/_helpers"),RestfRouter=function(){function e(){this.router=express_1.Router(),this.routes=[],this.get=this.addMethod("get"),this.post=this.addMethod("post"),this.delete=this.addMethod("delete"),this.update=this.addMethod("update")}return e.prototype.resources=function(e,t){function r(e,t,r){return s[t]?(u.subRoutes&&u.subRoutes.push({path:e,type:t,method:r}),o[r](e,t)):null}var o=new _routeController_1.default(t),u={path:e,type:"resources",subRoutes:[],controller:t},s=_routeController_1.default.resourcesMethods(t);return r("/","index","get"),r("/","create","post"),r("/:id","show","get"),r("/:id","update","put"),r("/:id","destroy","delete"),this.routes.push(u),this.router.use(e,o.listen()),this},e.prototype.docs=function(e){var r=this;this.router.get(e,function(e,t){return new _routeDocsRender_1.default(e,t).render(r.routes)})},e.prototype.listen=function(){return this.router.routes=this.routes.map(function(e){return"router."+e.method+"('"+e.path+"', '"+e.controller+"."+e.type+"')"}),this.router},e.prototype.addMethod=function(s){var i=this;return function(e,t){var r=t.split(/[@.]/),o=r[0],u=r[1];return i.routes.push({path:e,method:s,type:u,controller:o}),i.router[s](e,_helpers_1.addMiddleware(o,u,e)),i}},e}();exports.default=RestfRouter;