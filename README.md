# SERVISLER #



This README would normally document whatever steps are necessary to get your application up and running.



## AUTH ##



### USER REGISTER ###



* REQUEST:



* URL: http://localhost:3000/auth/register

* METHOD: POST

* CUSTOM HEADER : Header name : Authorization, Header value: "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVyZGFsYml0aWtAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJFcmRhbCBCaXRpayIsImlhdCI6MTUyMDMzMTQ3OX0.l3_YblmQS3pyW9oZg3wpZFe1btOrWCfi8MxNJXlLz8U"

* BODY: {"username": "erdalbitik", "password": "123456", "name": "Erdal", "surname": "Bitik"}

* CONTENT TYPE: application/json



* SAMPLE RESPONSE



* BODY: {

		"isDeleted": false,

		"id": 7,

		"username": "erdalbitik",

		"name": "Erdal",

		"surname": "Bitik",

		"updatedAt": "2018-03-07T15:25:49.693Z",

		"createdAt": "2018-03-07T15:25:49.693Z"

		}

		

		

* BODY(ERROR CASE): {

					"message": {

					"name": "SequelizeUniqueConstraintError",

					"errors": [

						{

							"message": "username must be unique",

							"type": "unique violation"

						}]

					} 



* CONTENT TYPE: application/json



### SIGN IN ###



* URL: http://localhost:3000/auth/signin

* METHOD: POST

* CUSTOM HEADER:

* BODY: {"username": "erdalbitik", "password": "123456"}

* CONTENT TYPE: application/json



* SAMPLE RESPONSE



* BODY: {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRXJkYWwiLCJzdXJuYW1lIjoiQml0aWsiLCJpYXQiOjE1MjA0MzQ4ODJ9.JQPvFp_qyhQzlS_7azXhEWdNnCVH9USBWJe4a7G56rQ"}

* BODY( ERROR CASE ): {

						"message": {

						"name": "SequelizeUniqueConstraintError",

						"errors": [

							{

								"message": "username must be unique",

								"type": "unique violation"

							}]

						}

* CONTENT TYPE: application/json

# CRUD OPERASYONLARI ICIN URL ve OBJE TIPLERI #

/arac

/kaydet', AracController.kaydet);
/guncelle', AracController.guncelle);
/sil', AracController.sil);
/bul', AracController.bul);
/listele', AracController.listele);

    plaka : { type: Sequelize.STRING, allowNull: false, unique: true },
    cariKartId : { type: Sequelize.INTEGER, allowNull: false, unique: true , field: 'cari_kart_id'},
    depoKapasite: { type:  Sequelize.DECIMAL, allowNull: false , field: 'depo_kapasite'},
    aracTurId: { type:  Sequelize.INTEGER, allowNull: false , field: 'arac_tur_id'},
    aracKategoriId:  { type:  Sequelize.INTEGER, allowNull: false  , field: 'arac_kategori_id'},
    aracMarkaId:  { type:  Sequelize.INTEGER, allowNull: false , field: 'arac_marka_id'},
    aracModel: { type:  Sequelize.STRING, allowNull: true  , field: 'arac_model'},
    olusturanKullanici: { type:  Sequelize.INTEGER, allowNull: false  , field: 'olusturan_kullanici'},
    guncelleyenKullanici: { type:  Sequelize.INTEGER, allowNull: true  , field: 'guncelleyen_kullanici'},
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}


/marka/kaydet', AracMarkaController.kaydet);
/marka/guncelle', AracMarkaController.guncelle);
/marka/sil', AracMarkaController.sil);
/marka/bul', AracMarkaController.bul);
/marka/listele', AracMarkaController.listele);

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: true , field: 'ad'},
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}


/tur/kaydet', AracTurController.kaydet);
/tur/guncelle', AracTurController.guncelle);
/tur/sil', AracTurController.sil);
/tur/bul', AracTurController.bul);
/tur/listele', AracTurController.listele);

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: true , field: 'ad'},
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}

/kategori/kaydet', AracKategoriController.kaydet);
/kategori/guncelle', AracKategoriController.guncelle);
/kategori/sil', AracKategoriController.sil);
/kategori/bul', AracKategoriController.bul);
/kategori/listele', AracKategoriController.listele);

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: true , field: 'ad'},
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}

	------------------------------------------------------------------------------------------
	
