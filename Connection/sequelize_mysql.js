const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('manage_product', 'root', 'password', {
    host: 'localhost',
    dialect: "mysql",
    // logging: true,
    // freezeTableName: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
module.exports = sequelize