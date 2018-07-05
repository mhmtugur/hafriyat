const Sequelize = require('sequelize');
const {AracKategori} = require('./aracKategori');

const AracKategoriController = {
    kaydet : function(req, res) {
    var newAracKategori = AracKategori.build(req.body);
    newAracKategori.olusturanKullanici = req.user.id;
    newAracKategori.save().then((aracKategori) => {
      res.status(200).json(aracKategori);
    }).catch(function(err) {
      console.log(err, req.body);
      res.status(400).send({ message: err });
    });
    },
    guncelle : function(req, res) {
      req.body.guncelleyenKullanici = req.user.id;
      
      AracKategori.update(
                  req.body,
                  {where: {id: req.body.id}})
          .then(function (result) {
            console.log(result);
            return res.status(200);
          });
        return res.send(req.body);
  },
  sil : function(req, res) {

    req.body.guncelleyenKullanici = req.user.id;
    req.body.isDeleted = true;

    AracKategori.update(
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
  bul : function(req, res) {

    AracKategori.findOne({
      where: {id: req.body.id}
    }).then(AracKategori => {
      if (!AracKategori) {
          return res.status(401).json({ message: 'AracKategori not found.' });
        } else if (AracKategori) {
          return res.status(200).json({ AracKategori });
        }
    });
  },  listele: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    AracKategori.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      AracKategori.findAll({
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

module.exports = {AracKategoriController};