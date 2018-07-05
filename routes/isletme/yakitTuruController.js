const Sequelize = require('sequelize');
const {YakitTuru} = require('./yakitTuru');
const {YakitFisi} = require('./yakitFisi');

const YakitTuruController = {
    kaydet : function(req, res) {
        var newYakitTuru = YakitTuru.build(req.body);
        newYakitTuru.olusturanKullanici = req.user.id;

        newYakitTuru.save().then((yakitTuru) => {
          res.status(200).json(yakitTuru);
        }).catch(function(err) {
          console.log(err, req.body);
          res.status(400).send({ message: err });
      });
    },
    guncelle : function(req, res) {

      req.body.guncelleyenKullanici = req.user.id;

      YakitTuru.update(
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
  },
  sil : function(req, res) {

    req.body.guncelleyenKullanici = req.user.id;
    req.body.isDeleted = true;

    YakitTuru.findOne({
      where: {id: req.body.id}
    }).then(YakitTuru => {
      if (!YakitTuru) {
          return res.status(401).json({ message: 'YakitTuru not found.' });
        } else if (YakitTuru) {
          
            // CariKartta kullaniliyor mu ? Kullaniliyor ise silmeye izin vermiyoruz.
            YakitFisi.findOne({ where: { yakitTuru: YakitTuru.id , isDeleted:false} })
            .then(
              function (result) {
                if (result != null) {
                  return res.status(403).json({ "error":"YakitTuru kullanimda @ YakitFisi" });
                }
                else {
                  YakitTuru.update(
                    req.body,
                    {where: {id: req.body.id}})
                  .then(function (result) {
                    console.log(result);
                    return res.status(200).send( {"ok":"YakitTuru silindi."});
                  }).error(
                    function (result) {
                      console.log(result);
                      return res.status(403).send( {"error":"YakitTuru silinemedi."});
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
    YakitTuru.findOne({
      where: {id: req.body.id}
    }).then(YakitTuru => {
      if (!YakitTuru) {
          return res.status(401).json({ message: 'YakitTuru not found.' });
        } else if (YakitTuru) {
          return res.status(200).json({ YakitTuru });
        }
    });
  },  
  listele: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    YakitTuru.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      YakitTuru.findAll({
        attributes: ['id', 'ad', 'is_deleted'],
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

module.exports = {YakitTuruController};