module.exports.profile = async (req, res) => {
    try {
      const user = req.user;
      const response = {
        id: user._id,
        username: user.username,
        surName: user.surName,
        firstName: user.firstName,
        middleName: user.middleName,
        permission: user.permission,
        image: user.image,
      };
      res.status(200).json(response);
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Что-то пошло не так' });
    }
  };