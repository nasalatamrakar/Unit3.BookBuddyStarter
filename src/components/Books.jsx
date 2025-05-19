/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { Link } from "react-router-dom"


function Books({books}){
   return(
       <div className = "BooksContainer">
           <h2>Here are all the books:</h2>
           <ul>
               {
    
               books.map((book) => {
                       return(
                           <div key={book.id} className = "booksDisplay">
                               <li key={book.title}>
                                   <img src = {book.coverimage} />
                                   <Link to={`/books/${book.id}`}>{book.title}</Link>
                                
                                   <p>Author: {book.author}</p>
                                  
                           </li>
                           </div>
                       )
                   })
               }
           </ul>
       </div>
   )
}


export default Books