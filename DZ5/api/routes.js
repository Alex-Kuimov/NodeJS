const express = require('express');
const router = express.Router();

const passport = require('passport');

const User = require('../db').models.user;
const Article = require('../db').models.article;

/* GET users listing. */
router.get('/users/', async (req, res, next) => {
  try {
    const result = await User.findAll();
    res.json({success: true, data: result});
  }
  catch(err) {
    console.error(err);
    res.json({success: false, err});
  }
});

router.post('/registration/', async (req, res, next) => {
  try {
    const { userName, surName, firstName, middleName, password } = req.body;
    const data = {
      userName,
      surName,
      firstName,
      middleName,
      password
    };

    const result = await User.create(data);
    res.json({success: true, data: result});
  }
  catch(err) {
    console.error(err);
    res.json({success: false, err});
  }
});

router.post('/login/', async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    const user = {
      userName,
      password,
    }
    
    passport.authenticate("local", (err, user) => {
      if(err){
        return next(err)
      }
      if(!user){
        return res.send("Wrong email or password")
      }
      req.login(user, () => {
        res.json({success: true, data: user});
      })
    })(req, res, next)

  }
  catch(err) {
    console.error(err);
    res.json({success: false, err});
  }
});

router.delete('/users/:id', async (req, res, next) => {
  try {
    const {id} = req.params;

    const result = await User.destroy({where: {id}});
    res.json({success: true, data: result});
  }
  catch(err) {
    console.error(err);
    res.json({success: false, err});
  }
});

router.get('/news/', async (req, res, next) => {
  try {
    const result = await Article.findAll();
    res.json({success: true, data: result});
  }
  catch(err) {
    console.error(err);
    res.json({success: false, err});
  }
});

router.post('/news/', async (req, res, next) => {
  try {
    const { title, text } = req.body;
    const data = {
      title,
      text,
    };

    const result = await Article.create(data);
    res.json({success: true, data: result});
  }
  catch(err) {
    console.error(err);
    res.json({success: false, err});
  }
});

router.delete('/news/:id', async (req, res, next) => {
  try {
    const {id} = req.params;

    const result = await Article.destroy({where: {id}});
    res.json({success: true, data: result});
  }
  catch(err) {
    console.error(err);
    res.json({success: false, err});
  }
});

module.exports = router;