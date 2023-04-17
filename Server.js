import dotenv from 'dotenv'
import express from 'express'
import colors from "colors"
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/CategoryRoutes.js"
import ProductRoutes from "./routes/ProductRoutes.js"
import cors from "cors"
import path from "path"
import { fileURLToPath } from 'url';


// config env
dotenv.config();




// database Connected
 connectDB()

// esmodule fix
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
 

// Rest Object
const app = express();

//  Middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,"./client/build")))

// routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/products',ProductRoutes);

// Rest Api
 app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
 })
 
// PORT
const PORT = process.env.PORT || 8080;

// Run listen

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`.bgMagenta.white)
})
