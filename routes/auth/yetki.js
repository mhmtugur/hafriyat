const Sequelize = require('sequelize');
const sequelize = require('./../../config/mysql');

const Yetki = sequelize.define('yetki', {
        id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
        ad: { type: Sequelize.STRING, allowNull: false, unique: true }
    }, {
        tableName: 't_hafriyat_yetki',  freezeTableName: true
    });

//create table
Yetki.sync();

module.exports = {Yetki};