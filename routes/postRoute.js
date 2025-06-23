import {Router} from "express";
import {
  createPost,
  updatePost,
  fetchPosts,
  showPost,
  deletePost,
}from "../Controller/PostController.js"

const router = Router()

router.post("/",createPost)
router.put("/:id",updatePost)
router.get("/",fetchPosts)
router.delete("/:id",deletePost)
router.get("/:id",showPost)




export default router