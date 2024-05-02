/*
An authentication middleware in Express is used to verify the identity of a 
user before granting access to protected routes or resources. It checks if the incoming 
request contains a valid authentication token (e.g., JWT) 
and ensures that the user is authorized to access the requested resource
*/
//first setup the JWT
const jwt = require("jsonwebtoken");
//get the secret key also
const { JWT_SECRET } = require("./config");

//Create an authentication middleware function that verifies the JWT token in the request header.
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  //if this authHeader does not work
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).json({
      message: "Unauthorized: Missing token",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    //this will check if both matches
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (error) {
    return res.status(403).json({});
  }
};
module.exports = {
  authMiddleware,
};
