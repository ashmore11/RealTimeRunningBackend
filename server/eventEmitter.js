var EventEmitter = require('events');
var util         = require('util');

function Emitter() {

  EventEmitter.call(this);

}

util.inherits(Emitter, EventEmitter);

var emitter = new Emitter();

module.exports = emitter;
