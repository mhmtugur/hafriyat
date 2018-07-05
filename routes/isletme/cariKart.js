const Sequelize = require('sequelize');
const sequelize = require('./../../config/mysql');

var {Sirket} = require('./sirket');
var {Sahis} = require('./sahis');

const CariKart = sequelize.define('cariKart', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: true , field: 'ad'},
    tur :  {type:  Sequelize.INTEGER, allowNull: false , field: 'tur'}, // tur icin HIZMET VERILEN FIRMA : 1, HIZMET ALINAN FIRMA : 2, SAHIS : 3 
    sirketId :   {type:  Sequelize.INTEGER, allowNull: true , field: 'sirket_id'},  
    sahisId :   {type:  Sequelize.INTEGER, allowNull: true , field: 'sahis_id'},  
    olusturanKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'olusturan_kullanici'},
    guncelleyenKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'guncelleyen_kullanici'},    
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
},
{ tableName : "t_hafriyat_cari_kart" ,  freezeTableName: true});

CariKart.belongsTo(Sirket, {foreignKey: 'sirket_id', targetKey: 'id'}); 
CariKart.belongsTo(Sahis, {foreignKey: 'sahis_id', targetKey: 'id'}); 

CariKart.sync();

module.exports = { CariKart };