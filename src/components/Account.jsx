/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import { useNavigate } from "react-router-dom"


const Account = ({user, setUser, setToken, checkOut, returnBook}) => {
    const navigate = useNavigate()
    
    const logout = () => {
        window.localStorage.removeItem('token');
        setToken(null)
        setUser({})
        navigate('/books')
    }
    if(!user.books){
        return null
    }

    const handleReturn = (book) => {
        returnBook(book)
    }

    return(
        <div>
            <h1>Account</h1>
            <button onClick={() => {logout()}}>Logout</button>
            <hr/>
            <h4>Name {user.name}</h4>
            { checkOut.length > 0 ? 
                <div>
                <h4>Checked Out Books ({checkOut.length}):</h4>
                <ul>
                    {
                        checkOut.map((book) => {
                            return (
                                <div key={book.id}>
                                    <li> {book.title}</li>
                                    <button onClick={()=> {handleReturn(book)}}>Return Book</button>
                                </div>
                                
                            )
                        })
                    }
                </ul>
                </div>
                : 
                null
            }   
           
        </div>
    )
}

export default Account
