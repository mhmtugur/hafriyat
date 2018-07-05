var express = require('express');
var router = express.Router();
var {SirketController} = require('./sirketController');
var {CariKartController} = require('./cariKartController');
var {SeferFisiController} = require('./seferFisiController');
var {YakitTuruController} = require('./yakitTuruController');
var {YakitFiyatController} = require('./yakitFiyatController');
var {YakitFisiController} = require('./yakitFisiController');
var {BorcAlacakFisiController} = require('./borcAlacakFisiController');
var {SahisController} = require('./sahisController');
var {FisNoController} = require('./fisNoController');
var {Rapor} = require('./rapor');

router.post('/sirket/kaydet', SirketController.kaydet);
router.post('/sirket/guncelle', SirketController.guncelle);
router.post('/sirket/sil', SirketController.sil);
router.post('/sirket/bul', SirketController.bul);
router.post('/sirket/listele', SirketController.listele);

router.post('/cariKart/kaydet', CariKartController.kaydet);
router.post('/cariKart/guncelle', CariKartController.guncelle);
router.post('/cariKart/sil', CariKartController.sil);
router.post('/cariKart/bul', CariKartController.bul);
router.post('/cariKart/listele', CariKartController.listele);
router.post('/cariKart/detayListe', CariKartController.detayListe);

router.post('/seferFisi/kaydet', SeferFisiController.kaydet);
router.post('/seferFisi/guncelle', SeferFisiController.guncelle);
router.post('/seferFisi/sil', SeferFisiController.sil);
router.post('/seferFisi/bul', SeferFisiController.bul);
router.post('/seferFisi/listele', SeferFisiController.listele);
router.post('/seferFisi/detayListe', SeferFisiController.detayListe);

router.post('/yakitTuru/kaydet', YakitTuruController.kaydet);
router.post('/yakitTuru/guncelle', YakitTuruController.guncelle);
router.post('/yakitTuru/sil', YakitTuruController.sil);
router.post('/yakitTuru/bul', YakitTuruController.bul);
router.post('/yakitTuru/listele', YakitTuruController.listele);

router.post('/yakitFiyat/kaydet', YakitFiyatController.kaydet);
router.post('/yakitFiyat/guncelle', YakitFiyatController.guncelle);
router.post('/yakitFiyat/sil', YakitFiyatController.sil);
router.post('/yakitFiyat/bul', YakitFiyatController.bul);
router.post('/yakitFiyat/listele', YakitFiyatController.listele);
router.post('/yakitFiyat/detayListe', YakitFiyatController.detayListe);
router.post('/yakitFiyat/gecerliYakitFiyat', YakitFiyatController.gecerliYakitFiyat);

router.post('/yakitFisi/kaydet', YakitFisiController.kaydet);
router.post('/yakitFisi/guncelle', YakitFisiController.guncelle);
router.post('/yakitFisi/sil', YakitFisiController.sil);
router.post('/yakitFisi/bul', YakitFisiController.bul);
router.post('/yakitFisi/listele', YakitFisiController.listele);
router.post('/yakitFisi/detayListe', YakitFisiController.detayListe);

router.post('/borcAlacakFisi/kaydet', BorcAlacakFisiController.kaydet);
router.post('/borcAlacakFisi/guncelle', BorcAlacakFisiController.guncelle);
router.post('/borcAlacakFisi/sil', BorcAlacakFisiController.sil);
router.post('/borcAlacakFisi/bul', BorcAlacakFisiController.bul);
router.post('/borcAlacakFisi/listele', BorcAlacakFisiController.listele);
router.post('/borcAlacakFisi/detayListe', BorcAlacakFisiController.detayListe);

router.post('/sahis/kaydet', SahisController.kaydet);
router.post('/sahis/guncelle', SahisController.guncelle);
router.post('/sahis/sil', SahisController.sil);
router.post('/sahis/bul', SahisController.bul);
router.post('/sahis/listele', SahisController.listele);

router.post('/fisNo/sefer', FisNoController.seferSeriNo);
router.post('/fisNo/yakit', FisNoController.yakitSeriNo);

router.post('/rapor/borcAlacak', Rapor.borcAlacak);
router.post('/rapor/dl', Rapor.dl);

module.exports = router;