const Sequelize = require('sequelize');
const sequelize = require('./../../config/mysql');

var {CariKart} = require('./../isletme/cariKart');
var {Santiye} = require('./../lokasyon/santiye');
var {Arac} = require('./../arac/arac');

const BorcAlacakFisi = sequelize.define('borcAlacakFisi', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cariKartId : { type: Sequelize.INTEGER, allowNull: false, unique: true , field: 'cari_kart_id'},
    santiyeId: { type:  Sequelize.INTEGER, allowNull: false , field: 'santiye_id'},
    tutar: { type:  Sequelize.DECIMAL, allowNull: false , field: 'tutar'},
    iskonto : { type:  Sequelize.DECIMAL, allowNull: true , field: 'iskonto'},
    sonTutar : { type:  Sequelize.DECIMAL, allowNull: false , field: 'son_tutar'},
    borcAlacakTur : { type:  Sequelize.BOOLEAN, allowNull: true , field: 'borc_alacak_tur'},
    tarih: { type:  Sequelize.DATEONLY, allowNull: false , field: 'tarih'},
    aciklama: { type:  Sequelize.STRING, allowNull: true , field: 'aciklama'},
    irsaliyeNo: { type:  Sequelize.STRING, allowNull: true , field: 'irsaliye_no'},
    aracId : { type:  Sequelize.INTEGER, allowNull: true , field: 'arac_id'},
    olusturanKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'olusturan_kullanici'},
    guncelleyenKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'guncelleyen_kullanici'},    
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
},
{ tableName : "t_hafriyat_borc_alacak_fisi" ,  freezeTableName: true});

BorcAlacakFisi.belongsTo(CariKart, {foreignKey: 'cari_kart_id', targetKey: 'id'}); 
BorcAlacakFisi.belongsTo(Santiye, {foreignKey: 'santiye_id', targetKey: 'id'}); 
BorcAlacakFisi.belongsTo(Arac, {foreignKey: 'arac_id', targetKey: 'id'}); 

BorcAlacakFisi.sync();

module.exports = { BorcAlacakFisi };