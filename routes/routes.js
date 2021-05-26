const fastify = require("fastify")({
  logger: true
})
const sequilize = require("sequelize")
const qs = require("qs")
const routes = async (fastify, done) => {
      fastify.register(require('point-of-view'), {
            engine: {
            ejs: require('ejs')
            }
      })
      var ejs = require('ejs')
      fastify.addContentTypeParser('application/x-www-form-urlencoded', function (request, payload, done) {
         let body = ''
         payload.on('data', function (data) {
           body += data
         })
         payload.on('end', async function () {
            try {
              const parsed = await qs.parse(body)
              done(null, parsed)
              done()
            } catch (e) {
              done(e)
            }
        })
      })
      fastify.post('/', async (req, reply) => {
          var request_body = req.body
          if (request_body != undefined) {
              var check = await fastify.user.findOne({ 
                where: { 
                  email: request_body.email 
                } 
              })
              console.log('bottom check :' + check + '\n\n\n')
              if (check == null) {
                const user = await fastify.user.create({ 
                  firstname: request_body.firstname, 
                  lastname: request_body.lastname, 
                  email: request_body.email, 
                  address: request_body.address, 
                  password: request_body.password 
                });
                if (user) {
                   let data = ["successfully added in table"]
                   html = ejs.render('<%= data.join(", "); %>', { data: data });
                   reply.view('./views/signup.ejs', { html })
                }
               else {
                   let data = ["entry into database failed"]
                   html = ejs.render('<%= data.join(", "); %>', { data: data });
                   reply.view('./views/signup.ejs', { html })
               }
              }
              else {
                 let data = ["use another email"]
                 html = ejs.render('<%= data.join(", "); %>', { data: data });
                 reply.view('./views/signup.ejs', { html })
              }

          }
      })
      fastify.get('/', async (req, reply) => {
          let people = []
          html = ejs.render('<%= people.join(", "); %>', { people: people });
          await reply.view('./views/signup.ejs', { html })
      })
}
module.exports = routes
