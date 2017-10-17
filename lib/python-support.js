var spawn = require("child_process").spawn;
var fs = require('fs');
var runPythonFile = function (filepath, fileName, stdin, callback) {
        var proc1 = spawn('python', [filepath + fileName + '.py']);
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
    /*Async function to run py code and pass stdout,stderr to the callback fn*/
var runPython = function (code, stdin, callback) {
    if (!fs.existsSync('./code')) {
        fs.mkdirSync('./code', 0744);
    }
    if (!fs.existsSync('./code/python')) {
        fs.mkdirSync('./code/python', 0744);
    }
    var fileName = 'Source-' + Math.floor(Math.random() * 100000) + '-' + new Date().getTime();
    fs.writeFile('./code/python/' + fileName + '.py', code, function (err) {
        if (!err) {
            runPythonFile('./code/python/', fileName, stdin, function (stdout, stderr) {
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
    runPython: runPython
    , runPythonFile: runPythonFile
}