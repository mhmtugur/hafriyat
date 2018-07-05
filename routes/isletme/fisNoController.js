const Sequelize = require('sequelize');

const {YakitFisi} = require('./yakitFisi');
const {SeferFisi} = require('./seferFisi');

const FisNoController = {
    yakitSeriNo : function(req, res) {
      YakitFisi.max(  'sira_no', {where : {seriNo: req.body.seriNo }})
      .then(function(siraNo){
      if (!siraNo) {
        siraNo = 0;
      }
      res.status(200).json({siraNo:siraNo+1});
         console.log(siraNo);
      })
      .error(function(error){
        res.status(400).send({ message: err });
        console.log(error);
      });
    },     
    seferSeriNo : function(req, res) {
      SeferFisi.max(  'sira_no', {where : {seriNo: req.body.seriNo }})
      .then(function(siraNo){
      if (!siraNo) {
        siraNo = 0;
      }
      res.status(200).json({siraNo:siraNo+1});
         console.log(siraNo);
      })
      .error(function(error){
        res.status(400).send({ message: err });
        console.log(error);
      });
    }
}

module.exports = {FisNoController};