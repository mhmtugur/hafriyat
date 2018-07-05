const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const {YakitFiyat} = require('./yakitFiyat');
const {CariKart} = require('./cariKart');
const {Sahis} = require('./sahis');
const {Sirket} = require('./sirket');
const {Santiye} = require('./../lokasyon/santiye');
const {Istasyon} = require('./../lokasyon/istasyon');
const {YakitTuru} = require('./yakitTuru');

const YakitFiyatController = {
    kaydet : function(req, res) {
        var newYakitFiyat = YakitFiyat.build(req.body);
        newYakitFiyat.olusturanKullanici = req.user.id;

        YakitFiyat.findOne({
          where: {cariKartId: req.body.cariKartId ,
                  santiyeId: req.body.santiyeId,
                  istasyonId: req.body.istasyonId,
                bitisTarihi : null}
        }).then(mevcutYakitFiyat => {
          if (mevcutYakitFiyat) {

            mevcutYakitFiyat.bitisTarihi            = req.body.baslangicTarihi;
            mevcutYakitFiyat.guncelleyenKullanici   = req.user.id;

            YakitFiyat.update(

              {guncelleyenKullanici:  req.user.id ,bitisTarihi:mevcutYakitFiyat.bitisTarihi},
              {where: {id: mevcutYakitFiyat.id}})
              .then(function (result) {
                console.log(result);
              }).error (
                function (result) {
                  console.log(result);
                }
              );
            }
        }).then(mevcutYakitFiyat => {
  
          newYakitFiyat.save().then((yakitFiyat) => {
            res.status(200).json(yakitFiyat);
          }).catch(function(err) {
            console.log(err, req.body);
            res.status(400).send({ message: err });
          });
  
        });

    },
    guncelle : function(req, res) {

      req.body.guncelleyenKullanici = req.user.id;

      YakitFiyat.update(
                  req.body,
                  {where: {id: req.body.id}})
          .then(function (result) {
            console.log(result);
            return res.status(200);
          });
        return res.send(req.body);
  },
  sil : function(req, res) {

    req.body.guncelleyenKullanici = req.user.id;
    req.body.isDeleted = true;

    YakitFiyat.update(
          req.body,
          {where: {id: req.body.id}})
        .then(function (result) {
          console.log(result);
          return res.status(200);
        });
      return res.send(req.body);
  },
  bul : function(req, res) {
    YakitFiyat.findOne({
      where: {id: req.body.id}
    }).then(YakitFiyat => {
      if (!YakitFiyat) {
          return res.status(401).json({ message: 'YakitFiyat not found.' });
        } else if (YakitFiyat) {
          return res.status(200).json({ YakitFiyat });
        }
    });
  },  
  gecerliYakitFiyat : function(req, res) {

    var tarih = new Date(req.body.tarih);

    YakitFiyat.findOne({
      where: {santiyeId: req.body.santiyeId,
        istasyonId: req.body.istasyonId,
        yakitTuruId: req.body.yakitTuruId,
        [Op.or]: [
          {
            baslangicTarihi: {
              [Op.lte]: tarih
            },
            bitisTarihi: {
              [Op.gt]: tarih
            }
          },
          {
            baslangicTarihi: {
              [Op.lte]: tarih
            },
            bitisTarihi: {
              [Op.eq]: null
            }
          }
        ]
      }
    }).then(YakitFiyat => {
      if (!YakitFiyat) {
          return res.status(401).json({ message: 'YakitFiyat not found.' });
        } else if (YakitFiyat) {
          return res.status(200).json({ YakitFiyat });
        }
    });
  },    
  listele: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    YakitFiyat.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      YakitFiyat.findAll({
        attributes: ['id', 'cari_kart_id','santiye_id','istasyon_id','yakit_tur_id', 'baslangic_tarihi','bitis_tarihi','fiyat', 'is_deleted'],
        limit: limit,
        offset: offset,
        $sort: { id: 1 }
      })
      .then((data) => {
        res.status(200).json({'result': data, 'count': data.count, 'pages': pages});
      });
    })
    .catch(function (error) {
      res.status(500).send('Internal Server Error');
    });
  }, detayListe: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    YakitFiyat.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      YakitFiyat.findAll({
        attributes: ['id', 'cari_kart_id','santiye_id','istasyon_id','yakit_tur_id', 'baslangic_tarihi','bitis_tarihi','fiyat', 'is_deleted'],

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
        } ,
        {
          model: Istasyon,
          required: false,
          attributes: [
            'ad'       
          ]
        } ,
        {
          model: YakitTuru,
          required: false,
          attributes: [
            'ad'       
          ]
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
      res.status(500).send('Internal Server Error');
    });
  } 
}

module.exports = {YakitFiyatController};