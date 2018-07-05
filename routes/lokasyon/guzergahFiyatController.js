const Sequelize = require('sequelize');
const {GuzergahFiyat} = require('./guzergahFiyat');

const {CariKart} = require('./../isletme/cariKart');
const {Sahis} = require('./../isletme/sahis');
const {Sirket} = require('./../isletme/sirket');
const {Santiye} = require('./santiye');
const {AracTur} = require('./../arac/aracTur');
const {Guzergah} = require('./guzergah');

const GuzergahFiyatController = {
    kaydet : function(req, res) {
      var newGuzergahFiyat = GuzergahFiyat.build(req.body);
      newGuzergahFiyat.olusturanKullanici = req.user.id;
      
      GuzergahFiyat.findOne({
        where: {cariKartId: req.body.cariKartId ,
                santiyeId: req.body.santiyeId,
                guzergahId: req.body.guzergahId,
              bitisTarihi : null}
      }).then(mevcutGuzergahFiyat => {
        if (mevcutGuzergahFiyat) {

          mevcutGuzergahFiyat.bitisTarihi            = req.body.baslangicTarihi;
          mevcutGuzergahFiyat.guncelleyenKullanici   = req.user.id;

          console.log(mevcutGuzergahFiyat);

          GuzergahFiyat.update(
            {guncelleyenKullanici:  req.user.id ,bitisTarihi:mevcutGuzergahFiyat.bitisTarihi},
            {where: {id: mevcutGuzergahFiyat.id}})
            .then(function (result) {
              console.log(result);
            }).error (
              function (result) {
                console.log(result);
              }
            );
          }  
      }).then(mevcutGuzergahFiyat => {

        newGuzergahFiyat.save().then((guzergahFiyat) => {
          res.status(200).json(guzergahFiyat);
        }).catch(function(err) {
          console.log(err, req.body);
          res.status(400).send({ message: err });
        });

      });

    },
    guncelle : function(req, res) {
      req.body.guncelleyenKullanici = req.user.id;
      
      GuzergahFiyat.update(
                  req.body,
                  {where: {id: req.body.id}})
          .then(function (result) {
            console.log(result);
            return res.status(200).send(req.body);
          }).error (
            function (result) {
              //console.log(result);
              return res.status(401).send(req.body);
            }
          );

  },
  sil : function(req, res) {

    req.body.guncelleyenKullanici = req.user.id;
    req.body.isDeleted = true;
    
        //Silinen Guzergah
        GuzergahFiyat.update(
          req.body,
          {where: {id: req.body.id}})
        .then(function (result) {
          console.log(result);
          res.status(200).json(guzergahFiyat);
        }).error(function (result) {
          console.log(result);
          res.status(400).send({ message: err });
        });

  },
  bul : function(req, res) {
    GuzergahFiyat.findOne({
      where: {id: req.body.id}
    }).then(GuzergahFiyat => {
      if (!GuzergahFiyat) {
          return res.status(401).json({ message: 'GuzergahFiyat not found.' });
        } else if (GuzergahFiyat) {
          return res.status(200).json({ GuzergahFiyat });
        }
    });
  },  
  listele: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    GuzergahFiyat.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      GuzergahFiyat.findAll({
        attributes: ['id', 'cari_kart_id','santiye_id','guzergah_id','arac_tur_id','mesafe','aciklama','baslangic_tarihi','bitis_tarihi','fiyat','litre', 'is_deleted'],
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
  } ,  
  detayListe: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    GuzergahFiyat.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      GuzergahFiyat.findAll({
        attributes: ['id', 'cari_kart_id','santiye_id','guzergah_id','arac_tur_id','mesafe','aciklama','baslangic_tarihi','bitis_tarihi','fiyat', 'litre','is_deleted'],

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
          model: Guzergah,
          required: false,
          attributes: [
            'ad',
            'santiye_id',
            'dokum_sahasi_id',
            'mesafe',
            'aciklama'          
          ]
        } ,
        {
          model: AracTur,
          required: false,
          attributes: [ 'ad' ]
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

module.exports = {GuzergahFiyatController};