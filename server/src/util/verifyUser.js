import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ success: false, msg: "Unauthorized user!" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ success: false, msg: "Invalid token" });
    }

    req.userData = decodedToken;
    next();
  });
};
