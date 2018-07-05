var express = require('express');
var router = express.Router();
var {SantiyeController} = require('./santiyeController');
var {DokumSahasiController} = require('./dokumSahasiController');
var {GuzergahController} = require('./guzergahController');
var {GuzergahFiyatController} = require('./guzergahFiyatController');
var {IstasyonController} = require('./istasyonController');

/* sign in */
router.post('/santiye/kaydet', SantiyeController.kaydet);
router.post('/santiye/guncelle', SantiyeController.guncelle);
router.post('/santiye/sil', SantiyeController.sil);
router.post('/santiye/bul', SantiyeController.bul);
router.post('/santiye/listele', SantiyeController.listele);
router.post('/santiye/detayListe', SantiyeController.detayListe);

router.post('/dokumSahasi/kaydet', DokumSahasiController.kaydet);
router.post('/dokumSahasi/guncelle', DokumSahasiController.guncelle);
router.post('/dokumSahasi/sil', DokumSahasiController.sil);
router.post('/dokumSahasi/bul', DokumSahasiController.bul);
router.post('/dokumSahasi/listele', DokumSahasiController.listele);

router.post('/guzergah/kaydet', GuzergahController.kaydet);
router.post('/guzergah/guncelle', GuzergahController.guncelle);
router.post('/guzergah/sil', GuzergahController.sil);
router.post('/guzergah/bul', GuzergahController.bul);
router.post('/guzergah/listele', GuzergahController.listele);
router.post('/guzergah/detayListe', GuzergahController.detayListe);

router.post('/guzergahFiyat/kaydet', GuzergahFiyatController.kaydet);
router.post('/guzergahFiyat/guncelle', GuzergahFiyatController.guncelle);
router.post('/guzergahFiyat/sil', GuzergahFiyatController.sil);
router.post('/guzergahFiyat/bul', GuzergahFiyatController.bul);
router.post('/guzergahFiyat/listele', GuzergahFiyatController.listele);
router.post('/guzergahFiyat/detayListe', GuzergahFiyatController.detayListe);

router.post('/istasyon/kaydet', IstasyonController.kaydet);
router.post('/istasyon/guncelle', IstasyonController.guncelle);
router.post('/istasyon/sil', IstasyonController.sil);
router.post('/istasyon/bul', IstasyonController.bul);
router.post('/istasyon/listele', IstasyonController.listele);
router.post('/istasyon/detayListe', IstasyonController.detayListe);



//router.post('/signout', UserController.signout);
//router.post('/loginuser', user.loginuser);

module.exports = router;