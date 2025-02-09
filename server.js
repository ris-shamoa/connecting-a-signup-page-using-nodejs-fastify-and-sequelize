// Require the framework and instantiate it
  const fastify = require('fastify')({
    logger: true
  })
  const path=require('path')
  fastify.register(require("./app.js")); 
  // Run the server!
  fastify.listen(9000, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`);
    
  })