import prisma from "../DB/db.config.js";


export const fetchPosts = async (req, res) => {

  // pagination
  let page = Number(req.query.page || 1)
  let limit = Number(req.query.limit || 10)
  if(page <= 0){
    page = 1
  }
   if(limit <= 0 || limit >100){
    limit = 10;
  }
  const skip = (page -1) * limit
  const posts = await prisma.post.findMany({
    skip:skip,
    take:limit,
    include:{
      comment: {
        include:{
          user:{
            select:{
              name:true,
            }
          }
        }
      },
    }
  })

  // to get the total count
  const totalPosts = await prisma.post.count()
  const totalPages = Math.ceil(totalPosts/limit)

   return res.json({status :200 ,data :posts , message:" all data",meta:{totalPages,currentPage: page,limit:limit,},})
};


// 
export const fetchPosts1 = async (req, res) => {
  const posts = await prisma.post.findMany({
    include:{
      comment: {
        include:{
          user:{
            select:{
              name:true,
            }
          }
        }
      },
    },

    orderBy:{
      id:"desc",
    },
  


    // post count greater then 1
    // where:{
    //   comment_count:{gte:1}
    // }

    // // // // show data where title start with hi
    // where:{
    //   title:{startsWith:"_hi "}
    // }

    // show data where title end With blogs
    // where:{
    //   title:{endsWith:"blogs"}
    // }

    // show data where title equal to "post blogs"
    // where:{
    //   title:{equals:"Post blogs",
    //   }
    // }

    // show data where title equal to "Post blogs" without case sensitive
    // where:{
    //   title:{equals:"Post blogs",
    //   mode: 'insensitive',
    //   }
    // }

    // Or condition ===> title start with hi OR title end with blogs
    // where :{
    //   OR: [
    //   {
    //     title: {
    //       startsWith: " hi ",
    //     },
    //   },
    //   { title: { endsWith: 'blogs' } },
    // ],
    // }

    // AND condition ===> title start with hi AND title end with fun2
    // where :{
    //   AND: [
    //   {
    //     title: {
    //       startsWith: " hi ",
    //     },
    //   },
    //   { title: { endsWith: 'fun2' } },
    // ],
    // }


    
    // not condition ===> title NOT start with hi
    // where :{
    //   NOT: 
    //   {
    //     title: {
    //       startsWith: " hi ",
    //     },
    //   },
    // }



    
    
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

// searching===================================================
export const searchPost = async (req, res) => {

  const query = req.query.q
  const posts = await prisma.post.findMany({
    where:{
      description:{
        search: query      // ye bhi searching ke liye hai

        // contains: query   // ye bhi searching ke liye hai pr utna achha nhi hai for long text (performance achhi nhi hai)

      }
    }
  })
  return res.json({ status: 200, data: posts });
}