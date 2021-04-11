// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
  })
  const path=require('path')

  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, './public'),
  
  })

  // Declare a route
  
  fastify.register(require("./app.js")); 
  
  // Run the server!
  fastify.ready(() => {
  console.log(fastify.printRoutes())
  // └── /
  //   ├── test (GET)
  //   │   └── /hello (GET)
  //   └── hello/world (GET)
})
  fastify.listen(9000, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`);
    
  })