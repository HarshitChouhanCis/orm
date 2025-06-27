import prisma from "../DB/db.config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


//  show user name and comment inside post
export const fetchUsers = async (req, res) => {
  console.log('req:====>', req.user);
  const users = await prisma.user.findMany({
    select:{
      id:true,
      name:true,
      post:
      {
        select:{
          id:true,
          comment:true,
          comment_count:true
        }
      }
    }
  })

   return res.json({status :200 ,data :users , message:"all data"})
};



// show user details include comment model show comment
// export const fetchUsers = async (req, res) => {
//   const users = await prisma.user.findMany({
//     include:{ 
//       comment:{
//         select:{
//         comment:true     
//       }}

//     }
    
//   })

//    return res.json({status :200 ,data :users , message:"all data"})
// };




// show user post and its title
// export const fetchUsers = async (req, res) => {
//   const users = await prisma.user.findMany({
  
//       select :{
//          post : {
//           select:{
//             title :true} 
//           }
         
//       }
//   })

//    return res.json({status :200 ,data :users , message:"all data"})
// };




// post include title and comment_count
// export const fetchUsers = async (req, res) => {
//   const users = await prisma.user.findMany({
//    include:{
//       post:{
//          select:{
//             title: true,
//             comment_count: true,
//          },
//       },
//    },
//   })

//    return res.json({status :200 ,data :users , message:" all data"})
// };




// // is me _count name ki field bane gi and post ka count aa jaye ga
// export const fetchUsers = async (req, res) => {
//   const users = await prisma.user.findMany({
//    select:{
//       _count:{
//          select:{
//             post: true,
//             comment: true,
//          }
//        }
//      }
//    })
//    return res.json({status :200 ,data :users , message:" all data"})
// };




// post include all data
// export const fetchUsers = async (req, res) => {
//   const users = await prisma.user.findMany({
//    select:{
//       _count:{
//          select:{
//             post: true,
//             comment: true,
//          }
//        }
//      }
//    })
//    return res.json({status :200 ,data :users , message:" all data"})
// };




//  export const fetchUsers = async (req, res) => {
//   const users = await prisma.user.findMany({
//     select: {
//    post :{
//       select:{
//       id: true,
//       user:{
//          select:{
//             name : true,
//             id:true,
//          },
//       },
//     }
//    }}
//    })
//    return res.json({status :200 ,data :users , message:" all data"})
// };



// // show name and post count
// export const fetchUsers = async (req, res) => {
//   const users = await prisma.user.findMany({
//      select: {
//         post: true,     // may be not use it
//       },
//       select :{
//          name: true,
//          _count :{
//              select: { post: true },
//          }
//       }

//    })
//    return res.json({status :200 ,data :users , message:" all data"})
// };

// //  show name where post count is max in desc order (take return result like 2 result)
// export const fetchUsers = async (req, res) => {
//    const users = await prisma.user.findMany({
//       orderBy: {
//          post: {
//             // _count: 'asc',
//             _count: 'desc',
//          },
//       },
//       //   take: 2, // get only the top user with max posts
//       select: {
//          name: true,
//          _count: {
//             select: {
//                post: true,
//             },
//          },
//       },
//    });
//    return res.json({status :200 ,data :users , message:" all data"})
// };



// // show name where post count is max
// export const fetchUsers = async (req, res) => {
//   const topUser = await prisma.user.findFirst({
//       orderBy: {
//         post: {
//           _count: 'desc',
//         },
//       },
//       select: {
//         _count: {
//           select: {
//             post: true,
//           },
//         },
//       },
//     });

//     const maxPostCount = topUser?._count?.post|| 0;

//     // Step 2: Get all users with that max post count
//     const usersWithMaxPosts = await prisma.user.findMany({
//       where: {
//         post: {
//           some: {}, // ensure they have posts
//         },
//       },
//       select: {
//         name: true,
//         _count: {
//           select: {
//             post: true,
//           },
//         },
//       },
//     });

//     // Filter users to only those who have the max count
//     const filteredUsers = usersWithMaxPosts.filter(
//       (user) => user._count.post === maxPostCount
//     );

//     return res.json({
//       status: 200,
//       data: filteredUsers,
//       message: 'Users with max post count',
//     });
// };




// // show name where post count is mix
// export const fetchUsers = async (req, res) => {
//   const topUser = await prisma.user.findFirst({
//       orderBy: {
//         post: {
//           _count: 'asc',
//         },
//       },
//       select: {
//         _count: {
//           select: {
//             post: true,
//           },
//         },
//       },
//     });
//     const maxPostCount = topUser?._count?.post|| 0;
//     // Step 2: Get all users with that max post count
//     const usersWithMaxPosts = await prisma.user.findMany({
//       where: {
//         post: {
//           some: {}, // ensure they have posts
//         },
//       },
//       select: {
//         name: true,
//         _count: {
//           select: {
//             post: true,
//           },
//         },
//       },
//     });

//     // Filter users to only those who have the max count
//     const filteredUsers = usersWithMaxPosts.filter(
//       (user) => user._count.post === maxPostCount
//     );

