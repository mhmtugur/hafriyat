const Sequelize = require('sequelize');
const sequelize = require('./../../config/mysql');

const AracKategori = sequelize.define('aracKategori', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: true , field: 'ad'},
    olusturanKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'olusturan_kullanici'},
    guncelleyenKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'guncelleyen_kullanici'},    
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
},  
{   tableName : "t_hafriyat_arac_kategori" ,  freezeTableName: true  });

AracKategori.sync();

module.exports = { AracKategori };

