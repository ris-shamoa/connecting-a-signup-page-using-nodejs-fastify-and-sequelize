const fp = require('fastify-plugin')
const Sequelize = require('sequelize')
const AutoLoad = require('fastify-autoload')
const path = require("path");


async function dbConnector(fastify, options) {
    let config = {
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 60000,
            idle: 10000
        }
    }
    console.log(process.env.NODE_ENV)
    console.log("===================",process.env.PORT_LOCAL)
    //INCASE OF LOCAL DEVELOPMENT
    config.host = '127.0.0.1';
    config.port = '3306';
    config.username = 'root';
    config.password = 'risalatshamoa786';
    config.database = 'first_db';
    //Connecting the Database
    const sequelize = new Sequelize(config)

    let err = await sequelize.authenticate()
    if (err) {
        fastify.log.error("failed to connect to DB")
        fastify.log.error("ERROR: " + err);
    } 
    else {
        fastify.log.info("Environment - " + process.env.NODE_ENV)
        fastify.log.info(
            "Database connected to " + config.host + ":" + config.port
        )
        fastify.decorate("db", sequelize)
        //Create Sequelize models in './../models' dir
        fastify.register(AutoLoad, {
            dir: path.join(options.rootDir, "models"),
            options: Object.assign({}, {}),
        });
    }
}
module.exports = fp(dbConnector)