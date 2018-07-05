const Sequelize = require('sequelize');
const {CariKart} = require('./cariKart');
const {Sahis} = require('./sahis');
const {Sirket} = require('./sirket');
const {BorcAlacakFisi} = require('./borcAlacakFisi');
const {SeferFisi} = require('./seferFisi');
const {YakitFisi} = require('./yakitFisi');

const CariKartController = {
    kaydet : function(req, res) {
        var newCariKart = CariKart.build(req.body);
        newCariKart.olusturanKullanici = req.user.id;
        
        newCariKart.save().then((cari) => {
          res.status(200).json(cari);
        }).catch(function(err) {
          console.log(err, req.body);
          res.status(400).send({ message: err });
      });
    },
    guncelle : function(req, res) {

      req.body.guncelleyenKullanici = req.user.id;
      
      CariKart.update(
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

    CariKart.findOne({
      where: {id: req.body.id}
    }).then(CariKart => {
      if (!CariKart) {
          return res.status(401).json({ message: 'CariKart not found.' });
        } else if (CariKart) {
          
            // Borc alacak fisinde kullaniliyor mu ? Kullaniliyor ise silmeye izin vermiyoruz.
            BorcAlacakFisi.findOne({ where: { cariKartId: CariKart.id , isDeleted:false} })
            .then(
              function (result) {
                if (result != null) {
                  return res.status(403).json({ "error":"CariKart kullanimda @ BorcAlacakFisi" });
                }
                else {

                  // Sefer fisinde kullaniliyor mu ? Kullaniliyor ise silmeye izin vermiyoruz.
                  SeferFisi.findOne({ where: { cariKartId: CariKart.id, isDeleted:false} })
                  .then(
                    function (result) {
                      if (result != null) {
                        return res.status(403).json({ "error":"CariKart kullanimda @ SeferFisi" });
                      } 
                      else {

                        // Yakit fisinde kullaniliyor mu ? Kullaniliyor ise silmeye izin vermiyoruz.
                        YakitFisi.findOne({ where: { cariKartId: CariKart.id, isDeleted:false} })
                        .then(
                          function (result) {
                            if (result != null) {
                              return res.status(403).json({ "error":"CariKart kullanimda @ YakitFisi" });
                            } else {

                              //Silinen CariKart
                              CariKart.update(
                                req.body,
                                {where: {id: req.body.id}})
                                .then(function (result) {
                                  console.log(result);
                                  return res.status(200);
                                });
                              return res.send(req.body);
                              //return res.status(200).json({ "ok":"CariKart silinebilir." });
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
                //return res.status(200).json({ "ok":"CariKart silinebilir." });
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
    CariKart.findOne({
      where: {id: req.body.id}
    }).then(CariKart => {
      if (!CariKart) {
          return res.status(401).json({ message: 'CariKart not found.' });
        } else if (CariKart) {
          return res.status(200).json({ CariKart });
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

    CariKart.findAndCountAll({
      where : whereClause      
    })
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      CariKart.findAll({
        attributes: ['id', 'ad' ,'tur', 'is_deleted','sirket_id','sahis_id'],
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
  },  
  detayListe: function (req, res) {
    let limit = req.body.recordPerPage | 1000;   // number of records per page
    let offset = 0;
    CariKart.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex | 1;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      CariKart.findAll({
        attributes: ['id', 'ad' ,'tur', 'is_deleted','sirket_id','sahis_id'],

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

module.exports = {CariKartController};