"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var path=require("path"),knex=require("knex"),fullPath=function(e){return path.join(__dirname,"../..",e)},knexfile=getKnexfile(),environment=process.env.NODE_ENV||"development";function getKnexfile(){try{return require(fullPath("knexfile"))}catch(e){return require(fullPath("config/knexfile"))}}var database=knex(knexfile[environment]);exports.default=database;