const Sequelize = require('sequelize');
const sequelize = require('./../../config/mysql');

var {Santiye} = require('./../lokasyon/santiye');
var {Istasyon} = require('./../lokasyon/istasyon');
var {YakitTuru} = require('./yakitTuru');
var {CariKart} = require('./cariKart');

const YakitFiyat = sequelize.define('yakitFiyat', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cariKartId : { type: Sequelize.INTEGER, allowNull: false, unique: false , field: 'cari_kart_id'},
    santiyeId: { type:  Sequelize.INTEGER, allowNull: false , field: 'santiye_id'},
    istasyonId: { type:  Sequelize.INTEGER, allowNull: false , field: 'istasyon_id'},
    yakitTuruId : {type:  Sequelize.INTEGER, allowNull: false , field: 'yakit_tur_id'},    
    baslangicTarihi: { type:  Sequelize.DATEONLY, allowNull: false , field: 'baslangic_tarihi'},
    bitisTarihi: { type:  Sequelize.DATEONLY, allowNull: true , field: 'bitis_tarihi'},
    fiyat : { type:Sequelize.DECIMAL,allowNull:false,field:'fiyat'},
    olusturanKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'olusturan_kullanici'},
    guncelleyenKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'guncelleyen_kullanici'},    
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
},
{ tableName : "t_hafriyat_yakit_fiyat",  freezeTableName: true });

YakitFiyat.belongsTo(CariKart, {foreignKey: 'cari_kart_id', targetKey: 'id'}); 
YakitFiyat.belongsTo(Santiye, {foreignKey: 'santiye_id', targetKey: 'id'}); 
YakitFiyat.belongsTo(Istasyon, {foreignKey: 'istasyon_id', targetKey: 'id'}); 
YakitFiyat.belongsTo(YakitTuru, {foreignKey: 'yakit_tur_id', targetKey: 'id'}); 

YakitFiyat.sync();

module.exports = { YakitFiyat };