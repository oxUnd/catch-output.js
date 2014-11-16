var Stream = require('stream').Stream;
var util = require('util');

module.exports = StringStream;

function StringStream() {
    Stream.apply(this);
    this.memory = '';
    this.readable = false;
    this.writable = true;
}

util.inherits(StringStream, Stream);

StringStream.prototype.write = function (s) {
    this.memory += s;
};

StringStream.prototype.toString = function () {
    return this.memory;
};