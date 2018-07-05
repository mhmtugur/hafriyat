
const Sequelize = require('sequelize');
const {Arac} = require('./arac');
const {AracKategori} = require('./aracKategori');
const {AracMarka} = require('./aracMarka');
const {AracTur} = require('./aracTur');
const {CariKart} = require('./../isletme/cariKart');

const AracController = {
    kaydet : function(req, res) {

      var newArac = Arac.build(req.body);
      newArac.olusturanKullanici = req.user.id;
      newArac.save().then((arac) => {
        res.status(200).json(arac);
      }).catch(function(err) {
        console.log(err, req.body);
        res.status(400).send({ message: err });
    });

    },
    guncelle : function(req, res) {

      req.body.guncelleyenKullanici = req.user.id;
      Arac.update(
                  req.body,
                  {where: {id: req.body.id}})
          .then(function (result) {
            //console.log(result);
            return res.status(200).send(req.body);
          }).error (
            function (result) {
              //console.log(result);
              return res.status(401).send(req.body);
            }
          )
          ;
        //return res.send(newArac);
  },
  sil : function(req, res) {

    req.body.guncelleyenKullanici = req.user.id;
    req.body.isDeleted = true;

        Arac.update(
                req.body,
                {where: {id: req.body.id}})
        .then(function (result) {
          //console.log(result);
          return res.status(200).send(req.body);
        }).error (
          function (result) {
            //console.log(result);
            return res.status(401).send(req.body);
          }
        )
        ;
      //return res.send(newArac);
  },
  bul : function(req, res) {

    Arac.findOne({
      where: {id: req.body.id}
    }).then(arac => {
      if (!arac) {
          return res.status(401).json({ message: 'Arac not found.' });
        } else if (arac) {
          return res.status(200).json({ arac });
        }
    });
  }, listele: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    Arac.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      Arac.findAll({
        attributes: ['id', 'plaka', 'cari_kart_id' , 'depo_kapasite', 'arac_tur_id', 'arac_kategori_id', 'arac_marka_id', 'arac_model', 'olusturan_kullanici', 'guncelleyen_kullanici', 'is_deleted'],
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
    Arac.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      Arac.findAll({
        attributes: ['id', 'plaka', 'depo_kapasite', 'arac_tur_id', 'arac_kategori_id', 'arac_marka_id', 'arac_model', 'olusturan_kullanici', 'guncelleyen_kullanici', 'is_deleted'],

          include: [
            {
              model: CariKart,
              required: false,
              attributes: [ 'id', 'ad' ,'tur', 'is_deleted','sirket_id','sahis_id' ]
            },
            {
            model: AracTur,
            required: false,
            attributes: [ 'ad' ]
            },
            {
            model: AracKategori,
            required: false,
            attributes: [ 'ad' ]
            },
            {
              model: AracMarka,
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
      res.status(500).send('Internal Server Error');
    });
  } 
}

module.exports = {AracController};



