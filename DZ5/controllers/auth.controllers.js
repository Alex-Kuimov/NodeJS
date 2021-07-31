const passport = require('passport');
const { tokensGenerate, tokenGetPayload } = require('../helpers/tokens.helpers');

const User = require('../db').models.user;

module.exports.registration = async (req, res) => {
    try {
      const { userName, surName, firstName, middleName, password } = req.body;
      
      const permission = {
        chat: { C: true, R: true, U: true, D: true },
        news: { C: true, R: true, U: true, D: true },
        settings: { C: true, R: true, U: true, D: true }
      };

      const newUser = {
        userName,
        surName,
        firstName,
        middleName,
        password,
        permission,
      };
  
      const user = await User.create(newUser);
      const tokens = tokensGenerate(user.dataValues);
     
      const responseData = {
        id: user.id,
        image: user.image,
        userName,
        surName,
        firstName,
        middleName,
         ...tokens,
        permission,
      };
  
      res.json({...responseData});
    }
    catch(err) {
      console.error(err);
      res.json({result: false, err});
    }
};

module.exports.login = async (req, res, next) => {
    try {
      const { userName, password } = req.body;
  
      const user = await User.findOne({ userName });
      const user_id = user.id;

      passport.authenticate("local", (err, user) => {
        if(err){
          return next(err)
        }
        req.login(user, () => {
          const tokens = tokensGenerate(user);  
  
          responseData = {
            id: user.id,
            image: user.image,
            userName: user.userName,
            surName: user.surName,
            firstName: user.firstName,
            middleName: user.middleName,
            ...tokens,
            permission: user.permission,
          };  
  
          res.json({...responseData});
        })
      })(req, res, next)
  
    }
    catch(err) {
      console.error(err);
      res.json({result: false, err});
    }
};

module.exports.refreshToken = async (req, res) => {
    try {
  
      const token = req.headers.authorization;
      const payload = tokenGetPayload(token);
      const user = await User.findOne({ _id: payload.id });
      const tokens = tokensGenerate(user);
  
      res.json({result: true, data: tokens});
    }
    catch(err) {
      console.error(err);
      res.json({result: false, err});
    }
};