const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('./../../config/mysql');

const User = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    id: { 
        type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
    },
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },
    surname: { type: Sequelize.STRING, allowNull: false },
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
   }, {
    tableName: 't_hafriyat_user',  freezeTableName: true
   });

   //sadece ilgili objenin fonksiyonu
User.prototype.comparePasswords = function(password) {
    return bcrypt.compareSync(password, this.password);
};

//create table
User.sync();

module.exports = {User};//bunu kulanirken var {User} = require('/../../user'); gibi kullanmalisin