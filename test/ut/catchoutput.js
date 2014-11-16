var c = require('../../');

console.log('test'); //system

//sync
var s = c.catchOutput(function () {
    console.log('xxx');
    console.log('innerr');
});

console.log(s.toString()); //custom sync

//async
c.catchOutput(function (end) {
    console.log('right');
    var o = end();
    console.log(o.toString()); //custom async
});