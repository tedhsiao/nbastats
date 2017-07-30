const jwt = require("express-jwt");
const config = require("./config/config");

module.exports.protectedAPI = jwt({
  secret: config.auth0Signature,
  credentialsRequired: true,
  getToken: function fromHeaderOrQuerystring(req) {
    if (req.headers["x-auth-token"]) {
      return req.headers["x-auth-token"];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
});
