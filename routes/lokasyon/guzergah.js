const Sequelize = require('sequelize');
const sequelize = require('./../../config/mysql');

var {Santiye} = require('./santiye');
var {DokumSahasi} = require('./dokumSahasi');

const Guzergah = sequelize.define('guzergah', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: true , field: 'ad'},
    santiyeId: { type:  Sequelize.INTEGER, allowNull: false , field: 'santiye_id'},
    dokumSahasiId: { type:  Sequelize.INTEGER, allowNull: false , field: 'dokum_sahasi_id'},
    mesafe: { type:  Sequelize.DECIMAL, allowNull: false , field: 'mesafe'},
    aciklama: { type:  Sequelize.STRING, allowNull: true , field: 'aciklama'},
    olusturanKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'olusturan_kullanici'},
    guncelleyenKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'guncelleyen_kullanici'},    
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
},
{   tableName : "t_hafriyat_guzergah" ,  freezeTableName: true  });

Guzergah.belongsTo(Santiye, {foreignKey: 'santiye_id', targetKey: 'id'}); 
Guzergah.belongsTo(DokumSahasi, {foreignKey: 'dokum_sahasi_id', targetKey: 'id'}); 

Guzergah.sync();

module.exports = { Guzergah };