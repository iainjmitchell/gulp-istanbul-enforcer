require('istanbul/lib/register-plugins');

var commandFactory = require('istanbul/lib/command'),
	streamWrapper = require('through2');

var CheckCoverageArgumentBuilder = function(){
	this.build = function(options){
		return ['--statements=' + options.statements];
	};
};

var GulpIstanbulEnforcerFactory = function(){
	var checkCoverageArgumentBuilder = new CheckCoverageArgumentBuilder();

	this.create = function(options){
		var checkCoverageCommand = commandFactory.create('check-coverage');

		var stream = streamWrapper.obj(function(){
			var checkCoverageArguments = checkCoverageArgumentBuilder.build(options);
			checkCoverageCommand.run(checkCoverageArguments);
		});
		return stream;
	};
};

module.exports = new GulpIstanbulEnforcerFactory().create;