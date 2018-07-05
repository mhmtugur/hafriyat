const Sequelize = require('sequelize');
const sequelize = require('./../../config/mysql');

var {CariKart} = require('./cariKart');
var {Santiye} = require('./../lokasyon/santiye');
var {Istasyon} = require('./../lokasyon/istasyon');
var {YakitTuru} = require('./yakitTuru');
var {Arac} = require('./../arac/arac');

const YakitFisi = sequelize.define('yakitFisi', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cariKartId : { type: Sequelize.INTEGER, allowNull: false, unique: true , field: 'cari_kart_id'},
    santiyeId: { type:  Sequelize.INTEGER, allowNull: false , field: 'santiye_id'},
    istasyonId: { type:  Sequelize.INTEGER, allowNull: false , field: 'istasyon_id'},
    yakitTuruId : {type:  Sequelize.INTEGER, allowNull: false , field: 'yakit_tur_id'},  
    aracId: { type:  Sequelize.INTEGER, allowNull: false , field: 'arac_id'},
    tarih: { type:  Sequelize.DATEONLY, allowNull: false , field: 'tarih'},
    seriNo:  { type:  Sequelize.STRING, allowNull: true , field: 'seri_no'},
    siraNo:  { type:  Sequelize.INTEGER, allowNull: true , field: 'sira_no'},
    litre : { type:Sequelize.DECIMAL,allowNull:false,field:'litre'},
    litreFiyat : { type:Sequelize.DECIMAL,allowNull:false,field:'litre_fiyat'},
    fisTutar : { type:Sequelize.DECIMAL,allowNull:false,field:'fis_tutar'},
    odemeDurumu : { type:  Sequelize.BOOLEAN, allowNull: true , field: 'odeme_durumu'},
    aciklama:  { type:  Sequelize.STRING, allowNull: true , field: 'aciklama'},
    olusturanKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'olusturan_kullanici'},
    guncelleyenKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'guncelleyen_kullanici'},    
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
},
{ tableName : "t_hafriyat_yakit_fisi",  freezeTableName: true });

YakitFisi.belongsTo(CariKart, {foreignKey: 'cari_kart_id', targetKey: 'id'}); 
YakitFisi.belongsTo(Santiye, {foreignKey: 'santiye_id', targetKey: 'id'}); 
YakitFisi.belongsTo(Istasyon, {foreignKey: 'istasyon_id', targetKey: 'id'}); 
YakitFisi.belongsTo(YakitTuru, {foreignKey: 'yakit_tur_id', targetKey: 'id'}); 
YakitFisi.belongsTo(Arac, {foreignKey: 'arac_id', targetKey: 'id'}); 

YakitFisi.sync();

module.exports = { YakitFisi };