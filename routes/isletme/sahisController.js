const Sequelize = require('sequelize');
const {Sahis} = require('./Sahis');
const {CariKart} = require('./cariKart');

const SahisController = {
    kaydet : function(req, res) {
      var newSahis = Sahis.build(req.body);
      newSahis.olusturanKullanici = req.user.id;
      
      newSahis.save().then((sahis) => {
        res.status(200).json(sahis);
      }).catch(function(err) {
        console.log(err, req.body);
        res.status(400).send({ message: err });
      });
    },
    guncelle : function(req, res) {

      req.body.guncelleyenKullanici = req.user.id;

      Sahis.update(
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

    Sahis.findOne({
      where: {id: req.body.id}
    }).then(Sahis => {
      if (!Sahis) {
          return res.status(401).json({ message: 'Sahis not found.' });
        } else if (Sahis) {
          
            // CariKartta kullaniliyor mu ? Kullaniliyor ise silmeye izin vermiyoruz.
            CariKart.findOne({ where: { sahisId: Sahis.id , isDeleted:false} })
            .then(
              function (result) {
                if (result != null) {
                  return res.status(403).json({ "error":"Sahis kullanimda @ CariKart" });
                }
                else {
                  Sahis.update(
                    req.body,
                    {where: {id: req.body.id}})
                  .then(function (result) {
                    console.log(result);
                    return res.status(200).send( {"ok":"Sahis silindi."});
                  }).error(
                    function (result) {
                      console.log(result);
                      return res.status(403).send( {"error":"Sahis silinemedi."});
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
    Sahis.findOne({
      where: {id: req.body.id}
    }).then(Sahis => {
      if (!Sahis) {
          return res.status(401).json({ message: 'Sahis not found.' });
        } else if (Sahis) {
          return res.status(200).json({ Sahis });
        }
    });
  },  
  listele: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    Sahis.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      Sahis.findAll({
        attributes: ['id', 'ad','adres','telefon','tc_kimlik_no', 'is_deleted'],
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

module.exports = {SahisController};