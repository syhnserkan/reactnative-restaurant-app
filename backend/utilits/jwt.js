const expressJwt = require("express-jwt");

function authJwt() {
  const secretKey = process.env.SECRET_KEY;
  const api = process.env.API_URL;
  return expressJwt({
    secret: secretKey,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      {
        url: /\/api\/v1\/products(.*)/,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      }, // It is a regular expression.
      {
        url: /\/api\/v1\/categories(.*)/,
        methods: ["GET", "POST", "DELETE", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/users(.*)/,
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/orders(.*)/,
        methods: ["GET", "POST", "PUT", "UPDATE", "OPTIONS"],
      },
      `${api}/users/login`,
      `${api}/users/register`,
    ], //expect these urls we cannot access server.
  });
}

async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    // If he is not admin
    done(null, true); // it will be rejected
  }
  done(); // If he is admin
}

module.exports = authJwt;
