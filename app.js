const path = require("path");
const AutoLoad = require("fastify-autoload");
module.exports = function (fastify, opts, next) {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins")
  });
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes")
  });
  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
  
  })
  next();
};