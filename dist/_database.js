"use strict";var __importStar=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)Object.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r.default=e,r};Object.defineProperty(exports,"__esModule",{value:!0});var path=__importStar(require("path")),knex=__importStar(require("knex")),fullPath=function(e){return path.join(__dirname,"../..",e)},knexfile=getKnexfile(),environment=process.env.NODE_ENV||"development";function getKnexfile(){try{return require(fullPath("knexfile"))}catch(e){return require(fullPath("config/knexfile"))}}var _database=knex(knexfile[environment]);exports.default=_database;