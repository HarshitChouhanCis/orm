import prisma from "../DB/db.config.js";


export const fetchComments = async (req, res) => {
  const comments = await prisma.comment.findMany({
    include: {
      user: true,
      post: {
        include: {
          user: true,
        },
      },
    },
  });
   return res.json({status :200 ,data :comments , message:" all Comment"})
};

export const createComment = async(req, res) =>{

  const {post_id,user_id,comment} = req.body;
  // increase the commment counter where increase the comment
  // await prisma.post.update({
  //   where :{
  //     id:Number(post_id)
  //   },
  //   data:{
  //     comment_count:{
  //       increment: 1,
  //     },
  //   },
  // })

   const newComment = await prisma.comment.create({
    data :{
           post_id :Number(post_id),
           user_id :Number(user_id),
           comment,
    }
   })
   return res.json({status :200 ,data :newComment , message:" Comment create successfully"})
};

export const updateComment = async(req,res) =>{
   const userId = req.params.id;
   const {post_id,user_id,comment} = req.body;

   await prisma.comment.update({
      where :{
         id : userId
      },
      data:{
            post_id,
            user_id,
            comment
      }
   })
 
  return res.json({ status: 200, message: "Comment updated successfully" });
};

export const showComment = async (req, res) => {
  const commentId = req.params.id;
  const user = await prisma.comment.findFirst({
    where: {
      id: commentId,
    },
  });

  return res.json({ status: 200, data: user, message:"show Comment"});
};

export const deleteComment = async (req, res) => {
  const userId = req.params.id;

    // decrease the commment counter when delete the comment
    await prisma.post.update({
    where :{
      id:Number(post_id)
    },
    data:{
      comment_count:{
        decrement: 1,
      },
    },
  });

  await prisma.comment.delete({
    where: {
      id: userId,
    },
  });

  return res.json({ status: 200, msg: "Comment deleted successfully" });
};
