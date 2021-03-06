
// snode hack work around
// preserve original body
function snodeOnionMiddleware(req, res, next) {
  // scope the damage of this...
  // so it doesn't affect file uploads
  if (req.method === 'POST' && req.path === '/loki/v1/lsrpc') {
    let resolver;
    req.lokiReady = new Promise(res => {
      resolver = res
    });
    let body = '';
    req.on('data', function (data) {
      body += data.toString();
    });
    req.on('end', function() {
      // preserve original body
      req.originalBody = body;
      // console.log('perserved', body);
      resolver(); // resolve promise
    });
  }
  next();
}

module.exports = {
  snodeOnionMiddleware: snodeOnionMiddleware
};
