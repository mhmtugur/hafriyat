const Sequelize = require('sequelize');
const sequelize = require('./../../config/mysql');

const DokumSahasi = sequelize.define('dokumSahasi', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: true , field: 'ad'},
    aciklama: { type:  Sequelize.STRING, allowNull: true , field: 'aciklama'},
    olusturanKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'olusturan_kullanici'},
    guncelleyenKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'guncelleyen_kullanici'},    
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
},
{   tableName : "t_hafriyat_dokum_sahasi",  freezeTableName: true   });

DokumSahasi.sync();

module.exports = { DokumSahasi };