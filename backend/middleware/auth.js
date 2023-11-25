const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.TOKEN);
       const userId = decodedToken.userId;
       req.auth = { // objet réponse transmis aux routes suivantes
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};