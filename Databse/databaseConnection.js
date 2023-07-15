import { MongoClient } from "mongodb";
import * as dotenv from "dotenv"
dotenv.config()

async function createConnection() {
    try {
        const client = new MongoClient(process.env.Url)
        await client.connect()
        console.log("mongo connected")
        return client
    }
    catch (err) {
        console.log(err)
    }
}

export const client=await createConnection()