const Sequelize = require('sequelize');
const sequelize = require('./../../config/mysql');

var {CariKart} = require('./../isletme/cariKart');
var {Santiye} = require('./santiye');
var {Guzergah} = require('./guzergah');
var {AracTur} = require('./../arac/aracTur');


const GuzergahFiyat = sequelize.define('guzergahFiyat', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }, 
    cariKartId : { type: Sequelize.INTEGER, allowNull: false, unique: true , field: 'cari_kart_id'},
    santiyeId : { type:  Sequelize.INTEGER, allowNull: false , field: 'santiye_id'},
    guzergahId : { type:  Sequelize.INTEGER, allowNull: false , field: 'guzergah_id'},
    aracTurId : { type:  Sequelize.INTEGER, allowNull: false , field: 'arac_tur_id'},
    mesafe : { type:  Sequelize.DECIMAL, allowNull: true , field: 'mesafe'},
    aciklama : { type:  Sequelize.STRING, allowNull: true , field: 'aciklama'},
    baslangicTarihi : { type:  Sequelize.DATEONLY, allowNull: false , field: 'baslangic_tarihi'},
    bitisTarihi : { type:  Sequelize.DATEONLY, allowNull: true , field: 'bitis_tarihi'},
    fiyat : { type:Sequelize.DECIMAL,allowNull:false,field:'fiyat'},
    litre : { type:Sequelize.DECIMAL,allowNull:false,field:'litre'},
    olusturanKullanici : { type:  Sequelize.INTEGER, allowNull: true  , field: 'olusturan_kullanici'},
    guncelleyenKullanici : { type:  Sequelize.INTEGER, allowNull: true  , field: 'guncelleyen_kullanici'},    
    isDeleted : { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
},
{   tableName : "t_hafriyat_guzergah_fiyat" ,  freezeTableName: true  });

GuzergahFiyat.belongsTo(CariKart, {foreignKey: 'cari_kart_id', targetKey: 'id'}); 
GuzergahFiyat.belongsTo(Santiye, {foreignKey: 'santiye_id', targetKey: 'id'}); 
GuzergahFiyat.belongsTo(Guzergah, {foreignKey: 'guzergah_id', targetKey: 'id'}); 
GuzergahFiyat.belongsTo(AracTur, {foreignKey: 'arac_tur_id', targetKey: 'id'}); 

GuzergahFiyat.sync();

module.exports = { GuzergahFiyat };