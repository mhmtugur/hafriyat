
const Sequelize = require('sequelize');
const {AracMarka} = require('./aracMarka');

const AracMarkaController = {
    kaydet : function(req, res) {
      var newAracMarka = AracMarka.build(req.body);
      newAracMarka.olusturanKullanici = req.user.id;
      
      newAracMarka.save().then((aracMarka) => {
        res.status(200).json(aracMarka);
      }).catch(function(err) {
        console.log(err, req.body);
        res.status(400).send({ message: err });
      });
    },
    guncelle : function(req, res) {
      req.body.guncelleyenKullanici = req.user.id;
      
      AracMarka.update(
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
    
    AracMarka.update(
          req.body,
          {where: {id: req.body.id}})
        .then(function (result) {
          console.log(result);
          return res.status(200).send(req.body);
        }).error (
          function (result) {
            //console.log(result);
            return res.status(401).send(req.body);
          });

  },
  bul : function(req, res) {

    AracMarka.findOne({
      where: {id: req.body.id}
    }).then(AracMarka => {
      if (!AracMarka) {
          return res.status(401).json({ message: 'AracMarka not found.' });
        } else if (AracMarka) {
          return res.status(200).json({ AracMarka });
        }
    });
  } , listele: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    AracMarka.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      AracMarka.findAll({
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

module.exports = {AracMarkaController};