const Article = require('../db').models.article;

module.exports.news = async (req, res) => {
    try {
      const result = await Article.findAll();
      res.json({success: true, data: result});
    }
    catch(err) {
      console.error(err);
      res.json({success: false, err});
    }
};

module.exports.createNews = async (req, res) => {
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
};

module.exports.deleteNews = async (req, res) => {
    try {
      const {id} = req.params;
  
      const result = await Article.destroy({where: {id}});
      res.json({success: true, data: result});
    }
    catch(err) {
      console.error(err);
      res.json({success: false, err});
    }
};