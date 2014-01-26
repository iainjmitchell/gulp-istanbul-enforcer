require('istanbul/lib/register-plugins');
var commandFactory = require('istanbul/lib/command'),
	streamWrapper = require('through2');

module.exports = function(){
	commandFactory.create('check-coverage');

	var stream = streamWrapper.obj(function(){
	});
	return stream;
};