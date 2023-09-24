import jwt from "jsonwebtoken";
import userModel from "../model/User.js";

const userAuthMiddleware = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      token = authorization.split(" ")[1];
      console.log(token);
      console.log(authorization);
      //varify token
      const { userID } = jwt.verify(token, process.env.SECRET_KEY);
      console.log(userID);

      // getUSer

      req.user = await userModel.findById(userID).select("-password");
      console.log(req.user);
      next();
    } catch (error) {
      console.error("unauthorized error ");
      res.status(401).send("unauthorized User");
    }
  } else {
    res.status(404).send("token ni hai");
  }
};

export default userAuthMiddleware;
