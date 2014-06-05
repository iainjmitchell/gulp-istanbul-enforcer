require('istanbul/lib/register-plugins');

var commandFactory = require('istanbul/lib/command'),
	streamWrapper = require('through2'),
	PluginError = require('gulp-util').PluginError;

var CheckCoverageArgumentBuilder = function(){
	this.build = function(options){
		return [
			'--statements=' + options.thresholds.statements,
			'--branches=' + options.thresholds.branches,
			'--lines=' + options.thresholds.lines,
			'--functions=' + options.thresholds.functions,
			'--dir=' + options.coverageDirectory,
			'--root=' + options.rootDirectory
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

	this.create = function(options){
		var checkCoverageCommand = commandFactory.create('check-coverage');

		return streamFactory.create(function(done){
			var self = this,
				checkCoverageArguments = checkCoverageArgumentBuilder.build(options);
			
			checkCoverageCommand.run(checkCoverageArguments, function(error){
				if (error){
					var pluginError = new PluginError('gulp-istanbul-enforcer', error);
					self.emit('error', pluginError);
				}
                self.emit('end');
				done();
			});
		});
	};
};

module.exports = new GulpIstanbulEnforcerFactory().create;