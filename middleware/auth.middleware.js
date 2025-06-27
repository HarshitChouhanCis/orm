import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = "access_secret_key";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
//   console.log('authHeader:', authHeader);

  if (!authHeader) return res.status(401).json({ message: "Access Denied" });

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, ACCESS_TOKEN_SECRET);
    console.log('verified:', verified);
    req.user = verified;
    next();
  } catch (err) {
    console.log('err:', err);
    return res.status(403).json({ message: "Invalid Token" });
  }
};

