var StringStream = require('./lib/string-stream.js');
var Console = require('console').Console;

var exports = module.exports;
var writers = {};
var cur = null;

Object.defineProperty(global, 'console', {
    enumerable : true,
    writable : true,
    value : console
});

exports.ob_start = function (id) {
    if (!id) {
        id = '__temp_fd';
    }
    cur = id;
    if (!writers[id]) {
        writers[id] = {
            _prev: process.stdout,
            fd: new StringStream()
        };
    }
    console = new Console(writers[id].fd, process.stderr);
};

exports.ob_end = function (id) {
    if (!id) {
        id = cur;
    }
    console = new Console(writers[id]._prev, process.stderr); //reset
    var fd = writers[id].fd;
    delete writers[id];
    return fd;
};

exports._isAsync = function (fn) {
    var source = fn.toString();
    return /function\s*\(\s*\w+\s*\)/.test(source)
};

exports.catchOutput = function (fn) {
    this.ob_start();
    var is_async = this._isAsync(fn);
    if (!is_async) {
        fn();
        return this.ob_end();
    } else {
        fn(this.ob_end);
    }
};