import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <div>Not Found</div>
    <Link className='btn btn-success' to="/">Go back to home page</Link>
    </>
  )
}

export default NotFound