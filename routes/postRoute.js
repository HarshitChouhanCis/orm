import {Router} from "express";
import {
  createPost,
  updatePost,
  fetchPosts,
  showPost,
  deletePost,
  searchPost,
}from "../Controller/PostController.js"

const router = Router()

router.post("/",createPost)
router.get("/search",searchPost)
router.put("/:id",updatePost)
router.get("/",fetchPosts)
router.delete("/:id",deletePost)
router.get("/:id",showPost)




export default router