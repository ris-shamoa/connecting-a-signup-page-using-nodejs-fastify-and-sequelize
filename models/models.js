const fp = require("fastify-plugin");
const Sequelize = require("sequelize");

const Model = Sequelize.Model;

class user extends Model {}

async function User(fastify, __) {
    const sequelize = fastify.db;
    user.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lastname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        address: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: true,
        }
    }, {
        sequelize,
        modelName: "user",
        tableName: "user"
    });
    
    user
        .sync()
        .then(() => {
            fastify.log.info("user table synced");
        })
        .catch((err) =>
            fastify.log.error(
                "failed to create user table with error: " + err
            )
        );


    fastify.decorate("user", user);
}
module.exports = fp(User);
