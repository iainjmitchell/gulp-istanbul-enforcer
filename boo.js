
var Command = require('istanbul/lib/command');
require('istanbul/lib/register-plugins');

var cmd = Command.create('check-coverage');
console.log('reachedx');

var args = [
	'--statements=90',
	'--branches=90',
	'--lines=90',
	'--functions=90'
];
cmd.run(args, function (err) {
    var passed = false;
    if (err) {
        console.log(err);
    } else {
        console.log('passed')
    }
});