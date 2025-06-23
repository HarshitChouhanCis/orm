import prisma from "../DB/db.config.js";


export const fetchPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    include:{
      comment: true,
    }
  })
   return res.json({status :200 ,data :posts , message:" all data"})
};

export const createPost = async(req, res) =>{
   const {user_id,title,description} = req.body;
  
   const newPost = await prisma.post.create({
    data :{
       user_id: Number(user_id),
       title,
       description
    }
   })
   return res.json({status :200 ,data :newPost , message:" post create successfully"})
};

export const updatePost = async(req,res) =>{
   const postId = req.params.id;
   const {user_id,title,description} = req.body;

   await prisma.post.update({
      where :{
         id : Number(postId)
      },
      data:{
            user_id,
            title,
            description
      }
   })
 
  return res.json({ status: 200, message: "Post updated successfully" });
};

export const showPost = async (req, res) => {
  const post_id = req.params.id;
  const post = await prisma.post.findFirst({
    where: {
      id: Number(post_id),
    },
  });

  return res.json({ status: 200, data: post });
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  });

  return res.json({ status: 200, msg: "Post deleted successfully" });
};
