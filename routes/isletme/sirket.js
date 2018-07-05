const Sequelize = require('sequelize');
const sequelize = require('./../../config/mysql');

const Sirket = sequelize.define('sirket', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: false , field: 'ad'},
    adres:  { type:  Sequelize.STRING, allowNull: true , field: 'adres'},
    telefon:  { type:  Sequelize.STRING, allowNull: true , field: 'telefon'},
    vergiNo:  { type:  Sequelize.NUMERIC, allowNull: true , field: 'vergi_no'},
    olusturanKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'olusturan_kullanici'},
    guncelleyenKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'guncelleyen_kullanici'},    
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
},
{ tableName : "t_hafriyat_sirket",  freezeTableName: true });

Sirket.sync();

module.exports = { Sirket };