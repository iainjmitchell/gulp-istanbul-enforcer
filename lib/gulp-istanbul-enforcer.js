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

var GulpIstanbulEnforcerFactory = function(){
	var checkCoverageArgumentBuilder = new CheckCoverageArgumentBuilder();

	this.create = function(thresholds){
		var checkCoverageCommand = commandFactory.create('check-coverage');

		var stream = streamWrapper.obj(function(){
			var checkCoverageArguments = checkCoverageArgumentBuilder.build(thresholds);
			checkCoverageCommand.run(checkCoverageArguments);
		});
		return stream;
	};
};

module.exports = new GulpIstanbulEnforcerFactory().create;