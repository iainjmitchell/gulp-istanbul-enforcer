require('istanbul/lib/register-plugins');

var commandFactory = require('istanbul/lib/command'),
	streamWrapper = require('through2');

var GulpIstanbulEnforcerFactory = function(){
	this.create = function(options){
		var command = commandFactory.create('check-coverage');

		var stream = streamWrapper.obj(function(){
			command.run(['--statements=' + options.statements]);
		});
		return stream;
	};
};

module.exports = new GulpIstanbulEnforcerFactory().create;