/isletme

/sirket/kaydet', SirketController.kaydet);
/sirket/guncelle', SirketController.guncelle);
/sirket/sil', SirketController.sil);
/sirket/bul', SirketController.bul);
/sirket/listele', SirketController.listele);

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: true , field: 'ad'},
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}

/cariKart/kaydet', CariKartController.kaydet);
/cariKart/guncelle', CariKartController.guncelle);
/cariKart/sil', CariKartController.sil);
/cariKart/bul', CariKartController.bul);
/cariKart/listele', CariKartController.listele);

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: true , field: 'ad'},
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
    
    
/yakitTuru/kaydet', YakitTuruController.kaydet);
/yakitTuru/guncelle', YakitTuruController.guncelle);
/yakitTuru/sil', YakitTuruController.sil);
/yakitTuru/bul', YakitTuruController.bul);
/yakitTuru/listele', YakitTuruController.listele);

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: true , field: 'ad'},
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}


/yakitFiyat/kaydet', YakitFiyatController.kaydet);
/yakitFiyat/guncelle', YakitFiyatController.guncelle);
/yakitFiyat/sil', YakitFiyatController.sil);
/yakitFiyat/bul', YakitFiyatController.bul);
/yakitFiyat/listele', YakitFiyatController.listele);


    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sirketId: { type:  Sequelize.INTEGER, allowNull: false , field: 'sirket_id'},
    santiyeId: { type:  Sequelize.INTEGER, allowNull: false , field: 'santiye_id'},
    istasyonId: { type:  Sequelize.INTEGER, allowNull: false , field: 'istasyon_id'},
    yakitTuruId : {type:  Sequelize.INTEGER, allowNull: false , field: 'yakit_tur_id'},    
    baslangicTarihi: { type:  Sequelize.DATEONLY, allowNull: false , field: 'baslangic_tarihi'},
    bitisTarihi: { type:  Sequelize.DATEONLY, allowNull: false , field: 'bitis_tarihi'},
    fiyat : { type:Sequelize.DECIMAL,allowNull:false,field:'fiyat'},
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}



/yakitFisi/kaydet', YakitFisiController.kaydet);
/yakitFisi/guncelle', YakitFisiController.guncelle);
/yakitFisi/sil', YakitFisiController.sil);
/yakitFisi/bul', YakitFisiController.bul);
/yakitFisi/listele', YakitFisiController.listele);

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cariKartId : { type: Sequelize.INTEGER, allowNull: false, unique: true , field: 'cari_kart_id'},
    sirketId: { type:  Sequelize.INTEGER, allowNull: false , field: 'sirket_id'},
    santiyeId: { type:  Sequelize.INTEGER, allowNull: false , field: 'santiye_id'},
    istasyonId: { type:  Sequelize.INTEGER, allowNull: false , field: 'istasyon_id'},
    yakitTuruId : {type:  Sequelize.INTEGER, allowNull: false , field: 'yakit_tur_id'},  
    aracId: { type:  Sequelize.INTEGER, allowNull: false , field: 'arac_id'},
    tarih: { type:  Sequelize.DATEONLY, allowNull: false , field: 'tarih'},
    seriNo:  { type:  Sequelize.STRING, allowNull: true , field: 'seri_no'},
    siraNo:  { type:  Sequelize.INTEGER, allowNull: true , field: 'sira_no'},
    litre : { type:Sequelize.DECIMAL,allowNull:false,field:'litre'},
    litreFiyat : { type:Sequelize.DECIMAL,allowNull:false,field:'litre_fiyat'},
    fisTutar : { type:Sequelize.DECIMAL,allowNull:false,field:'fis_tutar'},
    odemeDurumu : { type:  Sequelize.BOOLEAN, allowNull: true , field: 'odeme_durumu'},
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
    

