'use strict'

var OSS = require('ali-oss');
var STS = OSS.STS;
var co = require('co');

var sts = new STS({
	accessKeyId: 'LTAIFOVERjHNxsJU',
	accessKeySecret: 'xF9xWjqSyFiINibY1ClDvwiZbdaTcC',
});
var rolearn = 'acs:ram::1396335964037612:role/user';

var policy = {
	"Statement": [
	  {
		"Action": "sts:AssumeRole",
		"Effect": "Allow",
		"Resource": "acs:ram::1396335964037612:role/ramtestappwrite"
	  }
	],
	"Version": "1"
  }

class Service {

	getOssToken(req, res){
		var result = co(function* () {
			var token = yield sts.assumeRole(rolearn, policy, 15 * 60, 'taoosossss');
			res.json({
				token:token.credentials
			})
		}).catch(function (err) {
		});
		console.log(result)
	}
}

module.exports = new Service()