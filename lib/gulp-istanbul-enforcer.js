require('istanbul/lib/register-plugins');

var commandFactory = require('istanbul/lib/command'),
	streamWrapper = require('through2');

var CheckCoverageArgumentBuilder = function(){
	this.build = function(thresholds){
		return [
			'--statements=' + thresholds.statements,
			'--branches=' + thresholds.branches,
			'--lines=' + thresholds.lines,
			'--functions=' + thresholds.functions
		];
	};
};

var StreamFactory = function(){
	this.create = function(onWriteFunction){
		var stream = streamWrapper.obj(onWriteFunction);
		return stream;
	};
};

var GulpIstanbulEnforcerFactory = function(){
	var checkCoverageArgumentBuilder = new CheckCoverageArgumentBuilder(),
		streamFactory = new StreamFactory();

	this.create = function(thresholds){
		var checkCoverageCommand = commandFactory.create('check-coverage');

		return streamFactory.create(function(){
			var checkCoverageArguments = checkCoverageArgumentBuilder.build(thresholds);
			checkCoverageCommand.run(checkCoverageArguments);
		});
	};
};

module.exports = new GulpIstanbulEnforcerFactory().create;