/borcAlacakFisi/kaydet', BorcAlacakFisiController.kaydet);
/borcAlacakFisi/guncelle', BorcAlacakFisiController.guncelle);
/borcAlacakFisi/sil', BorcAlacakFisiController.sil);
/borcAlacakFisi/bul', BorcAlacakFisiController.bul);
/borcAlacakFisi/listele', BorcAlacakFisiController.listele);    

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cariKartId : { type: Sequelize.INTEGER, allowNull: false, unique: true , field: 'cari_kart_id'},
    sirketId: { type:  Sequelize.INTEGER, allowNull: false , field: 'sirket_id'},
    santiyeId: { type:  Sequelize.INTEGER, allowNull: false , field: 'santiye_id'},
    tutar: { type:  Sequelize.DECIMAL, allowNull: false , field: 'tutar'},
    borcAlacakTur : { type:  Sequelize.BOOLEAN, allowNull: true , field: 'borc_alacak_tur'},
    tarih: { type:  Sequelize.DATEONLY, allowNull: false , field: 'tarih'},
    aciklama: { type:  Sequelize.STRING, allowNull: true , field: 'aciklama'},
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}
    

	------------------------------------------------------------------------------------------
/lokasyon

/santiye/kaydet', SantiyeController.kaydet);
/santiye/guncelle', SantiyeController.guncelle);
/santiye/sil', SantiyeController.sil);
/santiye/bul', SantiyeController.bul);
/santiye/listele', SantiyeController.listele);

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: true , field: 'ad'},
    sirketId: { type:  Sequelize.INTEGER, allowNull: false , field: 'sirket_id'},
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}

/dokumSahasi/kaydet', DokumSahasiController.kaydet);
/dokumSahasi/guncelle', DokumSahasiController.guncelle);
/dokumSahasi/sil', DokumSahasiController.sil);
/dokumSahasi/bul', DokumSahasiController.bul);
/dokumSahasi/listele', DokumSahasiController.listele);

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: true , field: 'ad'},
    aciklama: { type:  Sequelize.STRING, allowNull: true , field: 'aciklama'},
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}


/guzergah/kaydet', GuzergahController.kaydet);
/guzergah/guncelle', GuzergahController.guncelle);
/guzergah/sil', GuzergahController.sil);
/guzergah/bul', GuzergahController.bul);
/guzergah/listele', GuzergahController.listele);

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: true , field: 'ad'},
    santiyeId: { type:  Sequelize.INTEGER, allowNull: false , field: 'santiye_id'},
    dokumSahasiId: { type:  Sequelize.INTEGER, allowNull: false , field: 'dokum_sahasi_id'},
    mesafe: { type:  Sequelize.DECIMAL, allowNull: false , field: 'mesafe'},
    aciklama: { type:  Sequelize.STRING, allowNull: true , field: 'aciklama'},
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}


/guzergahFiyat/kaydet', GuzergahFiyatController.kaydet);
/guzergahFiyat/guncelle', GuzergahFiyatController.guncelle);
/guzergahFiyat/sil', GuzergahFiyatController.sil);
/guzergahFiyat/bul', GuzergahFiyatController.bul);
/guzergahFiyat/listele', GuzergahFiyatController.listele);


    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    sirketId: { type:  Sequelize.INTEGER, allowNull: false , field: 'sirket_id'},
    santiyeId: { type:  Sequelize.INTEGER, allowNull: false , field: 'santiye_id'},
    guzergahId: { type:  Sequelize.INTEGER, allowNull: false , field: 'guzergah_id'},
    aracTurId: { type:  Sequelize.INTEGER, allowNull: false , field: 'arac_tur_id'},
    mesafe: { type:  Sequelize.DECIMAL, allowNull: false , field: 'mesafe'},
    aciklama: { type:  Sequelize.STRING, allowNull: true , field: 'aciklama'},
    baslangicTarihi: { type:  Sequelize.DATEONLY, allowNull: false , field: 'baslangic_tarihi'},
    bitisTarihi: { type:  Sequelize.DATEONLY, allowNull: false , field: 'bitis_tarihi'},
    fiyat : { type:Sequelize.DECIMAL,allowNull:false,field:'fiyat'},
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}


/istasyon/kaydet', IstasyonController.kaydet);
/istasyon/guncelle', IstasyonController.guncelle);
/istasyon/sil', IstasyonController.sil);
/istasyon/bul', IstasyonController.bul);
/istasyon/listele', IstasyonController.listele);

    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ad:  { type:  Sequelize.STRING, allowNull: true , field: 'ad'},
    santiyeId: { type:  Sequelize.INTEGER, allowNull: false , field: 'santiye_id'},
    isDeleted: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false, field: 'is_deleted'}





