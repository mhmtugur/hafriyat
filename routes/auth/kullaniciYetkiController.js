const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const {User} = require('./user');
const {Yetki} = require('./yetki');
const {KullaniciYetki} = require('./kullaniciYetki');

const KullaniciYetkiController = {
    kullaniciYetkiSil : function(req, res) {
        var userId = req.params.userId;
        var yetkiId = req.params.yetkiId;
        KullaniciYetki.destroy({where: {userId: userId, yetkiId: yetkiId} }).catch(function(err) {
            console.log(err, req.body);
            res.status(400).send({ message: err });
        });
    },
    kullaniciYetkiEkle : function(req, res) {
        var userId = req.params.userId;
        var yetkiId = req.params.yetkiId;
        
        KullaniciYetki.destroy({where: {userId: userId, yetkiId: yetkiId} }).then(() => {
            var kullaniciYetki = KullaniciYetki.build({userId: userId, yetkiId: yetkiId});
            kullaniciYetki.save();
        }).catch(function(err) {});
        
    }
}

module.exports = {YetkiController};//bunu kullanirken var {User} = require('/../../user'); gibi kullanmalisin