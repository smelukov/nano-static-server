'use strict';

module.exports = config => {
	const fs = require('fs'),
		path = require('path');

	return function handler(req, res, filePath) {
		const absFilePath = path.join(config.root, filePath),
			ext = path.extname(filePath).toLowerCase();

		fs.readFile(absFilePath, (err, data) => {
			if (err) {
				if (err.code === 'ENOENT') {
					res.statusCode = 404;

					if (filePath !== config.stubs.notFound) {
						handler(req, res, config.stubs.notFound);
					} else {
						res.end();
					}
				} else {
					res.statusCode = 500;
					handler(req, res, config.stubs.error);
				}
			} else {
				const modSince = req.headers['if-modified-since'] ? new Date(req.headers['if-modified-since']) : null,
					modTime = new Date(fs.statSync(absFilePath).mtime);

				res.setHeader('content-type', config.mime[ext] || config.mime.default);
				res.setHeader('cache-control', config.cacheControl);
				res.setHeader('last-modified', modTime.toUTCString());

				if (!modSince || modSince && modTime > modSince) {
					res.end(data);
				} else {
					res.statusCode = res.statusCode >= 400 ? res.statusCode : 304;
					res.end();
				}

				console.log(`${req.connection.remoteAddress} [${new Date()}] "${req.method} ${req.url}" ${res.statusCode}`);
			}
		});
	}
};
