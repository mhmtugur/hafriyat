const Sequelize = require('sequelize');
const sequelize = require('./../../config/mysql');

const Sahis = sequelize.define('sahis', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: false , field: 'ad'},
    adres:  { type:  Sequelize.STRING, allowNull: true , field: 'adres'},
    telefon:  { type:  Sequelize.STRING, allowNull: true , field: 'telefon'},
    tcKimlikNo:  { type:  Sequelize.NUMERIC, allowNull: true , field: 'tc_kimlik_no'},
    olusturanKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'olusturan_kullanici'},
    guncelleyenKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'guncelleyen_kullanici'},    
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
},
{ tableName : "t_hafriyat_sahis", freezeTableName: true });

Sahis.sync();

module.exports = { Sahis };