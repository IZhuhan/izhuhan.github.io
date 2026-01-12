import React from 'react'

const UserDetails = (props) => {
  const {userId, user, onSearchSingleUser} = {...props};

  return (
    <div className="box">
      <h2>User details</h2>
      <input
        type="number"
        placeholder="Enter user id"
        value={userId}
        onChange={onSearchSingleUser}
      />

      <h3>User info:</h3>
      {user.name &&
        <div>
          <p>{user.name}</p>
          <p><a href={"tel:" + user.phone}>Phone: {user.phone}</a></p>
          <p><a href={"mailto:" + user.email}>Email: {user.email}</a></p>
        </div>
      }
    </div>
  )
}
export default UserDetails
