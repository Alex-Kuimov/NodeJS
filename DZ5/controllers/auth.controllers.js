const passport = require('passport');
const { tokensGenerate, tokenGetPayload } = require('../helpers/tokens.helpers');

const User = require('../db').models.user;
const Permission = require('../db').models.permission;

module.exports.registration = async (req, res) => {
    try {
      const { userName, surName, firstName, middleName, password } = req.body;
      
      const newUser = {
        userName,
        surName,
        firstName,
        middleName,
        password
      };
  
      const user = await User.create(newUser);
      const tokens = tokensGenerate(user.dataValues);

      const permission = await Permission.create({
        user_id: user.id,
        settings_C: true,
        settings_R: true,
        settings_U: true,
        settings_D: true,
        news_C: true,
        news_R: true,
        news_U: true,
        news_D: true,
        chat_C: true,
        chat_R: true,
        chat_U: true,
        chat_D: true,
      });

      const responseData = {
        id: user.id,
        userName,
        surName,
        firstName,
        middleName,
         ...tokens,
         permission: permission.dataValues,
      };
  
      res.json({success: true, data: responseData});
    }
    catch(err) {
      console.error(err);
      res.json({success: false, err});
    }
};

module.exports.login = async (req, res, next) => {
    try {
      const { userName, password } = req.body;
  
      const user = await User.findOne({ userName });
      const user_id = user.id;
      const permission = await Permission.findOne({user_id});

      passport.authenticate("local", (err, user) => {
        if(err){
          return next(err)
        }
        if(!user){
          return res.send("Wrong email or password")
        }
        req.login(user, () => {
          const tokens = tokensGenerate(user);  
  
          responseData = {
            id: user.id,
            userName: user.userName,
            surName: user.surName,
            firstName: user.firstName,
            middleName: user.middleName,
            ...tokens,
            permission: permission,
          };  
  
          res.json({success: true, data: responseData});
        })
      })(req, res, next)
  
    }
    catch(err) {
      console.error(err);
      res.json({success: false, err});
    }
};

module.exports.refreshToken = async (req, res) => {
    try {
  
      const token = req.headers.authorization;
      const payload = tokenGetPayload(token);
      const user = await User.findOne({ _id: payload.id });
      const tokens = tokensGenerate(user);
  
      res.json({success: true, data: tokens});
    }
    catch(err) {
      console.error(err);
      res.json({success: false, err});
    }
};