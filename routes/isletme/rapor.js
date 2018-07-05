const Sequelize = require('sequelize');
const {BorcAlacakFisi} = require('./borcAlacakFisi');
const {CariKart} = require('./cariKart');

const {Sahis} = require('./sahis');
const {Sirket} = require('./sirket');
const {Santiye} = require('./../lokasyon/santiye');
const {Arac} = require('./../arac/arac');

const excel = require('node-excel-export');


// You can define styles as json object
// More info: https://github.com/protobi/js-xlsx#cell-styles
const styles = {
    headerDark: {
      /*fill: {
        fgColor: {
          rgb: 'FFFFFFFF'
        }
      },*/
      font: {
        color: {
          rgb: '00000000'
        },
        sz: 14,
        bold: true,
        underline: true
      }
    } 
  };
   
  //Array of objects representing heading rows (very top)
  const heading = [
    [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
    ['a2', 'b2', 'c2'] // <-- It can be only values
  ];

/*  
cariAd : resultSetItem.cariKart.ad,
santiyeAd : resultSetItem.santiye.ad,
sahisSirketAd : ((resultSetItem.dataValues.sahis.ad != '') ? resultSetItem.dataValues.sahis.ad : resultSetItem.dataValues.sirket.ad),
irsaliyeNo: resultSetItem.irsaliyeNo,
aciklama: resultSetItem.aciklama,
plaka: resultSetItem.arac.plaka,
borc: ((resultSetItem.dataValues.borc_alacak_tur == 0) ? resultSetItem.tutar : 0),
alacak: ((resultSetItem.dataValues.borc_alacak_tur == 1) ? resultSetItem.tutar : 0)
*/
  //Here you specify the export structure
  const specification = {
    cariAd: { // <- the key should match the actual data key
      displayName: 'Cari Ad', // <- Here you specify the column header
      headerStyle: styles.headerDark, // <- Header style
      /* cellStyle: function(value, row) { // <- style renderer function
        // if the status is 1 then color in green else color in red
        // Notice how we use another cell value to style the current one
        return (row.status_id == 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible 
      }, */
      width: 120 // <- width in pixels
    },
    santiyeAd: {
      displayName: 'Santiye',
      headerStyle: styles.headerDark,
      width: 120 // <- width in pixels
    },
    sahisSirketAd: {
      displayName: 'Şahıs/Şirket',
      headerStyle: styles.headerDark,
      width: 140 // <- width in pixels
    },
    irsaliyeNo: {
      displayName: 'İrsaliye No',
      headerStyle: styles.headerDark,
      width: 90 // <- width in pixels
    },
    aciklama: {
      displayName: 'Açıklama',
      headerStyle: styles.headerDark,
      width: 200 // <- width in pixels
    },
    plaka: {
      displayName: 'Plaka',
      headerStyle: styles.headerDark,
      width: 100 // <- width in pixels
    },
    tutar: {
      displayName: 'Tutar',
      headerStyle: styles.headerDark,
      width: 160 // <- width in pixels
    },
    borc: {
      displayName: 'Borc',
      headerStyle: styles.headerDark,
      width: 160 // <- width in pixels
    },
    alacak: {
      displayName: 'Alacak',
      headerStyle: styles.headerDark,
      width: 160 // <- width in pixels
    }
    
  }

  const merges = [
    { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
    { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
    { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
  ]
   
  // Create the excel report.
  // This function will return Buffer

  var datasetX = [];

const Rapor = {
    borcAlacak: function (req, res) {
        BorcAlacakFisi.findAll({
          where: {cariKartId: req.body.cariKartId},
          attributes: ['id', 'santiye_id','cari_kart_id', 'tutar', 'borc_alacak_tur', 'iskonto','son_tutar' ,'tarih', 'aciklama' , 'is_deleted'],
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
            },
            {
              model: Arac,
              required: false,
              attributes: [ 'id', 'plaka',  'is_deleted' ],
            }
        ],
          $sort: { id: 1 }
        })
        .then((data) => {
        data.forEach((resultSetItem) => {
            console.log(resultSetItem);

            console.log('cari_kart_id:' + resultSetItem.get('cari_kart_id'));
            console.log('tutar:' + resultSetItem.get('tutar'));
            console.log('cariKart.id:' + resultSetItem.cariKart.id);

            var rowX = {
              cariAd : resultSetItem.cariKart.ad,
              santiyeAd : resultSetItem.santiye.ad,
              sahisSirketAd : ((resultSetItem.cariKart.sahi.ad != '') ? resultSetItem.cariKart.sahi.ad: resultSetItem.cariKart.sirket.ad),
              irsaliyeNo: resultSetItem.irsaliyeNo,
              aciklama: resultSetItem.aciklama,
              plaka: ((resultSetItem.arac != null) ? resultSetItem.arac.plaka: '-') ,
              tutar: 0,
              borc: ((resultSetItem.dataValues.borc_alacak_tur == 0) ? resultSetItem.tutar : 0),
              alacak: ((resultSetItem.dataValues.borc_alacak_tur == 1) ? resultSetItem.tutar : 0)
            };

            datasetX.push(rowX);
        });

        return datasetX;

 
        //res.status(200).json({'result': data, 'count': data.count });
        }).then((datasetX) => {
        
        console.log(datasetX);

        const report = excel.buildExport(
          [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
            {
              name: 'Report', // <- Specify sheet name (optional)
              //heading: heading, // <- Raw heading array (optional)
              //merges: merges, // <- Merge cell ranges
              specification: specification, // <- Report specification
              data: datasetX // <-- Report data
            }
          ]
        );

        res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
        return res.send(report);

      }) ;
    },
    dl : function (req, res) {
        // You can then return this straight
        res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
        return res.send(report);
    }
}

// OR you can save this buffer to the disk by creating a file.

module.exports = { Rapor };