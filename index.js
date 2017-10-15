var c_support = require('./lib/c-support.js');
var cpp_support = require('./lib/cpp-support.js');
var java_support=require('./lib/java-support.js');
var python_support=require('./lib/python-support.js');
var node_support=require('./lib/node-support.js');

module.exports = {
    runC: c_support.runC
    , runCpp: cpp_support.runCpp
    , runJava: java_support.runJava
    , runPython: python_support.runPython
    , runNode: node_support.runNode
}