import {Router} from "express";
import {
  createComment,
  fetchComments,
  updateComment,
  showComment,
  deleteComment
}from "../Controller/CommentController.js"

const router = Router()

router.post("/",createComment)
router.put("/:id",updateComment)
router.get("/",fetchComments)
router.delete("/:id",deleteComment)
router.get("/:id",showComment)




export default router