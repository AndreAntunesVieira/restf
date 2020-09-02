"use strict";var __spreadArrays=this&&this.__spreadArrays||function(){for(var r=0,e=0,a=arguments.length;e<a;e++)r+=arguments[e].length;for(var n=Array(r),t=0,e=0;e<a;e++)for(var s=arguments[e],d=0,i=s.length;d<i;d++,t++)n[t]=s[d];return n};function addMiddleware(t,s,d){return function(r,e){try{fixEndingParams(r.params);var a=new r.AllControllers[t];a.req=r,a.res=e;var n=a.run.apply(a,__spreadArrays([s],middlewareParams(d,r)));return a.sent?n:isPromise(n)?n.then(function(r){return a.respondWith(r)}).catch(handleError(a)):a.respondWith(n)}catch(r){console.log(r),e.status(500),e.send("")}}}function fixEndingParams(r){var e;r[0]&&(e=r[0],delete r[0],r[Object.keys(r).pop()]+=e)}function handleError(a){return function(r){var e=500;return"Not Found"===r.message&&(e=404),a.respondWith({message:r.message,statusCode:e})}}function isPromise(r){return!!r&&void 0!==r.then}function middlewareParams(r,e){return/:/.test(r)?"/:id"===r?[e.params.id]:/:\w+\*/.test(r)?endingParam(r,e):Object.values(e.params):[]}function endingParam(r,e){var a=e.params,n=a[0]||"";delete a[0];var t=Object.keys(a).pop(),s=a[t]||"";return a[t]=s+n,Object.values(a)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.addMiddleware=addMiddleware;