/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect  } from "react"


const singleBook = ({books, CheckoutBook}) => {
   const params = useParams()
   //console.log(params)
   const id = params.id*1




   const handleCheckout = (book) => {
     checkOut(book);
 }


   const book = books.find((book) => {
       return book.id === id
   })


   console.log(book)
   return(
       <div>
           <h2>Selected book:</h2>


           <section className="book-wrapper">
        
               <div>
                 <img className="singleBook" src={book.coverimage} alt={book.title} />
               </div>
               <div>
                 <h2> Title: {book.title} </h2>
                 <p> Author: {book.author} </p>
                 <p> Description: {book.description} </p>
                 <p> Availability: {book.available === true ? "Yes" : "No"} </p>
               </div>


               {book.available === true ? <button onClick={() => {handleCheckout(book)}}>check out</button> : null}     
           </section>


       </div>
   )
}


export default singleBook