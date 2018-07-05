const Sequelize = require('sequelize');
const {Istasyon} = require('./istasyon');
const {CariKart} = require('./../isletme/cariKart');
const {Sahis} = require('./../isletme/sahis');
const {Sirket} = require('./../isletme/sirket');
const {Santiye} = require('./santiye');
const {YakitFisi} =  require('./../isletme/yakitFisi');
const {YakitFiyat} =  require('./../isletme/yakitFiyat');

const IstasyonController = {
    kaydet : function(req, res) {
      var newIstasyon = Istasyon.build(req.body);
      newIstasyon.olusturanKullanici = req.user.id;
      
      newIstasyon.save().then((istasyon) => {
        res.status(200).json(istasyon);
      }).catch(function(err) {
        console.log(err, req.body);
        res.status(400).send({ message: err });
      });
    },
    guncelle : function(req, res) {

      req.body.guncelleyenKullanici = req.user.id;
      
      Istasyon.update(
                  req.body,
                  {where: {id: req.body.id}})
          .then(function (result) {
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

    Istasyon.findOne({
      where: {id: req.body.id}
    }).then(Istasyon => {

      if (!Istasyon) {
        return res.status(401).json({ message: 'Istasyon not found.' });
      } else if (Istasyon) {
  
                    // YakitFisi icinde kullaniliyor mu ? Kullaniliyor ise silmeye izin vermiyoruz.
                    YakitFisi.findOne({ where: { istasyonId: Istasyon.id, isDeleted:false} })
                    .then(
                      function (result) {
                        if (result != null) {
                          return res.status(403).json({ "error":"Istasyon kullanimda @ YakitFisi" });
                        } else {
  
                          YakitFiyat.findOne({ where: { istasyonId: Istasyon.id, isDeleted:false} })
                          .then(
                            function (result) {
                              if (result != null) {
                                return res.status(403).json({ "error":"Istasyon kullanimda @ YakitFiyat" });
                              } else {

                                //Silinen Guzergah
                                Istasyon.update(
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
                      }
                    ).error(
                      function (result) {
                        return res.status(403).json({ "error":result });
                      }
                    );
            }
    });

    Istasyon.update(
                {isDeleted: true},
                {where: {id: req.body.id}})
        .then(function (result) {
          console.log(result);
          return res.status(200);
        }).error(function (result) {
          console.log(result);
          return res.send(req.body);

        });


  },
  bul : function(req, res) {
    Istasyon.findOne({
      where: {id: req.body.id}
    }).then(Istasyon => {
      if (!Istasyon) {
          return res.status(401).json({ message: 'Istasyon not found.' });
        } else if (Istasyon) {
          return res.status(200).json({ Istasyon });
        }
    });
  },  
  listele: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    Istasyon.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      Istasyon.findAll({
        attributes: ['id', 'ad','santiye_id', 'is_deleted'],
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
    Istasyon.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      Istasyon.findAll({
        attributes: ['id', 'ad','santiye_id', 'is_deleted'],
        include: [
        {
          model: Santiye,
          required: false,
          attributes: [ 'id', 'ad',  'is_deleted' ]
          ,
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

module.exports = {IstasyonController};