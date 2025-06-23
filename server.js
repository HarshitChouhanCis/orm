import express from "express";
import "dotenv/config";
import routers from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/',(req , res)=>{
    return res.send("hello every one welcome you all")
})
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routers)
//  route file that show the routing 

app.listen(PORT,()=>console.log(`server is running on PORT ${PORT}`))
