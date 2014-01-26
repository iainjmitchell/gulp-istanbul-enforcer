require('istanbul/lib/register-plugins');

var commandFactory = require('istanbul/lib/command'),
	streamWrapper = require('through2');

var GulpIstanbulEnforcerFactory = function(){
	this.create = function(){
		commandFactory.create('check-coverage');

		var stream = streamWrapper.obj(function(){
		});
		return stream;
	};
};

module.exports = new GulpIstanbulEnforcerFactory().create;