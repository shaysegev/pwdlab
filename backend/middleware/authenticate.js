const User = require('./../models/user');

const authenticate = async (req, res, next) => {
  const token = req.header('authorization');
  console.log(token);
  

  try {
    const user = await User.findByToken(token);
    console.log(user)
    if (!user) {
      return res.status(401).send();
    }
  
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send();
  }
  
};

module.exports = authenticate;
