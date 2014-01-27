var rewire = require('rewire'),
	CoverageEnforcer = rewire('../lib/gulp-istanbul-enforcer');

require('chai').should();

describe('When coverage is enforced', function(){
	var MockCommand = function(){
			this.run = function(runArguments){
				this.runArguments = runArguments;
			};
		},
		FakeCommandFactory = function(command){
			this.create = function(){
				return command;
			};
		};

	it('Then check-coverage istanbul command created', function(){
		var mockCommandFactory = {
				create : function(commandType){
					this.createType = commandType;
					return new MockCommand();
				}
			};
		CoverageEnforcer.__set__('commandFactory', mockCommandFactory);
		var stream = CoverageEnforcer({thresholds : {}});
		stream.write();
		stream.end();
		mockCommandFactory.createType.should.equal('check-coverage');
	});

	it('Then check-coverage command is started with statements threshold in arguments', function(){
		var mockCommand = new MockCommand(),
			statements = Math.random();
		CoverageEnforcer.__set__('commandFactory', new FakeCommandFactory(mockCommand));
		var stream = CoverageEnforcer({
			thresholds : {
				statements : statements
			}
		});
		stream.write();
		stream.end();
		mockCommand.runArguments.should.include('--statements=' + statements);
	});

	it('Then check-coverage command is started with branches threshold in arguments', function(){
		var mockCommand = new MockCommand(),
			branches = Math.random();
		CoverageEnforcer.__set__('commandFactory', new FakeCommandFactory(mockCommand));
		var stream = CoverageEnforcer({
			thresholds : {
				branches : branches
			}
		});
		stream.write();
		stream.end();
		mockCommand.runArguments.should.include('--branches=' + branches);
	});

	it('Then check-coverage command is started with lines threshold in arguments', function(){
		var mockCommand = new MockCommand(),
			lines = Math.random();
		CoverageEnforcer.__set__('commandFactory', new FakeCommandFactory(mockCommand));
		var stream = CoverageEnforcer({
			thresholds : {
				lines : lines
			}
		});
		stream.write();
		stream.end();
		mockCommand.runArguments.should.include('--lines=' + lines);
	});

	it('Then check-coverage command is started with functions threshold in arguments', function(){
		var mockCommand = new MockCommand(),
			functions = Math.random();
		CoverageEnforcer.__set__('commandFactory', new FakeCommandFactory(mockCommand));
		var stream = CoverageEnforcer({
			thresholds : {
				functions : functions
			}
		});
		stream.write();
		stream.end();
		mockCommand.runArguments.should.include('--functions=' + functions);
	});

	it('Then check-coverage command is started with coverage directory in arguments', function(){
		var mockCommand = new MockCommand(),
			coverageDirectory = 'a random directory ' + Math.random();
		CoverageEnforcer.__set__('commandFactory', new FakeCommandFactory(mockCommand));
		var stream = CoverageEnforcer({
			thresholds : {},
			coverageDirectory : coverageDirectory
		});
		stream.write();
		stream.end();
		mockCommand.runArguments.should.include('--dir=' + coverageDirectory);
	});

	it('Then check-coverage command is started with root directory in arguments', function(){
		var mockCommand = new MockCommand(),
			rootDirectory = 'a random directory ' + Math.random();
		CoverageEnforcer.__set__('commandFactory', new FakeCommandFactory(mockCommand));
		var stream = CoverageEnforcer({
			thresholds : {},
			rootDirectory : rootDirectory
		});
		stream.write();
		stream.end();
		mockCommand.runArguments.should.include('--root=' + rootDirectory);
	});

	it('Then it should call the callback for the flush method', function (done) {
		var stream = CoverageEnforcer({thresholds : {}});
		stream._flush(function () {
			done();
		});
	});

	describe('And coverage is not meeting thresholds', function(){
		it('Then an error is reported to gulp from this plugin', function(done){
			var coverageNotMeetingThresholdsCommand = {
					run : function(runArguments, callback){
						callback('coverage issues');
					}
				};
			CoverageEnforcer.__set__('commandFactory', new FakeCommandFactory(coverageNotMeetingThresholdsCommand));
			var stream = CoverageEnforcer({thresholds : {}});
			stream.on('error', function(error){
				error.plugin.should.equal('gulp-istanbul-enforcer');
				done();
			});
			stream.write();
			stream.end();
		});

		it('Then an error contains the coverage issues', function(done){
			var coverageIssues = 'Some random issues ' + Math.random(),
				coverageNotMeetingThresholdsCommand = {
					run : function(runArguments, callback){
						callback(coverageIssues);
					}
				};
			CoverageEnforcer.__set__('commandFactory', new FakeCommandFactory(coverageNotMeetingThresholdsCommand));
			var stream = CoverageEnforcer({thresholds : {}});
			stream.on('error', function(error){
				error.message.should.equal(coverageIssues);
				done();
			});
			stream.write();
			stream.end();
		});
	});
});