const Sequelize = require('sequelize');
const {SeferFisi} = require('./seferFisi');
const {AracKategori} = require('./../arac/aracKategori');
const {AracMarka} = require('./../arac/aracMarka');
const {AracTur} = require('./../arac/aracTur');
const {CariKart} = require('./cariKart');
const {Sahis} = require('./sahis');
const {Sirket} = require('./sirket');
const {Guzergah} = require('./../lokasyon/guzergah');
const {Santiye} = require('./../lokasyon/santiye');
const {Arac} = require('./../arac/arac');
const {YakitFisi} = require('./yakitFisi');

const SeferFisiController = {
    kaydet : function(req, res) {
      var newSeferFisi = SeferFisi.build(req.body);
      newSeferFisi.olusturanKullanici = req.user.id;

      newSeferFisi.save().then((seferFisi) => {
        res.status(200).json(seferFisi);
      }).catch(function(err) {
        console.log(err, req.body);
        res.status(400).send({ message: err });
      });
    },
    guncelle : function(req, res) {

      req.body.guncelleyenKullanici = req.user.id;

      SeferFisi.findOne({
        where: {id: req.body.id}
      }).then(SeferFisi => {
        if (!SeferFisi) {
            return res.status(401).json({ message: 'SeferFisi not found.' });
          } else if (SeferFisi) { 

            var d = new Date();
            d.setMonth(d.getMonth() - 1);
            d.setDate(1);
            var seferFisiTarih = Date.parse(SeferFisi.tarih);

            if (seferFisiTarih < d) {
              console.log(d);
              return res.status(401).json({ message: 'SeferFisi guncellenemez. Kapanmış dönem.' });
            } else 
            {
              SeferFisi.update(
                req.body,
                {where: {id: req.body.id}})
                .then(function (result) {
                  //console.log(result);
                  return res.status(200).json({ SeferFisi });
                }).error(function (result) {
                  //console.log(result);
                  return res.status(401).json({ 'error': 'SeferFisi guncellenemedi.' });
                });
            }

          }  
      });
  },
  sil : function(req, res) {

    req.body.guncelleyenKullanici = req.user.id;
    req.body.isDeleted = true;
    
    SeferFisi.update(
      req.body,
      {where: {id: req.body.id}})
        .then(function (result) {
          console.log(result);
          return res.status(401).json({ 'ok': 'SeferFisi silindi.' });
        }).error(function (result) {
          console.log(result);
          return res.status(401).json({ 'error': 'Error not found.' });
        });

  },
  bul : function(req, res) {
    SeferFisi.findOne({
      where: {id: req.body.id}
    }).then(seferFisi => {
      if (!seferFisi) {
          return res.status(401).json({ message: 'SeferFisi not found.' });
        } else if (seferFisi) {
          return res.status(200).json({ seferFisi });
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

    SeferFisi.findAndCountAll({
      where : whereClause      
    })
    .then((data) => {
      let page = req.body.pageIndex;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      SeferFisi.findAll({
        attributes: ['id', 'santiye_id', 'guzergah_id',
         'cari_kart_id',  'tarih', 'seri_no',
         'sira_no', 'arac_id', 'dokum_fis_no',
         'santiye_cikis_saati', 'aciklama', 
         'odeme_durumu', 'sofor', 'ton', 'is_deleted'],
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
      console.log(error);

      res.status(500).send('Internal Server Error');
    });
  } ,  
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

    SeferFisi.findAndCountAll({
      where : whereClause      
    })
    .then((data) => {
      let pages = Math.ceil(data.count / limit);

      SeferFisi.findAll({
        attributes: ['id', 'santiye_id', 'guzergah_id',
         'cari_kart_id', 'tarih', 'seri_no',
         'sira_no', 'arac_id', 'dokum_fis_no',
         'santiye_cikis_saati', 'aciklama', 
         'odeme_durumu', 'sofor', 'ton', 'is_deleted'],
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
          model: Guzergah,
          required: false,
          attributes: [
            'ad',
            'santiye_id',
            'dokum_sahasi_id',
            'mesafe',
            'aciklama'          
          ]
        } ,
        {
          model: YakitFisi,
          required: false,
          attributes: [
            'tarih', 'seri_no', 'sira_no', 'litre', 'litre_fiyat', 'fis_tutar'        
          ]
        } ,        
        {
          model: Arac,
          required: false,
          attributes: ['id', 'plaka', 'depo_kapasite', 'arac_tur_id', 'arac_kategori_id', 'arac_marka_id', 'arac_model', 'olusturan_kullanici', 'guncelleyen_kullanici', 'is_deleted'],
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
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
  } 
}

module.exports = {SeferFisiController};