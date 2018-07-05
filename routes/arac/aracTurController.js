const Sequelize = require('sequelize');
const {AracTur} = require('./aracTur');

const AracTurController = {
    kaydet : function(req, res) {
      var newAracTur = AracTur.build(req.body);
      newAracTur.olusturanKullanici = req.user.id;
      
      newAracTur.save().then((aracTur) => {
        res.status(200).json(aracTur);
      }).catch(function(err) {
        console.log(err, req.body);
        res.status(400).send({ message: err });
      });
    },
    guncelle : function(req, res) {
      req.body.guncelleyenKullanici = req.user.id;
      
      AracTur.update(
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

    AracTur.update(
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

    AracTur.findOne({
      where: {id: req.body.id}
    }).then(AracTur => {
      if (!AracTur) {
          return res.status(401).json({ message: 'AracTur not found.' });
        } else if (AracTur) {
          return res.status(200).json({ AracTur });
        }
    });
  },  listele: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    AracTur.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      AracTur.findAll({
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

module.exports = {AracTurController};