import {Router} from "express";
import {
  createUser,
  updateUser,
  fetchUsers,
  showUser,
  deleteUser,
}from "../Controller/UserControoler.js"

const router = Router()

router.post("/",createUser)
router.put("/:id",updateUser)
router.get("/",fetchUsers)
router.delete("/:id",deleteUser)
router.get("/:id",showUser)




export default router