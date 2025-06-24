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
  return res.json({ status: 200, data: comments, message: " all Comment" });
};

export const createComment = async (req, res) => {
  const { post_id, user_id, comment } = req.body;
  // increase the commment counter where increase the comment
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        increment: 1,
      },
    },
  });

  const newComment = await prisma.comment.create({
    data: {
      post_id: Number(post_id),
      user_id: Number(user_id),
      comment,
    },
  });
  return res.json({
    status: 200,
    data: newComment,
    message: " Comment create successfully",
  });
};

export const updateComment = async (req, res) => {
  const userId = req.params.id;
  const { post_id, user_id, comment } = req.body;

  await prisma.comment.update({
    where: {
      id: userId,
    },
    data: {
      post_id,
      user_id,
      comment,
    },
  });

  return res.json({ status: 200, message: "Comment updated successfully" });
};

// // only show the comment
export const showComment = async (req, res) => {
  const commentId = req.params.id;
  const user = await prisma.comment.findFirst({
    where: {
      id: commentId,
    },
  });

  return res.json({ status: 200, data: user, message: "show Comment" });
};


// show the comment and its reply
export const showComment1 = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        replies: {
          include: {
            user: {
              select: { id: true, name: true}, // include user info if needed
            },
          },
        },
        user: {
          select: { id: true, name: true },
        },
      },
    });

    if (!comment) {
      return res.status(404).json({ status: 404, message: "Comment not found" });
    }

    return res.json({ status: 200, data: comment, message: "Show comment with replies" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 500, message: "Something went wrong" });
  }
};


// show post and it's nested comment
// export const showComment = async (req, res) => {
//   const postId = parseInt(req.params.id);
//   console.log('postId:', postId);
  

//   try {
//     const allComments = await prisma.comment.findMany({
//       where: { post_id: postId },
//       orderBy: { created_at: 'asc' },
//       include: {
//         user: { select: { id: true, name: true } },
//       },
//     });
//     function buildNestedComments(comments, parentId = null) {
//   return comments
//     .filter(comment => comment.reply_comment_id === parentId)
//     .map(comment => ({
//       ...comment,
//       replies: buildNestedComments(comments, comment.id)
//     }));
// }
   

//     const nestedComments = buildNestedComments(allComments);

//     return res.json({
//       status: 200,
//       data: nestedComments,
//       message: "Comments with nested replies",
//     });
//   } catch (error) {
//     console.error("Error fetching comments:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

export const deleteComment = async (req, res) => {
  const userId = req.params.id;
  const { post_id } = req.body;
  // decrease the commment counter when delete the comment
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
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
