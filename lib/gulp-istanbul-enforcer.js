require('istanbul/lib/register-plugins');
var commandFactory = require('istanbul/lib/command');

module.exports = function(){
	commandFactory.create('check-coverage');
};