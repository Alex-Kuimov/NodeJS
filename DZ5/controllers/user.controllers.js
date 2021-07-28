const User = require('../db').models.user;

module.exports.users = async (req, res) => {
    try {
      const result = await User.findAll();
      res.json({success: true, data: result});
    }
    catch(err) {
      console.error(err);
      res.json({success: false, err});
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
      const {id} = req.params;
  
      const result = await User.destroy({where: {id}});
      res.json({success: true, data: result});
    }
    catch(err) {
      console.error(err);
      res.json({success: false, err});
    }
  };