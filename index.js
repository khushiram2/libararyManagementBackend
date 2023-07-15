import express from "express"
import * as dotenv from "dotenv"
import {libararyRouter} from "./Routes/router.js"
import cors from "cors"
dotenv.config()

const app=express()
app.use(express.json())
app.use(cors())

app.use("/",libararyRouter)


app.listen(7000,()=>console.log("app started on 7000"))