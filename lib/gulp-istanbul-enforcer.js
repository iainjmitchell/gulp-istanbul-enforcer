require('istanbul/lib/register-plugins');

var commandFactory = require('istanbul/lib/command'),
	streamWrapper = require('through2'),
	PluginError = require('gulp-util').PluginError;

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
	this.create = function(onEndFunction){
		var stream = streamWrapper.obj(function(file, encoding, done){
			this.push(file);
			done();
		}, onEndFunction);
		return stream;
	};
};

var GulpIstanbulEnforcerFactory = function(){
	var checkCoverageArgumentBuilder = new CheckCoverageArgumentBuilder(),
		streamFactory = new StreamFactory();

	this.create = function(thresholds){
		var checkCoverageCommand = commandFactory.create('check-coverage');

		return streamFactory.create(function(done){
			var self = this,
				checkCoverageArguments = checkCoverageArgumentBuilder.build(thresholds);
			
			checkCoverageCommand.run(checkCoverageArguments, function(error){
				if (error){
					self.emit('error', new PluginError('gulp-istanbul-enforcer', error));
				}
			});
			done();
		});
	};
};

module.exports = new GulpIstanbulEnforcerFactory().create;