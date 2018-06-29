let c_support = require('./lib/c-support.js');
let cpp_support = require('./lib/cpp-support.js');
let java_support = require('./lib/java-support.js');
let python_support = require('./lib/python-support.js');
let node_support = require('./lib/node-support.js');
let fs = require('fs');

/**
 * @typedef {Object} ParsedFilePath
 * @property {string} fileName 
 * @property {string} filePath 
 * @property {string} fileExt 
 */

/**
 * Parses the file path
 * @param {string} str Path Like String
 * @returns {ParsedFilePath} Parsed File Path Obj
 */
function parseFilePath(str) {
    let fileName = str.replace(/^.*[\\\/]/, '');
    let filePath = str.substr(0, str.indexOf(fileName));
    let tmp = fileName.split('.');
    let fileExt = '.' + tmp[tmp.length - 1];
    fileName = fileName.substr(0, fileName.indexOf(fileExt));
    return {
        fileName: fileName
        , filePath: filePath
        , fileExt: fileExt
    }
}

/**
* @callback MyCallback akakkak
* @param {Error} err Error
* @param {string} stderr The stderr from the program execution
* @param {string} stdout The stdout from the program execution
*/

/**
 * Runs the file at the given path using appropriate compiler and executes the callback
 * @param {string} path Path like string
 * @param {string} stdin the stdin to be sent to program
 * @param {MyCallback} callback
 */
function runFile(path, stdin, callback) {
    path = parseFilePath(path);
    let ext = path.fileExt;
    if (ext) {
        if (ext == '.c') {
            c_support.runCFile(path.filePath, path.fileName, stdin, function (stdout, stderr) {
                callback(stdout, stderr, undefined);
            });
        }
        else if (ext == '.cpp') {
            cpp_support.runCppFile(path.filePath, path.fileName, stdin, function (stdout, stderr) {
                callback(stdout, stderr, undefined);
            });
        }
        else if (ext == '.java') {
            java_support.runJavaFile(path.filePath, path.fileName, stdin, function (stdout, stderr) {
                callback(stdout, stderr, undefined);
            });
        }
        else if (ext == '.py') {
            python_support.runPythonFile(path.filePath, path.fileName, stdin, function (stdout, stderr) {
                callback(stdout, stderr, undefined);
            });
        }
        else if (ext == '.js') {
            node_support.runNodeFile(path.filePath, path.fileName, stdin, function (stdout, stderr) {
                callback(stdout, stderr, undefined);
            });
        }
        else {
            callback(undefined, undefined, "This file extension is not supported");
        }
    }
    else {
        callback(undefined, undefined, "No Extension specified in file path")
    }
}
module.exports = {
    runC: c_support.runC
    , runCpp: cpp_support.runCpp
    , runJava: java_support.runJava
    , runPython: python_support.runPython
    , runNode: node_support.runNode
    , runFile: runFile
    , options: {
    }
}