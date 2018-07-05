const Sequelize = require('sequelize');
const {BorcAlacakFisi} = require('./borcAlacakFisi');
const {CariKart} = require('./cariKart');

const {Sahis} = require('./sahis');
const {Sirket} = require('./sirket');
const {Santiye} = require('./../lokasyon/santiye');
const {Arac} = require('./../arac/arac');


const BorcAlacakFisiController = {
    kaydet : function(req, res) {
      var newBorcAlacakFisi = BorcAlacakFisi.build(req.body);
      newBorcAlacakFisi.olusturanKullanici = req.user.id;
      
      newBorcAlacakFisi.save().then((borcAlacakFisi) => {
        res.status(200).json(borcAlacakFisi);
      }).catch(function(err) {
        console.log(err, req.body);
        res.status(400).send({ message: err });
      });
    },
    guncelle : function(req, res) {

      req.body.guncelleyenKullanici = req.user.id;

      BorcAlacakFisi.findOne({
        where: {id: req.body.id}
      }).then(BorcAlacakFisi => {
        if (!BorcAlacakFisi) {
            return res.status(401).json({ message: 'BorcAlacakFisi not found.' });
          } else if (BorcAlacakFisi) {

            var d = new Date();
            d.setMonth(d.getMonth() - 1);
            d.setDate(1);
            var borcAlacakTarih = Date.parse(BorcAlacakFisi.tarih);

            if (borcAlacakTarih < d) {
              console.log(d);
              return res.status(401).json({ message: 'BorcAlacakFisi guncellenemez. Kapanmış dönem.' });
            } else {
  
                BorcAlacakFisi.update(
                req.body,
                {where: {id: req.body.id}})
              .then(function (result) {
                //console.log(result);
                return res.status(200).json({ BorcAlacakFisi });
              }).error(function (result) {
                //console.log(result);
                return res.status(401).json({ message: 'BorcAlacakFisi guncellenemedi.' });
              });

            }

          }
      });
  },
  sil : function(req, res) {

    req.body.guncelleyenKullanici = req.user.id;
    req.body.isDeleted = true;

    BorcAlacakFisi.update(
          req.body,
          {where: {id: req.body.id}})
        .then(function (result) {
          console.log(result);
          return res.status(200).json({ BorcAlacakFisi });
        }).then(function (result) {
          console.log(result);
          return res.status(401).json({ message: 'BorcAlacakFisi silinemedi.' });
        });
  },
  bul : function(req, res) {
    BorcAlacakFisi.findOne({
      where: {id: req.body.id}
    }).then(BorcAlacakFisi => {
      if (!BorcAlacakFisi) {
          return res.status(401).json({ message: 'BorcAlacakFisi not found.' });
        } else if (BorcAlacakFisi) {
          return res.status(200).json({ BorcAlacakFisi });
        }
    });
  },  
  listele: function (req, res) {

    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;

    let whereClause = {};

    if (req.body.whereCondition && req.body.whereCondition !== '') {
      whereClause = JSON.parse(req.body.whereCondition);
    }

    BorcAlacakFisi.findAndCountAll({
      where : whereClause      
    })
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      BorcAlacakFisi.findAll({
        attributes: ['id', 'santiye_id','cari_kart_id', 'tutar', 'borc_alacak_tur','iskonto','son_tutar' ,'tarih', 'aciklama' , 'is_deleted'],
        limit: limit,
        offset: offset,
        $sort: { id: 1 },
        where : whereClause
      })
      .then((data) => {
        res.status(200).json({'result': data, 'count': data.count, 'pages': pages});
      });
    })
    .catch(function (error) {
      res.status(500).send('Internal Server Error');
    });
  } , detayListe: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    BorcAlacakFisi.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      BorcAlacakFisi.findAll({
        attributes: ['id', 'santiye_id','cari_kart_id', 'tutar', 'borc_alacak_tur', 'iskonto','son_tutar' ,'tarih', 'aciklama' , 'is_deleted'],
          include: [{
            model: CariKart,
            required: false,
            attributes: [ 'id', 'ad' ,'tur', 'is_deleted','sirket_id','sahis_id' ],
                include: [{
                  model: Sahis,
                  required: false,
                  attributes: [
                        'ad',
                        'adres'
                      ]
                    }, {
                      model: Sirket,
                      required: false,
                      attributes: [
                        'ad',
                        'adres',
                        'vergi_no'
                      ]
                    }
              ]
          },
          {
            model: Santiye,
            required: false,
            attributes: [ 'id', 'ad',  'is_deleted' ],
          },
          {
            model: Arac,
            required: false,
            attributes: [ 'id', 'plaka',  'is_deleted' ],
          }
        ],
        limit: limit,
        offset: offset,
        $sort: { id: 1 }
      })
      .then((data) => {
        res.status(200).json({'result': data, 'count': data.count, 'pages': pages});
      });
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
  } 
}

module.exports = {BorcAlacakFisiController};