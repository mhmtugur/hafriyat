const Sequelize = require('sequelize');
const sequelize = require('./../../config/mysql');

var {Santiye} = require('./santiye');

const Istasyon = sequelize.define('istasyon', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: true , field: 'ad'},
    santiyeId: { type:  Sequelize.INTEGER, allowNull: false , field: 'santiye_id'},
    olusturanKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'olusturan_kullanici'},
    guncelleyenKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'guncelleyen_kullanici'},    
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
},
{   tableName : "t_hafriyat_istasyon",  freezeTableName: true });

Istasyon.belongsTo(Santiye, {foreignKey: 'santiye_id', targetKey: 'id'}); 

Istasyon.sync();

module.exports = { Istasyon };