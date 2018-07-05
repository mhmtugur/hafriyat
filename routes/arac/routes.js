var express = require('express');
var router = express.Router();
var {AracController} = require('./aracController');
var {AracMarkaController} = require('./aracMarkaController');
var {AracTurController} = require('./aracTurController');
var {AracKategoriController} = require('./aracKategoriController');

/* sign in */
router.post('/kaydet', AracController.kaydet);
router.post('/guncelle', AracController.guncelle);
router.post('/sil', AracController.sil);
router.post('/bul', AracController.bul);
router.post('/listele', AracController.listele);
router.post('/detayListe', AracController.detayListe);

router.post('/marka/kaydet', AracMarkaController.kaydet);
router.post('/marka/guncelle', AracMarkaController.guncelle);
router.post('/marka/sil', AracMarkaController.sil);
router.post('/marka/bul', AracMarkaController.bul);
router.post('/marka/listele', AracMarkaController.listele);

router.post('/tur/kaydet', AracTurController.kaydet);
router.post('/tur/guncelle', AracTurController.guncelle);
router.post('/tur/sil', AracTurController.sil);
router.post('/tur/bul', AracTurController.bul);
router.post('/tur/listele', AracTurController.listele);

router.post('/kategori/kaydet', AracKategoriController.kaydet);
router.post('/kategori/guncelle', AracKategoriController.guncelle);
router.post('/kategori/sil', AracKategoriController.sil);
router.post('/kategori/bul', AracKategoriController.bul);
router.post('/kategori/listele', AracKategoriController.listele);

//router.post('/signout', UserController.signout);
//router.post('/loginuser', user.loginuser);

module.exports = router;