const path = require("path");
const AutoLoad = require("fastify-autoload");

module.exports = function (fastify, opts, next) {
  console.log("-------------------",opts)

  opts = Object.assign(opts, { rootDir: __dirname }); // saving the original path in opts
  console.log("-------------------",opts)

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  //This will load all the schemas
//   fastify.register(AutoLoad, {
//     dir: path.join(__dirname, "schemas"),
//     options: Object.assign({}, opts),
//   });

  // This loads all routes defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });

  // Make sure to call next when done
  next();
};