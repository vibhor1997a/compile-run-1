const { spawn } = require("child_process");
const fs = require('fs');
const path = require('path');

/**
 * @callback stdErrOutCallback
 * @param {string} stdout stdout from the program
 * @param {string} stderr stderr from the program
 */

/**
 * executes the javascript code and then executes the callback with stderr and stdout
 * @param {string} filepath Path like string
 * @param {string} fileName Name of the file
 * @param {string} stdin stdin
 * @param {stdErrOutCallback} callback Callback function
 */
function runNodeFile(filepath, fileName, stdin, callback) {
    var proc1 = spawn('node', [path.join(filepath, fileName + '.js')]);
    var stdout1 = "";
    var stderr1 = "";
    var fl = false;
    var timeout1 = setTimeout(function () {
        proc1.stdin.pause();
        proc1.kill();
        fl = true;
    }, 2000);
    if (stdin) {
        proc1.stdin.write(stdin + "\n");
        proc1.stdin.end();
    }
    proc1.stdout.on('data', function (_stdout) {
        stdout1 += _stdout;
    });
    proc1.stdout.on('end', function () {
        fl = true;
    });
    proc1.stderr.on('data', function (_stderr) {
        stderr1 += _stderr;
    });
    proc1.stderr.on('end', function () {
        fl = true;
    });
    proc1.on('close', function (code) {
        if (code == 0) callback(stdout1, "", "");
        else {
            callback("", stderr1, "");
        }
    });
    if (fl) {
        clearTimeout(timeout1);
    }
}

/**
 * @callback ErrorCallback
 * @param {string} stdout stdout from the program
 * @param {string} stderr stderr from the program
 * @param {Error|string} err Error
 */

/**
 * Runs the JavaScript(Node.js) code provided as a string 
 * @param {string} code Source code to be executed
 * @param {string} stdin stdin
 * @param {ErrorCallback} callback 
 */
var runNode = function (code, stdin, callback) {
    if (!fs.existsSync(path.join(__dirname, 'code'))) {
        fs.mkdirSync(path.join(__dirname, 'code'), 0744);
    }
    if (!fs.existsSync(path.join(__dirname, 'code', 'node'))) {
        fs.mkdirSync(path.join(__dirname, 'code', 'node'), 0744);
    }
    var fileName = 'Source-' + Math.floor(Math.random() * 100000) + '-' + new Date().getTime();
    console.log(path.join(__dirname, 'code', 'node', fileName + '.js'));
    fs.writeFile(path.join(__dirname, 'code', 'node', fileName + '.js'), code, function (err) {
        if (!err) {
            runNodeFile(path.join(__dirname, 'code', 'node'), fileName, stdin, function (stdout, stderr) {
                callback(stdout, stderr, "");
            });
        }
        else {
            console.log(err);
            callback("", "", "Couldn't write the file!");
        }
    });
}
module.exports = {
    runNode: runNode
    , runNodeFile: runNodeFile
}