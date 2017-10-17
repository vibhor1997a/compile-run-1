# compile-run
This is a node package which facilitates in compiling and running languages including java,c,c++,python and node. This can be used to create web services like online IDE's.

This package compiles the input code, takes stdin and gives stdout/stderr after the compilation on the host. This requires the compilers from the above languages to be installed for this package to function

Supported Languages 
===================
| Language | Support |
|---------|:-------:|
|C |&#x2714;|
|C++ | &#x2714; |
|Java | &#x2714; |
|Python | &#x2714; |
|Node.js | &#x2714; |

Prerequisites
=============
The following should be installed on your machine and their paths should be set(in case of windows machine). 

| Language | Software |
|---------|:-------:|
|C | gcc |
|C++ | gcc |
|Java | jdk or jre |
|Python | python 3 |
|Node.js | node.js |

This package requires access to file system to create directories to store source files.

Documentation
=============

## Compile and Run File

```javascript
var compile_run = require('compile-run');
    compile_run.runFile('./temp/script.py',stdin,function(stdout,stderr,err){
       if(!err){
       console.log(stdout);
        console.log(stderr);
        }
        else{
        console.log(err);
        }
    
    });
```

## Compile and Run code

### 1) Run Node
```javascript
var compile_run = require('compile-run');
    compile_run.runNode(code, input, function (stdout, stderr, err) {
       if(!err){
       console.log(stdout);
        console.log(stderr);
        }
        else{
        console.log(err);
        }
    });
});
```
### 2) Run C
```javascript
var compile_run = require('compile-run');
    compile_run.runC(code, input, function (stdout, stderr, err) {
       if(!err){
       console.log(stdout);
        console.log(stderr);
        }
        else{
        console.log(err);
        }
    });
});
```
### 3) Run Cpp
```javascript
var compile_run = require('compile-run');
    compile_run.runCpp(code, input, function (stdout, stderr, err) {
       if(!err){
       console.log(stdout);
        console.log(stderr);
        }
        else{
        console.log(err);
        }
    });
});
```
### 4) Run Python
```javascript
var compile_run = require('compile-run');
    compile_run.runPython(code, input, function (stdout, stderr, err) {
       if(!err){
       console.log(stdout);
        console.log(stderr);
        }
        else{
        console.log(err);
        }
    });
});
```
### 5) Run Java
```javascript
var compile_run = require('compile-run');
    compile_run.runJava(code, input, function (stdout, stderr, err) {
       if(!err){
       console.log(stdout);
        console.log(stderr);
        }
        else{
        console.log(err);
        }
    });
});
```