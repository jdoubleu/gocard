/**
 * Script for generating API client basend on
 * API specification (/api_schema.yaml).
 */

const path = require('path');
const fs = require('fs');
const CodeGen = require('swagger-js-codegen').CodeGen;
const yaml = require('js-yaml');

const specFile = path.resolve(__dirname, '../api_schema.yaml');
const outputDir = path.resolve(__dirname, '../client/src/lib/ApiClient.js');

const spec = yaml.load(fs.readFileSync(specFile, 'UTF-8'));

fs.writeFileSync(outputDir, CodeGen.getNodeCode({
    className: 'ApiClient', swagger: spec
}));