//     return res.json({
//       status: 200,
//       data: filteredUsers,
//       message: 'Users with max post count',
//     });
// };



// // show name where post and second max
// export const fetchUsers = async (req, res) => {
//  const usersWithCounts = await prisma.user.findMany({
//       select: {
//         name: true,
//         _count: {
//           select: {
//             post: true,
//           },
//         },
//       },
//       where: {
//         post: {
//           some: {}, // users with at least one post
//         },
//       },
//     });


//     // Step 2: Extract unique post counts and sort descending
//     const uniqueCounts = [
//       ...new Set(usersWithCounts.map(user => user._count.post)),
//     ] 
//      .sort((a, b) => b - a);
//      //high to low

//     //  .sort((a, b) => a - b);
//     // low to high

//     //  [3,1,5,2]
//     // [5, 3, 2, 1]
//     const secondMaxPostCount = uniqueCounts[0] || 0;

//     // Step 3: Filter users who have the second max post count
//     const filteredUsers = usersWithCounts.filter(
//       user => user._count.post === secondMaxPostCount
//     );
  
//     return res.json({
//       status: 200,
//       data: filteredUsers[filteredUsers.length-1],
//       message: 'Users with second max post count',
//     });
//    }




// show name where post count is mix (not correct)
// export const fetchUsers = async (req, res) => {
//  const users = await prisma.user.findMany({
//   orderBy: {
//     post: {
//       _count: 'asc',
//     },
//   },
//   take: 2, // get only the top user with min posts
//   select: {
//     name: true,
//     _count: {
//       select: {
//         post: true,
//       },
//     },
//   },
// });
//    return res.json({status :200 ,data :users , message:" all data"})
// };


// // user with uske sare post
// export const fetchUsers = async (req, res) => {
//   const users = await prisma.user.findMany({
//     select: {
//       name: true,
//       post: {
//          select :{
//                     description :  true

//       } 
//       }
//     }
      
//   })

//    return res.json({status :200 ,data :users , message:"all data"})
// };


//  // user data with post ke sath
// export const fetchUsers = async (req, res) => {
//   const users = await prisma.user.findMany({
//     include: {
//       post: 
//       {
//          select :{
//           title: true,
//           comment_count :  true
//       } 
//       }
//     }
      
//   })

//    return res.json({status :200 ,data :users , message:"all data"})
// };


//  // user data with post count and also comment count
// export const fetchUsers = async (req, res) => {
//   const users = await prisma.user.findMany({
//     select: {
//       _count: 
//       {
//          select :{
//          post: true,
//          comment : true,   
//       } 
//       }
//     }
      
//   })
//      return res.json({status :200 ,data :users , message:"all data"})
// };

// user creation with role
export const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const findUser = await prisma.user.findUnique({
    where: { email },
  });

  if (findUser) {
    return res.status(400).json({ message: "Email already taken. Use another email." });
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role || "CUSTOMER", // 👈 default to CUSTOMER if not provided
    },
  });

  return res.status(200).json({
    data: newUser,
    message: "User created successfully",
  });
};

// user creation 
// export const createUser = async(req, res) =>{
//    const {name,email,password} = req.body;
//    const findUser = await prisma.user.findUnique({
//       where :{
//          email:email
//       }
//    })
//    if(findUser){
//     return res.json({status:400 , message: "email already taken. use another email "})
//    }
//    const saltRounds = 10;
//    const hashedPassword = await bcrypt.hash(password, saltRounds);
//    const newUser = await prisma.user.create({
//     data :{
//         name: name,
//         email: email,
//         password: hashedPassword
//     }
//    })
//    return res.json({status :200 ,data :newUser , message:" user create successfully"})
// };

export const updateUser = async(req,res) =>{
   const userId = req.params.id;
   const {name,email,password} = req.body;

   await prisma.user.update({
      where :{
         id : Number(userId)
      },
      data:{
            name,
            email,
            password
      }
   })
 
  return res.json({ status: 200, message: "User updated successfully" });
};

export const showUser = async (req, res) => {
  
  // const userId = req.params.id;
  const userId = req.user.id;
  const user = await prisma.user.findFirst({
    where: {
      id: Number(userId),
    },
  });

  return res.json({ status: 200, data: user });
};

export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });

  return res.json({ status: 200, msg: "User deleted successfully" });
};


// Secret keys (keep them in .env in real projects)
const ACCESS_TOKEN_SECRET = "access_secret_key";
const REFRESH_TOKEN_SECRET = "refresh_secret_key";

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, ACCESS_TOKEN_SECRET, {
    expiresIn: "59m", // short-lived
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d", // long-lived
  });
};

// ⏩ Login API
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ status: 404, message: "User not found" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ status: 401, message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Save refresh token in DB if needed (optional)
  // You can also save in Redis for better management

  return res.json({
    status: 200,
    message: "Login successful",
    accessToken,
    refreshToken,
  });
};

// 🔁 Refresh Token API
export const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(decoded);

    return res.json({
      status: 200,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};
