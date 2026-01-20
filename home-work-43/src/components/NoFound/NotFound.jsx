import React from 'react'
import {Link} from "react-router";

const NotFound = () => {
  return (
    <div>
      <h1>Page not found</h1>
      <Link to={'/'}>Go to home page</Link>
    </div>
  )
}
export default NotFound
