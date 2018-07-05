const Sequelize = require('sequelize');
const {DokumSahasi} = require('./dokumSahasi');
const {Guzergah} = require('./guzergah');

const DokumSahasiController = {
    kaydet : function(req, res) {
      var newDokumSahasi = DokumSahasi.build(req.body);
      newDokumSahasi.olusturanKullanici = req.user.id;
      
      newDokumSahasi.save().then((dokumSahasi) => {
        res.status(200).json(dokumSahasi);
      }).catch(function(err) {
        console.log(err, req.body);
        res.status(400).send({ message: err });
      });
    },
    guncelle : function(req, res) {

      req.body.guncelleyenKullanici = req.user.id;

      DokumSahasi.update(
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
          )
          ;
  },
  sil : function(req, res) {


    req.body.guncelleyenKullanici = req.user.id;
    req.body.isDeleted = true;


    DokumSahasi.findOne({
      where: {id: req.body.id}
    }).then(DokumSahasi => {
      if (!DokumSahasi) {
          return res.status(401).json({ message: 'DokumSahasi not found.' });
        } else if (DokumSahasi) {
          
            // Guzergahta kullaniliyor mu ? Kullaniliyor ise silmeye izin vermiyoruz.
            Guzergah.findOne({ where: { dokumSahasiId: DokumSahasi.id , isDeleted:false} })
            .then(
              function (result) {
                if (result != null) {
                  return res.status(403).json({ "error":"DokumSahasi kullanimda @ Guzergah" });
                }
                else {
                  DokumSahasi.update(
                    req.body,
                    {where: {id: req.body.id}})
                  .then(function (result) {
                    console.log(result);
                    return res.status(200).send( {"ok":"DokumSahasi silindi."});
                  }).error(
                    function (result) {
                      console.log(result);
                      return res.status(403).send( {"error":"DokumSahasi silinemedi."});
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
    DokumSahasi.findOne({
      where: {id: req.body.id}
    }).then(DokumSahasi => {
      if (!DokumSahasi) {
          return res.status(401).json({ message: 'DokumSahasi not found.' });
        } else if (DokumSahasi) {
          return res.status(200).json({ DokumSahasi });
        }
    });
  },  
  listele: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    DokumSahasi.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      DokumSahasi.findAll({
        attributes: ['id', 'ad','aciklama', 'is_deleted'],
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

module.exports = {DokumSahasiController};