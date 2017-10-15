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

Documentation
=============
1) Run C
```javascript
var compile_run = require('compile-run');
    compile_run.runNode(code, input, function (stdout, stderr, err) {
       console.log(stdout);
        console.log(stderr);
        console.log(err);
    });
});

```