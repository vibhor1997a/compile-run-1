const { spawn } = require("child_process");
const path = require('path');
const os = require('os');
var fs = require('fs');

/**
 * @callback stdErrOutCallback
 * @param {string} stdout stdout from the program
 * @param {string} stderr stderr from the program
 */

/**
 * Compiles cpp file using gcc and then runs the executable and
 * executes the callback with stderr and stdout
 * @param {string} filepath Path like string
 * @param {string} fileName Name of the file
 * @param {string} stdin stdin
 * @param {stdErrOutCallback} callback Callback function
 */
function runCppFile(filepath, fileName, stdin, callback) {
    var proc = spawn('gcc', [path.join(filepath, fileName + ".cpp"), "-o", path.join(filepath, fileName), '-lstdc++']);
    var stdout = "";
    var stderr = "";
    var f = false;
    var timeout = setTimeout(function () {
        proc.stdin.pause();
        proc.kill();
        f = true;
    }, 2000);
    proc.stderr.on('data', function (_stderr) {
        stderr += _stderr;
    });
    proc.stderr.on('end', function () {
        proc.kill();
        f = true;
    });
    proc.on('close', function (code) {
        proc.kill();
        f = true;
        if (code == 0) {
            let ext = (os.type == 'Windows_NT') ? '.exe' : '';
            var proc1 = spawn(path.join(filepath, fileName + ext));
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
                proc.kill();
                fl = true;
            });
            proc1.stderr.on('data', function (_stderr) {
                stderr1 += _stderr;
            });
            proc1.stderr.on('end', function () {
                proc.kill();
                fl = true;
            });
            proc1.on('close', function (code) {
                if (code == 0) callback(stdout1, "");
                else {
                    callback("", stderr);
                }
            });
            if (fl) {
                clearTimeout(timeout1);
            }
        }
        else {
            callback("", stderr);
        }
    });
    if (f) {
        clearTimeout(timeout);
    }
}

/**
 * @callback ErrorCallback
 * @param {string} stdout stdout from the program
 * @param {string} stderr stderr from the program
 * @param {Error|string} err Error
 */

/**
 * Runs the cpp code provided as a string 
 * @param {string} code Source code to be executed
 * @param {string} stdin stdin
 * @param {ErrorCallback} callback 
 */
function runCpp(code, stdin, callback) {
    if (!fs.existsSync(path.join(__dirname, 'code'))) {
        fs.mkdirSync(path.join(__dirname, 'code'), 0744);
    }
    if (!fs.existsSync(path.join(__dirname, 'code', 'cpp'))) {
        fs.mkdirSync(path.join(__dirname, 'code', 'cpp'), 0744);
    }
    var fileName = 'Source-' + Math.floor(Math.random() * 100000) + '-' + new Date().getTime();
    //Writes source file..
    fs.writeFile(path.join(__dirname, 'code', 'cpp', fileName + '.cpp'), code, function (err) {
        if (!err) {
            runCppFile(path.join(__dirname, 'code', 'cpp'), fileName, stdin, function (stdout, stderr) {
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
    runCpp: runCpp
    , runCppFile: runCppFile
}