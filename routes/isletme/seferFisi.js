const Sequelize = require('sequelize');
const sequelize = require('./../../config/mysql');

var {Santiye} = require('./../lokasyon/santiye');
var {Guzergah} = require('./../lokasyon/guzergah');
var {CariKart} = require('./../isletme/cariKart');
var {YakitFisi} = require('./../isletme/yakitFisi');
var {Arac} = require('./../arac/arac');

const SeferFisi = sequelize.define('seferFisi', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    santiyeId: { type:  Sequelize.INTEGER, allowNull: false , field: 'santiye_id'},
    guzergahId: { type:  Sequelize.INTEGER, allowNull: false , field: 'guzergah_id'},
    cariKartId : { type: Sequelize.INTEGER, allowNull: true, field: 'cari_kart_id'},
    tarih: { type:  Sequelize.DATEONLY, allowNull: false , field: 'tarih'},
    seriNo:  { type:  Sequelize.STRING, allowNull: true , field: 'seri_no'},
    siraNo:  { type:  Sequelize.INTEGER, allowNull: true , field: 'sira_no'},
    aracId: { type:  Sequelize.INTEGER, allowNull: false , field: 'arac_id'},
    dokumFisNo: { type:  Sequelize.INTEGER, allowNull: false , field: 'dokum_fis_no'},
    santiyeCikisSaati: { type:  Sequelize.DATE, allowNull: false , field: 'santiye_cikis_saati'},
    aciklama: { type:  Sequelize.STRING, allowNull: true , field: 'aciklama'},
    odemeDurumu : { type:  Sequelize.BOOLEAN, allowNull: true , field: 'odeme_durumu'},
    yakitFisId: { type:  Sequelize.INTEGER, allowNull: true , field: 'yakit_fis_id'},
    dokumFisNo: { type:  Sequelize.INTEGER, allowNull: false , field: 'dokum_fis_no'},
    sofor : { type:  Sequelize.STRING, allowNull: true , field: 'sofor'},
    ton: { type:  Sequelize.DECIMAL, allowNull: false , field: 'ton'},
    olusturanKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'olusturan_kullanici'},
    guncelleyenKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'guncelleyen_kullanici'},    
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
},
{ tableName : "t_hafriyat_sefer_fisi",  freezeTableName: true });

SeferFisi.belongsTo(Santiye, {foreignKey: 'santiye_id', targetKey: 'id'}); 
SeferFisi.belongsTo(Guzergah, {foreignKey: 'guzergah_id', targetKey: 'id'}); 
SeferFisi.belongsTo(CariKart, {foreignKey: 'cari_kart_id', targetKey: 'id'}); 
SeferFisi.belongsTo(Arac, {foreignKey: 'arac_id', targetKey: 'id'}); 
SeferFisi.belongsTo(YakitFisi, {foreignKey: 'yakit_fis_id', targetKey: 'id'}); 

SeferFisi.sync();

module.exports = { SeferFisi };