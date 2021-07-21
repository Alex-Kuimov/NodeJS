var express = require('express');
var router = express.Router();

const User = require('../db').models.user;

/* GET users listing. */
router.get('/', async (req, res, next) => {
  try {
    const result = await User.findAll();
    res.json({success: true, data: result});
  }
  catch(err) {
    console.error(err);
    res.json({success: false, err});
  }
});


module.exports = router;
