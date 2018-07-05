const Sequelize = require('sequelize');
const sequelize = require('./../../config/mysql');
var {CariKart} = require('./../isletme/cariKart');

const Santiye = sequelize.define('santiye', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: true , field: 'ad'},
    cariKartId : { type: Sequelize.INTEGER, allowNull: false, unique: true , field: 'cari_kart_id' },
    olusturanKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'olusturan_kullanici'},
    guncelleyenKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'guncelleyen_kullanici'},    
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
},
{   tableName : "t_hafriyat_santiye",  freezeTableName: true });

Santiye.belongsTo(CariKart, {foreignKey: 'cari_kart_id', targetKey: 'id'}); 

Santiye.sync();

module.exports = { Santiye };