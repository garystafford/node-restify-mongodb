var JSONFormatter = function(req, res, body) {
	if (!body) {
		if (res.getHeader('Content-Length') === undefined &&
			res.contentLength === undefined) {
			res.setHeader('Content-Length', 0);
		}
		return null;
	}

	if (body instanceof Error) {
		if((body.restCode || body.httpCode) && body.body) {
			body = body.body;
		}
		else {
			body = {
				message: body.message
			};
		}
	}

	if (Buffer.isBuffer(body)) {
		body = body.toString('base64');
	}

	var data = JSON.stringify(body, null, 2);

	if (res.getHeader('Content-Length') === undefined &&
		res.contentLength === undefined) {
		res.setHeader('Content-Length', Buffer.byteLength(data));
	}

	return data;
};

module.exports = JSONFormatter;
