require('istanbul/lib/register-plugins');

var commandFactory = require('istanbul/lib/command'),
	streamWrapper = require('through2');

var GulpIstanbulEnforcerFactory = function(){
	this.create = function(){
		var command = commandFactory.create('check-coverage');

		var stream = streamWrapper.obj(function(){
			command.run(['--statements=90']);
		});
		return stream;
	};
};

module.exports = new GulpIstanbulEnforcerFactory().create;