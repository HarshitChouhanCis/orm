import {Router} from "express";
import {
  createUser,
  updateUser,
  fetchUsers,
  showUser,
  deleteUser,
  login,
  refreshAccessToken
}from "../Controller/UserControoler.js"
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router()

export const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {

    console.log("req.user.role",req.user.role);
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

router.post("/",createUser)
router.post("/login",login)
router.put("/:id",updateUser)
router.get("/", verifyToken, fetchUsers)
router.delete("/:id",deleteUser)
router.get("/show-user", verifyToken , showUser)
router.post("/refreshToken",refreshAccessToken)
router.get("/admin" ,verifyToken ,checkRole(["ADMIN"  ]),fetchUsers)
router.get("/customer" ,verifyToken ,checkRole(["ADMIN", "SELLER"]),fetchUsers)
router.get("/seller" ,verifyToken ,checkRole(["ADMIN", "SELLER", "CUSTOMER"]),fetchUsers)



export default router