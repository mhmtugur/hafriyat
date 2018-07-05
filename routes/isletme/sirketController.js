const Sequelize = require('sequelize');
const {Sirket} = require('./sirket');
const {CariKart} = require('./cariKart');

const SirketController = {
    kaydet : function(req, res) {
      var newSirket = Sirket.build(req.body);
      newSirket.olusturanKullanici = req.user.id;
      
      newSirket.save().then((sirket) => {
        res.status(200).json(sirket);
      }).catch(function(err) {
        console.log(err, req.body);
        res.status(500).send({ message: err });
      });
    },
    guncelle : function(req, res) {

          req.body.guncelleyenKullanici = req.user.id;

          Sirket.update(
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

    Sirket.findOne({
      where: {id: req.body.id}
    }).then(Sirket => {
      if (!Sirket) {
          return res.status(401).json({ message: 'Sirket not found.' });
        } else if (Sirket) {
          
            // CariKartta kullaniliyor mu ? Kullaniliyor ise silmeye izin vermiyoruz.
            CariKart.findOne({ where: { sirketId: Sirket.id , isDeleted:false} })
            .then(
              function (result) {
                if (result != null) {
                  return res.status(403).json({ "error":"Sirket kullanimda @ CariKart" });
                }
                else {
                  Sirket.update(
                    req.body,
                    {where: {id: req.body.id}})
                  .then(function (result) {
                    console.log(result);
                    return res.status(200).send( {"ok":"Sirket silindi."});
                  }).error(
                    function (result) {
                      console.log(result);
                      return res.status(403).send( {"error":"Sirket silinemedi."});
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
    Sirket.findOne({
      where: {id: req.body.id}
    }).then(Sirket => {
      if (!Sirket) {
          return res.status(401).json({ message: 'Sirket not found.' });
        } else if (Sirket) {
          return res.status(200).json({ Sirket });
        }
    });
  },  
  listele: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    Sirket.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      Sirket.findAll({
        attributes: ['id', 'ad','adres','telefon','vergi_no', 'is_deleted'],
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

module.exports = {SirketController};