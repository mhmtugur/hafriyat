const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const {User} = require('./user');
const {Yetki} = require('./yetki');
const {KullaniciYetki} = require('./kullaniciYetki');

const YetkiController = {
    kullaniciYetkiEkle : function(req, res) {
        var userId = req.params.userId;
        var yetkiId = req.params.yetkiId;
        KullaniciYetki.destroy({where: {userId: userId, yetkiId: yetkiId} }).catch(function(err) {
            console.log(err, req.body);
            res.status(400).send({ message: err });
        });;
    },
    yetkiEkle : function(req, res) {
        var newAuth = Yetki.build(req.body);
        newAuth.save(function(err, yetki) {
            if (err) {
                res.status(400).send({ message: err });
            } else {
                return res.json(yetki);
            }
        }).catch(function(err) {
            console.log(err, req.body);
            res.status(400).send({ message: err });
        });
    },
    yetkiSil : function(req, res) {
        var yetkiId = req.params.yetkiId;
        Yetki.findById(yetkiId).then(yetki => {
            return KullaniciYetki.destroy( { where: {yetkiId: yetki.id}} )
            .then(() => {
                return yetki.destroy();
            });
        });
    }
}

module.exports = {YetkiController};//bunu kulanirken var {User} = require('/../../user'); gibi kullanmalisin