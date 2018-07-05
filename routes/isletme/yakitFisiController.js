const Sequelize = require('sequelize');
const {YakitFisi} = require('./yakitFisi');

const {AracKategori} = require('./../arac/aracKategori');
const {AracMarka} = require('./../arac/aracMarka');
const {AracTur} = require('./../arac/aracTur');
const {CariKart} = require('./cariKart');
const {Sahis} = require('./sahis');
const {Sirket} = require('./sirket');
const {Santiye} = require('./../lokasyon/santiye');
const {Istasyon} = require('./../lokasyon/istasyon');
const {Arac} = require('./../arac/arac');
const {YakitTuru} = require('./yakitTuru');

const YakitFisiController = {
    kaydet : function(req, res) {
        var newYakitFisi = YakitFisi.build(req.body);
        newYakitFisi.olusturanKullanici = req.user.id;
        
        newYakitFisi.save().then((yakitFisi) => {
          res.status(200).json(yakitFisi);
        }).catch(function(err) {
          console.log(err, req.body);
          res.status(400).send({ message: err });
      });
    },
    guncelle : function(req, res) {

      req.body.guncelleyenKullanici = req.user.id;

      YakitFisi.findOne({
        where: {id: req.body.id}
      }).then(YakitFisi => {
        if (!YakitFisi) {
            return res.status(401).json({ message: 'YakitFisi not found.' });
          } else if (YakitFisi) { 

            var d = new Date();
            d.setMonth(d.getMonth() - 1);
            d.setDate(1);
            var yakitFisiTarih = Date.parse(YakitFisi.tarih);

            if (yakitFisiTarih < d) {
              console.log(d);
              return res.status(401).json({ message: 'YakitFisi guncellenemez. Kapanmış dönem.' });
            } else 
            {
              YakitFisi.update(
                req.body,
                {where: {id: req.body.id}})
                .then(function (result) {
                  //console.log(result);
                  return res.status(200).json({ YakitFisi });
                }).error(function (result) {
                  //console.log(result);
                  return res.status(401).json({ 'error': 'YakitFisi guncellenemedi.' });
                });
            }

          }  
      });

  },
  sil : function(req, res) {

    req.body.guncelleyenKullanici = req.user.id;
    req.body.isDeleted = true;
    
    YakitFisi.update(
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
  bul : function(req, res) {
    YakitFisi.findOne({
      where: {id: req.body.id}
    }).then(YakitFisi => {
      if (!YakitFisi) {
          return res.status(401).json({ message: 'YakitFisi not found.' });
        } else if (YakitFisi) {
          return res.status(200).json({ YakitFisi });
        }
    });
  },  
  listele: function (req, res) {
    let limit = req.body.recordPerPage;   // number of records per page
    let offset = 0;
    YakitFisi.findAndCountAll()
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      YakitFisi.findAll({
        attributes: ['id', 'cari_kart_id', 'santiye_id', 'istasyon_id','yakit_tur_id','arac_id', 'aciklama','tarih', 'seri_no', 'sira_no', 'litre', 'litre_fiyat', 'fis_tutar', 'odeme_durumu','is_deleted'],
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

    let page = req.body.pageIndex;      // page number
    offset = limit * (page - 1);

    let whereClause = {};

    if (req.body.aracId && req.body.aracId !== '') {
      whereClause = {aracId: req.body.aracId};
    } else if (req.body.aracId && req.body.aracId === '') {
      whereClause = {aracId: {$not: null}};
    }

    YakitFisi.findAndCountAll({
      where : whereClause
    })
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      YakitFisi.findAll({
        attributes: ['id', 'cari_kart_id', 'santiye_id', 'istasyon_id','yakit_tur_id',
        'arac_id', 'tarih', 'seri_no', 'sira_no', 'litre', 'aciklama',
        'litre_fiyat', 'fis_tutar', 'odeme_durumu','is_deleted'],
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
        },
        {
          model: Santiye,
          required: false,
          attributes: [ 'id', 'ad',  'is_deleted' ],
        } ,
        {
          model: Istasyon,
          required: false,
          attributes: [
            'ad'       
          ]
        } ,
        {
          model: YakitTuru,
          required: false,
          attributes: [
            'ad'       
          ]
        } ,
        {
          model: Arac,
          required: false,
          attributes: ['id', 'plaka', 'depo_kapasite', 'arac_tur_id', 'arac_kategori_id', 
                        'arac_marka_id', 'arac_model', 'olusturan_kullanici', 
                        'guncelleyen_kullanici', 'is_deleted'],
              include: [
              {
                model: CariKart,
                required: false,
                attributes: [ 'id', 'ad' ,'tur', 'is_deleted','sirket_id','sahis_id' ]
              },
              {
              model: AracTur,
              required: false,
              attributes: [ 'ad' ]
              },
              {
              model: AracKategori,
              required: false,
              attributes: [ 'ad' ]
              },
              {
                model: AracMarka,
                required: false,
                attributes: [ 'ad' ]
              }
          ] 
        }
      ],
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
  } 
}

module.exports = {YakitFisiController};