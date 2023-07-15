import { ObjectId } from "mongodb";
import { client } from "./databaseConnection.js";

export async function getAllBooks() {
    return await client.db("library").collection("books").find({}).toArray()
}

export async function getBookById(id) {
    return client.db("library").collection("books").findOne({ _id: new ObjectId(id) })
}
export async function getBookByName(name) {
    return client.db("library").collection("books").findOne({ book:name })
}

export async function insertANewBook(book) {
    return client.db("library").collection("books").insertOne(book)
}
export async function addNewUSerToLibararyDatabase(user){
    return client.db("library").collection("users").insertOne(user)
}

export async function issueABook(userAndBookData) {
 
  return  await client.db("library").collection("orders").insertOne(userAndBookData)
   
}

export async function getAllUsers() {
    return await client.db("library").collection("users").find({}).toArray()
}
export async function deleteUserById(id){
    return await client.db("library").collection("users").deleteOne({_id:new ObjectId(id)}) 
}

export async function getHistoryOfIssuedBook(id){
    return await client.db("library").collection("orders").find({bookId:new ObjectId(id)}).toArray()
}

export async function getordersOfAllBooks(){
    return await client.db("library").collection("orders").find({returned:false}).toArray()
}
export async function bookReturned(id){
    return await client.db("library").collection("orders").updateOne({_id:new ObjectId(id)},{$set:{returned:true}})
}
