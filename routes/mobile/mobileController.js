const Sequelize = require('sequelize');
const {User} = require('../auth/user');

const Op = Sequelize.Op;

const MobileController = {
  users: function (req, res) {
    let mobileDateStr = req.mobileDate; //"2018-12-24-15-37";
    let mobileDate = getLastWeek();
    if(mobileDateStr) {
      let parts = mobileDateStr.split("-");
      mobileDate = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4]);
    }

    User.findAll({
      where: {
        [Op.or]: [{createdAt: {[Op.gt]: mobileDate}}, {updatedAt: {[Op.gt]: mobileDate}}]
      }
    })
    .then((data) => {
      res.status(200).json({'result': data});
    })
    .catch(function (error) {
      res.status(500).send('Internal Server Error');
    });
  } 
}

function getLastWeek() {
  var today = new Date();
  var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  return lastWeek ;
}

module.exports = {MobileController};