'use strict';

module.exports = config => {
	const http = require('http'),
		urlLib = require('url'),
		handler = require('./handler')(config);

	let server = http.createServer();

	server.on('request', (req, res) => {
		const url = urlLib.parse(req.url);

		res.statusCode = 200;

		if (url.pathname.trim() === '/') {
			return handler(req, res, config.stubs.index);
		}

		if (url.pathname.includes('..')) {
			res.statusCode = 500;
			return handler(req, res, config.stubs.error);
		}

		handler(req, res, url.pathname);
	});

	return server.listen(config.port, config.host, () => {
		console.log('server is up', server.address());
	});
};
