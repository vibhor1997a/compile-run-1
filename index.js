var c_support = require('./lib/c-support.js');
var cpp_support = require('./lib/cpp-support.js');
var java_support = require('./lib/java-support.js');
var python_support = require('./lib/python-support.js');
var node_support = require('./lib/node-support.js');
var fs = require('fs');
var parseFilePath = function (str) {
    var fileName = str.replace(/^.*[\\\/]/, '');
    var filePath = str.substr(0, str.indexOf(fileName));
    var tmp = fileName.split('.');
    var fileExt = '.' + tmp[tmp.length - 1];
    fileName = fileName.substr(0, fileName.indexOf(fileExt));
    return {
        fileName: fileName
        , filePath: filePath
        , fileExt: fileExt
    }
}
var runFile = function (path, stdin, callback) {
    path = parseFilePath(path);
    var ext = path.fileExt;
    if (ext) {
        if (ext == '.c') {
            c_support.runCFile(path.filePath, path.fileName, stdin, function (stdout, stderr) {
                callback(stdout, stderr, "");
            });
        }
        else if (ext == '.cpp') {
            cpp_support.runCppFile(path.filePath, path.fileName, stdin, function (stdout, stderr) {
                callback(stdout, stderr, "");
            });
        }
        else if (ext == '.java') {
            java_support.runJavaFile(path.filePath, path.fileName, stdin, function (stdout, stderr) {
                callback(stdout, stderr, "");
            });
        }
        else if (ext == '.py') {
            python_support.runPythonFile(path.filePath, path.fileName, stdin, function (stdout, stderr) {
                callback(stdout, stderr, "");
            });
        }
        else if (ext == '.js') {
            node_support.runNodeFile(path.filePath, path.fileName, stdin, function (stdout, stderr) {
                callback(stdout, stderr, "");
            });
        }
        else {
            callback("", "", "This file extension is not supported");
        }
    }
    else {
        callback("", "", "No Extension specified in file path")
    }
}
module.exports = {
    runC: c_support.runC
    , runCpp: cpp_support.runCpp
    , runJava: java_support.runJava
    , runPython: python_support.runPython
    , runNode: node_support.runNode
    , runFile: runFile
}