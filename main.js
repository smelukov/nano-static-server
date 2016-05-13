'use strict';

const fs = require('fs'),
	path = require('path'),
	assert = require('assert');

let pathToConfig = process.argv.reduce((prev, a) => prev || a.match(/^--cfg=(.+)/), ''),
	config;

try {
	config = require(path.resolve(pathToConfig[1]));
	assert.equal(!!config.stubs, true);
	assert.equal(!!(typeof config.host === 'string' && config.host), true);
	assert.equal(!!(typeof config.port === 'number' && config.port > 0), true);
	assert.equal(!!(typeof config.cacheControl === 'string' && config.cacheControl), true);
	assert.equal(!!(typeof config.stubs.index === 'string' && config.stubs.index), true);
	assert.equal(!!(typeof config.stubs.error === 'string' && config.stubs.error), true);
	assert.equal(!!(typeof config.stubs.notFound === 'string' && config.stubs.notFound), true);
	assert.equal(!!(typeof config.mime.default === 'string' && config.mime.default), true);
} catch (e) {
	console.error('config not found or wrong, default will be used');
	config = require('./config.json');
}

config.root = path.resolve(config.root);

if (!fs.existsSync(config.root)) {
	fs.mkdirSync(config.root);
}

require('./server')(config);
