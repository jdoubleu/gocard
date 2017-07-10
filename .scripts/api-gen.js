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

let code = CodeGen.getNodeCode({
    className: 'ApiClient',
    swagger: spec,
    template: {
        class: fs.readFileSync(path.resolve(__dirname, 'templates/api_client/class.mustache'), 'utf-8'),
        method: fs.readFileSync(path.resolve(__dirname, 'templates/api_client/method.mustache'), 'utf-8')
    }
});

// Disable ESLint for api lib by adding inline commands
// see http://eslint.org/docs/user-guide/configuring#disabling-rules-with-inline-comments
code = '/* eslint-disable */\n' + code;

fs.writeFileSync(outputDir, code);