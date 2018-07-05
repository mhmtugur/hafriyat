const Sequelize = require('sequelize');
const {Santiye} = require('./santiye');
const {CariKart} = require('./../isletme/cariKart');
const {Sahis} = require('./../isletme/sahis');
const {Sirket} = require('./../isletme/sirket');
const {Istasyon} = require('./istasyon');
const {YakitFisi} =  require('./../isletme/yakitFisi');
const {SeferFisi} =  require('./../isletme/seferFisi');
const {BorcAlacakFisi} =  require('./../isletme/borcAlacakFisi');

const SantiyeController = {
    kaydet : function(req, res) {
      var newSantiye = Santiye.build(req.body);
      newSantiye.olusturanKullanici = req.user.id;
      
      newSantiye.save().then((santiye) => {
        res.status(200).json(santiye);
      }).catch(function(err) {
        console.log(err, req.body);
        res.status(400).send({ message: err });
      });
    },
    guncelle : function(req, res) {
      req.body.guncelleyenKullanici = req.user.id;
      
      Santiye.update(
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

    Santiye.findOne({
      where: {id: req.body.id}
    }).then(Santiye => {
      if (!Santiye) {
          return res.status(401).json({ message: 'Santiye not found.' });
        } else if (Santiye) {
          
            // Istasyonda kullaniliyor mu ? Kullaniliyor ise silmeye izin vermiyoruz.
            Istasyon.findOne({ where: { santiyeId: Santiye.id , isDeleted:false} })
            .then(
              function (result) {
                if (result != null) {
                  return res.status(403).json({ "error":"Santiye kullanimda @ Istasyon" });
                }
                else {

                        // Yakit fisinde kullaniliyor mu ? Kullaniliyor ise silmeye izin vermiyoruz.
                        YakitFisi.findOne({ where: { santiyeId: Santiye.id, isDeleted:false} })
                        .then(
                          function (result) {
                            if (result != null) {
                              return res.status(403).json({ "error":"Santiye kullanimda @ YakitFisi" });
                            } else {

                              // Sefer fisinde kullaniliyor mu ? Kullaniliyor ise silmeye izin vermiyoruz.
                              SeferFisi.findOne({ where: { santiyeId: Santiye.id, isDeleted:false } })
                              .then(
                                function (result) {
                                  if (result != null) {
                                    return res.status(403).json({ "error":"Santiye kullanimda @ SeferFisi" });
                                  } 
                                  else { 

                                    // BorcAlacak fisinde kullaniliyor mu ? Kullaniliyor ise silmeye izin vermiyoruz.
                                    BorcAlacakFisi.findOne({ where: { santiyeId: Santiye.id, isDeleted:false } })
                                    .then(
                                      function (result) {
                                        if (result != null) {
                                          return res.status(403).json({ "error":"Santiye kullanimda @ BorcAlacakFisi" });
                                        } 
                                        else { 

                                          Santiye.update(
                                            req.body,
                                            {where: {id: req.body.id}})
                                          .then(function (result) {
                                            console.log(result);
                                            return res.status(200).send( {"ok":"Santiye silindi."});
                                          }).error(
                                            function (result) {
                                              console.log(result);
                                              return res.status(403).send( {"error":"Santiye silinemedi."});
                                            }
                                          );

                                        }
                                      }
                                    );
                                  }
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
                //return res.status(200).json({ "ok":"CariKart silinebilir." });
              }
            ).error(
              function (result) {
                return res.status(403).json({ "error":result });
              }
            );
        }  
    });





    Santiye.update(
                {isDeleted: true},
                {where: {id: req.body.id}})
        .then(function (result) {
          console.log(result);
          return res.status(200);
        });
      return res.send(req.body);
  },
  bul : function(req, res) {
    Santiye.findOne({
      where: {id: req.body.id}
    }).then(Santiye => {
      if (!Santiye) {
          return res.status(401).json({ message: 'Santiye not found.' });
        } else if (Santiye) {
          return res.status(200).json({ Santiye });
        }
    });
  },  
  listele: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    Santiye.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      Santiye.findAll({
        attributes: ['id', 'ad','cari_kart_id', 'is_deleted'],
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
    Santiye.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      Santiye.findAll({
        attributes: ['id', 'ad','cari_kart_id', 'is_deleted'],

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
        }],

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




module.exports = {SantiyeController};