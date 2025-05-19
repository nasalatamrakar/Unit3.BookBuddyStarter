/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import React from "react"
import { Link } from "react-router-dom"


const Navigations = () => {
   return(
       <div>
       <div className="navBar">
         <h4>  <Link to="/books">Catalogue of Books</Link> </h4>
         <h4>  <Link to="/account/login">User Login</Link> </h4>
         <h4>  <Link to="/account/me">My Account</Link> </h4>
         <h4>  <Link to="/users/register">Account Registration</Link> </h4>
       </div>
       </div>
   )
}


export default Navigations