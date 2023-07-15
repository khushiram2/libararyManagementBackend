import express from "express"
import { addNewUSerToLibararyDatabase, bookReturned, deleteUserById, getAllBooks, getAllUsers, getBookById, getBookByName, getHistoryOfIssuedBook, getordersOfAllBooks, insertANewBook, issueABook } from "../Databse/databaseQueries.js"

const router=express.Router()


router.post("/newbook",async (req,res)=>{
    try {
        const {book}=req.body
        await insertANewBook(book)
        res.status(200).send("book added to databse")
    } catch (error) {
        res.status(500).send("some error occured while adding the book")
    }
})


router.post("/newuser", async (req,res)=>{
    try {
        const {user}=req.body
        await addNewUSerToLibararyDatabase(user)
        res.status(200).send("user added to databse")
    } catch (error) {
        res.status(500).send("some error occured while adding the user")
    }
})


router.post("/newissue",async (req,res)=>{
    try {
        const {order}=req.body
        const book=await getBookByName(order.book)
       await issueABook({...order,returned:false,bookId:book._id})
            res.status(200).send("book issued")
    } catch (error) {
        res.status(500).send("some error occured while issuing the book")
    }
})

router.get("/allbooks",async (req,res)=>{
    try {
        const allBooks=await getAllBooks()
        res.status(200).send(allBooks)
    } catch (error) {
        res.status(500).send("some error occured while getting books")
    }

})
router.get("/allusers",async (req,res)=>{
    try {
        const allUsers=await getAllUsers()
        res.status(200).send(allUsers)
    } catch (error) {
        res.status(500).send("some error occured while getting books")
    }

})


router.get("/book/:id",async (req,res)=>{
    try {
        const {id}=req.params
       const book= await getBookById(id)
    
        res.status(200).send(book)
    } catch (error) {
        res.status(500).send("some error occured while getting book")
    }

})
router.get("/order/:id",async (req,res)=>{
    try {
        const {id}=req.params
       const history= await getHistoryOfIssuedBook(id)
        res.status(200).send(history)
    } catch (error) {
        console.log(error)
        res.status(500).send("some error occured while getting history of book")
    }

})

router.get("/allorders/books",async (req,res)=>{
    try {
       const history= await getordersOfAllBooks()
        res.status(200).send(history)
    } catch (error) {
        console.log(error)
        res.status(500).send("some error occured while getting history of book")
    }

})

router.delete("/removeuser/:id",async (req,res)=>{
    try {
        const {id}=req.params
        console.log(id)
      await deleteUserById(id)
        res.status(200).send("user deleted sucessfully")
    } catch (error) {
        console.log(error)
        res.status(500).send("some error occured while getting history of book")
    }

})

router.put("/returned/:id",async (req,res)=>{
    try {
const {id}=req.params
const returned=await bookReturned(id)
if(returned.modifiedCount===1){
    res.status(200).send("Returned Sucessfully")
}
    } catch (error) {
        console.log(error)
        res.status(500).send("some error occured while returing of book")
    }

})



export const libararyRouter=router