const Sequelize = require('sequelize');
const sequelize = require('./../../config/mysql');

const {AracKategori} = require('./aracKategori');
const {AracMarka} = require('./aracMarka');
const {AracTur} = require('./aracTur');
const {CariKart} = require('./../isletme/cariKart');

const Arac = sequelize.define('arac', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    plaka : { type: Sequelize.STRING, allowNull: false, unique: true },
    cariKartId : { type: Sequelize.INTEGER, allowNull: false, unique: true , field: 'cari_kart_id'},
    depoKapasite: { type:  Sequelize.DECIMAL, allowNull: false , field: 'depo_kapasite'},
    aracTurId: { type:  Sequelize.INTEGER, allowNull: false , field: 'arac_tur_id'},
    aracKategoriId:  { type:  Sequelize.INTEGER, allowNull: false  , field: 'arac_kategori_id'},
    aracMarkaId:  { type:  Sequelize.INTEGER, allowNull: false , field: 'arac_marka_id'},
    aracModel: { type:  Sequelize.STRING, allowNull: true  , field: 'arac_model'},
    olusturanKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'olusturan_kullanici'},
    guncelleyenKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'guncelleyen_kullanici'},
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
},  
{   tableName : "t_hafriyat_arac" ,  freezeTableName: true  }
);

Arac.belongsTo(AracTur, {foreignKey: 'arac_tur_id', targetKey: 'id'}); 
Arac.belongsTo(AracKategori, {foreignKey: 'arac_kategori_id', targetKey: 'id'}); 
Arac.belongsTo(AracMarka, {foreignKey: 'arac_marka_id', targetKey: 'id'}); 
Arac.belongsTo(CariKart, {foreignKey: 'cari_kart_id', targetKey: 'id'}); 

Arac.sync();

module.exports = { Arac };

