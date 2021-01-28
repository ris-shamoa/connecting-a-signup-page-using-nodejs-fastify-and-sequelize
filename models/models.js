const fp = require("fastify-plugin");
const Sequelize = require("sequelize");

const Model = Sequelize.Model;

class audit_trail2 extends Model {}

async function auditTrail2(fastify, __) {
    const sequelize = fastify.db;
    audit_trail2.init({
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
        modelName: "audit_trail2",
        tableName: "user2"
    });
    
    audit_trail2
        .sync()
        .then(() => {
            fastify.log.info("audit_trail2 table synced");
        })
        .catch((err) =>
            fastify.log.error(
                "failed to create audit_trail2 table with error: " + err
            )
        );


    fastify.decorate("audit_trail2", audit_trail2);
}
module.exports = fp(auditTrail2);
