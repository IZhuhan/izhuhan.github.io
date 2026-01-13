import React from 'react'

const SearchUsers = (props) => {
  const {searchedUserList, onSearchUsers} = {...props};

  const debounce = (onChange) => {
    let timeout;

    return (event) => {
      const searchedValue = event.currentTarget.value;
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        onChange(searchedValue);
      }, 1000);
    };
  };

  return (
    <div className="box">
      <h2>Search users by name</h2>

      <input
        type="text"
        placeholder="Search by user name"
        onChange={debounce(onSearchUsers)}
      />

      <ul>
        {searchedUserList.map(user => {
          return <li key={user.id}>{user.name}</li>
        })}
      </ul>
    </div>
  )
}
export default SearchUsers
