var rewire = require('rewire'),
	CoverageEnforcer = rewire('../lib/gulp-istanbul-enforcer');

require('chai').should();

describe('When coverage is enforced', function(){
	it('Then check-coverage istanbul command created', function(){
		var mockCommandFactory = {
				create : function(commandType){
					this.createType = commandType;
				}
			};
		CoverageEnforcer.__set__('commandFactory', mockCommandFactory);
		CoverageEnforcer();
		mockCommandFactory.createType.should.equal('check-coverage');
	});
});