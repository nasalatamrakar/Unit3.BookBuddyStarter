import { useState, useEffect } from "react"
import { Link, useLocation, Route, Routes } from "react-router-dom"
import axios from "axios"
import Books from "./components/Books"
import SingleBook from "./components/SingleBook"
import Navigations from "./components/Navigations"
import Register from "./components/Register"
import Login from "./components/Login"
import Account from "./components/Account"






function App() {
 const [token, setToken] = useState(null)
 const [books, setBooks] = useState([])
 const [user, setUser] = useState({})
 const [error, setError] = useState("")
 const [checkOut, setCheckOut] = useState([])


 useEffect (() => {
   const fetchBooks = async () => {
     try {
       const {data} = await axios.get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
       //console.log(data)
       setBooks(data)
     } catch (error) {
       console.error(error)
     }
   }


   fetchBooks()
 }, [])


 useEffect(() => {
   const attemptLogin = async() => {
     const loggedInToken = window.localStorage.getItem('token')
    


     if(loggedInToken){
       const response = await axios.get('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me', {
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${loggedInToken}`
         }
       })


       setUser(response.data)
     }else{
      
       throw 'no token'
     }


   }
 
   attemptLogin()
  
 },[token])


 const CheckoutBook = async (book) => {
   const response = await axios.patch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${book.id}`, {available: false}, {
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
         }
       })
   console.log(response)
   setCheckOut([...checkedBooks,response.data.book])
 
 }
  useEffect (() => {
   const reservations = async () => {
     const loggedInToken = window.localStorage.getItem('token')
     if(loggedInToken) {
       const response = await axios.get("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", {
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
           }
         })
       setCheckOut(response.data.reservation)
     } else {
        
       throw 'no token'
     }
     }
      reservations();
   },[token])


   const returnBook = async (book) => {
     await axios.delete(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${book.id}`, {
               headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`
               }
             })
     setCheckOut(checkOut.filter((_book) => {return _book.id !== book.id}))
   }


 return (
   <div>
     <h1>Welcome to the Library!</h1>
     <Navigations />


     <Routes>
       <Route path = "/" element = {<Books books = {books} setBooks = {setBooks}/>}/>
       <Route path = "/books" element = {<Books books = {books} setBooks = {setBooks}/>}/>
       <Route path = "/books/:id" element = {<SingleBook books = {books} setBooks = {setBooks}/>}/>
       <Route path="/users/register" element={<Register  />} />
       <Route path = "/account/login" element = {<Login setUser={setUser} setToken={setToken}/>} />
       <Route path='/account/me' element={<Account user={user} setUser={setUser} setToken={setToken} checkOut={checkOut} returnBook={returnBook}/>}/>
     </Routes>








   </div>
  
 )
}


export default App
