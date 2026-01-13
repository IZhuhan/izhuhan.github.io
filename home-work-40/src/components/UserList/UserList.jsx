import React, {useEffect, useState} from 'react'
import SearchUsers from "../SearchUsers/SearchUsers.jsx";
import UserDetails from "../UserDetails/UserDetails.jsx";

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [searchedUserList, setSearchedUserList] = useState([]);
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(1);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await res.json();
      setUserList(data);
    }

    fetchAllUsers();
  }, []);

  useEffect(() => {
    const getUserById = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const data = await res.json();
      setUser(data);
    }

    getUserById();
  }, [userId])

  const handleUserIdChange = (event) => setUserId(event.target.value);

  const handleSearch = (value) => {
    if (!value) {
      setSearchedUserList([]);
      return;
    }

    const searchedUsers = userList.filter(user => user.name.toLowerCase().includes(value.toLowerCase()));
    setSearchedUserList(searchedUsers);
  };

  return (
    <div className="users">
      <div className="box">
        <h2>UserList:</h2>

        <ul>
          {userList.map(user => {
            return <li key={user.id}>{user.name}</li>
          })}
        </ul>
      </div>

      <UserDetails
        userId={userId}
        user={user}
        onSearchSingleUser={handleUserIdChange}
      />

      <SearchUsers
        searchedUserList={searchedUserList}
        onSearchUsers={handleSearch}
      />
    </div>
  )
}
export default UserList
