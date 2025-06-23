import {Router} from "express"
import UserRoute from "./userRoutes.js"
import PostRoute from "./postRoute.js"
import CommentRoutes from "./commentRoutes.js"

const router = Router()


router.use('/api/user',UserRoute)
router.use('/api/post',PostRoute)
router.use('/api/comment',CommentRoutes)



export default router;