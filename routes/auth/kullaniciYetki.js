const Sequelize = require('sequelize');
const sequelize = require('./../../config/mysql');
const {User} = require('./user');
const {Yetki} = require('./yetki');

const KullaniciYetki = sequelize.define('kullaniciYetki', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true}
}, {
    tableName: 't_hafriyat_kullanici_yetki',  freezeTableName: true
});

KullaniciYetki.belongsTo(User);
KullaniciYetki.belongsTo(Yetki);

//create table
KullaniciYetki.sync();

module.exports = {KullaniciYetki};