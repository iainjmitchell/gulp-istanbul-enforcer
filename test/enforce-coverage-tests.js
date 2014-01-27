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
		var stream = CoverageEnforcer({});
		stream.write();
		stream.end();
		mockCommandFactory.createType.should.equal('check-coverage');
	});

	it('Then check-coverage command is started with statements level in arguments', function(){
		var mockCommand = new MockCommand(),
			statements = Math.random();
		CoverageEnforcer.__set__('commandFactory', new FakeCommandFactory(mockCommand));
		var stream = CoverageEnforcer({
			statements : statements
		});
		stream.write();
		stream.end();
		mockCommand.runArguments.should.include('--statements=' + statements);
	});

	it('Then check-coverage command is started with branches level in arguments', function(){
		var mockCommand = new MockCommand(),
			branches = Math.random();
		CoverageEnforcer.__set__('commandFactory', new FakeCommandFactory(mockCommand));
		var stream = CoverageEnforcer({
			branches : branches
		});
		stream.write();
		stream.end();
		mockCommand.runArguments.should.include('--branches=' + branches);
	});

	it('Then check-coverage command is started with lines level in arguments', function(){
		var mockCommand = new MockCommand(),
			lines = Math.random();
		CoverageEnforcer.__set__('commandFactory', new FakeCommandFactory(mockCommand));
		var stream = CoverageEnforcer({
			lines : lines
		});
		stream.write();
		stream.end();
		mockCommand.runArguments.should.include('--lines=' + lines);
	});
});