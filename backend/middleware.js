/*
An authentication middleware in Express is used to verify the identity of a
user before granting access to protected routes or resources. It checks if the incoming
request contains a valid authentication token (e.g., JWT)
and ensures that the user is authorized to access the requested resource
*/
//get the secret key also
const { JWT_SECRET } = require("./config");
//first setup the JWT
const jwt = require("jsonwebtoken");

//Create an authentication middleware function that verifies the JWT token in the request header.
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log(req.headers);
  //if this authHeader does not work
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      message: "Unauthorized: Missing token",
    });
  }

  const token = authHeader.split(" ")[1];

  console.log(token);
  try {
    //this will check if both matches
    const decoded = await jwt.verify(token, JWT_SECRET);

    console.log(decoded);
    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({
        message: "Unauthorized: Missing token userId",
      });
    }
  } catch (error) {
    return res.status(403).json({
      message: "Unauthorized: Missing token userId2",
    });
  }
};
module.exports = authMiddleware;
