const Sequelize = require('sequelize');
const {Guzergah} = require('./guzergah');
const {DokumSahasi} = require('./dokumSahasi');
const {GuzergahFiyat} = require('./guzergahFiyat');

const {CariKart} = require('./../isletme/cariKart');
const {Sahis} = require('./../isletme/sahis');
const {Sirket} = require('./../isletme/sirket');
const {Santiye} = require('./santiye');


const GuzergahController = {
    kaydet : function(req, res) {
      var newGuzergah = Guzergah.build(req.body);
      newGuzergah.olusturanKullanici = req.user.id;
      
      newGuzergah.save().then((guzergah) => {
        res.status(200).json(guzergah);
      }).catch(function(err) {
        console.log(err, req.body);
        res.status(400).send({ message: err });
      });
    },
    guncelle : function(req, res) {

      req.body.guncelleyenKullanici = req.user.id;
      
      Guzergah.update(
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
    
    Guzergah.findOne({
      where: {id: req.body.id}
    }).then(Guzergah => {

      if (!Guzergah) {
        return res.status(401).json({ message: 'Guzergah not found.' });
      } else if (Guzergah) {
  
                    // GuzergahFiyat icinde kullaniliyor mu ? Kullaniliyor ise silmeye izin vermiyoruz.
                    GuzergahFiyat.findOne({ where: { guzergahId: Guzergah.id, isDeleted:false} })
                    .then(
                      function (result) {
                        if (result != null) {
                          return res.status(403).json({ "error":"Guzergah kullanimda @ GuzergahFiyat" });
                        } else {
  
                          //Silinen Guzergah
                          Guzergah.update(
                            req.body,
                            {where: {id: req.body.id}})
                            .then(function (result) {
                              //console.log(result);
                              return res.status(200);
                            }).error(function (result) {
                             //console.log(result);
                              return res.send(req.body);
                            } ) ;
                        }
                      }
                    ).error(
                      function (result) {
                        return res.status(403).json({ "error":result });
                      }
                    );
      }
  


    });




  },
  bul : function(req, res) {
    Guzergah.findOne({
      where: {id: req.body.id}
    }).then(Guzergah => {
      if (!Guzergah) {
          return res.status(401).json({ message: 'Guzergah not found.' });
        } else if (Guzergah) {
          return res.status(200).json({ Guzergah });
        }
    });
  },  
  listele: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    Guzergah.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      Guzergah.findAll({
        attributes: ['id', 'ad','santiye_id','dokum_sahasi_id','mesafe','aciklama', 'is_deleted'],
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
  },
  detayListe: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    Guzergah.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      Guzergah.findAll({
        attributes: ['id', 'ad','santiye_id','dokum_sahasi_id','mesafe','aciklama', 'is_deleted'],

        include: [ 
        {
          model: Santiye,
          required: false,
          attributes: [ 'id', 'ad',  'is_deleted' ],

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
          }]
        } ,
        {
          model: DokumSahasi,
          required: false,
          attributes: [
            'ad'   ,'aciklama'    
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

module.exports = {GuzergahController};