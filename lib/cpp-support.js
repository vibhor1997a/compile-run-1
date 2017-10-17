var spawn = require("child_process").spawn;
var fs = require('fs');
/*Async function to run cpp code and pass stdout,stderr to the callback fn*/
var runCppFile = function (filepath, fileName, stdin, callback) {
    var proc = spawn('gcc', [filepath + '/' + fileName + ".cpp", "-o", filepath + '/' + fileName, '-lstdc++']);
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
            console.log(code);
            var proc1 = spawn(filepath + '/' + fileName + '.exe');
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
var runCpp = function (code, stdin, callback) {
    if (!fs.existsSync('./code')) {
        fs.mkdirSync('./code', 0744);
    }
    if (!fs.existsSync('./code/cpp')) {
        fs.mkdirSync('./cpp', 0744);
    }
    var fileName = 'Source-' + Math.floor(Math.random() * 100000) + '-' + new Date().getTime();
    //Writes source file..
    fs.writeFile('./code/cpp/' + fileName + '.cpp', code, function (err) {
        if (!err) {
            runCppFile('./code/cpp', fileName, stdin, function (stdout, stderr) {
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