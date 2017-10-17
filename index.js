var c_support = require('./lib/c-support.js');
var cpp_support = require('./lib/cpp-support.js');
var java_support = require('./lib/java-support.js');
var python_support = require('./lib/python-support.js');
var node_support = require('./lib/node-support.js');
var fs = require('fs');
if (!fs.existsSync('./code')) {
    fs.mkdirSync('./code', 0744);
}
if (!fs.existsSync('./code/c')) {
    fs.mkdirSync('./code/c', 0744);
}
if (!fs.existsSync('./code/cpp')) {
    fs.mkdirSync('./code/cpp', 0744);
}
if (!fs.existsSync('./code/node')) {
    fs.mkdirSync('./code/node', 0744);
}
if (!fs.existsSync('./code/python')) {
    fs.mkdirSync('./code/python', 0744);
}
if (!fs.existsSync('./code/java')) {
    fs.mkdirSync('./code/java', 0744);
}
module.exports = {
    runC: c_support.runC
    , runCpp: cpp_support.runCpp
    , runJava: java_support.runJava
    , runPython: python_support.runPython
    , runNode: node_support.runNode
    , runCFile: c_support.runCFile
    , runCppFile:cpp_support.runCppFile
    , runJavaFile: java_support.runJavaFile
    , runNodeFile:node_support.runNodeFile
}