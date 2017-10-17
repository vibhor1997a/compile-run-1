var spawn = require("child_process").spawn;
var fs = require('fs');
var runJavaFile = function (filepath, fileName, stdin, callback) {
        console.log(filepath, fileName)
        var proc = spawn('javac', [filepath + fileName + ".java"]);
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
                var proc1 = spawn('java', ['-cp', filepath, fileName]);
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
                    if (code == 0) callback(stdout1, "", "");
                    else {
                        callback("", stderr1, "");
                    }
                });
                if (fl) {
                    clearTimeout(timeout1);
                }
            }
            else {
                callback("", stderr, "");
            }
        });
        if (f) {
            clearTimeout(timeout);
        }
    }
    /*Async function to run java code and pass stdout,stderr to the callback fn*/
var runJava = function (code, stdin, callback) {
    if (!fs.existsSync('./code')) {
        fs.mkdirSync('./code', 0744);
    }
    if (!fs.existsSync('./code/java')) {
        fs.mkdirSync('./code/java', 0744);
    }
    var dir = 'source-' + new Date().getTime() + '-' + Math.floor(Math.random() * 100000);
    fs.mkdir('./code/java/' + dir, 0744, function (err) {
        if (!err) {
            var fileName = 'Main';
            fs.writeFile('./code/java/' + dir + '/' + fileName + '.java', code, function (err) {
                if (!err) {
                    runJavaFile('./code/java/' + dir + '/', fileName, stdin, function (stdout, stderr) {
                        callback(stdout, stderr, "");
                    });
                }
                else {
                    console.log(err);
                    callback("", "", "Couldn't write the file!");
                }
            });
        }
        else {
            console.log(err);
        }
    });
}
module.exports = {
    runJava: runJava
    , runJavaFile: runJavaFile
}