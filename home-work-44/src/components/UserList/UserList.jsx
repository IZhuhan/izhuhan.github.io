import {useContext, useState} from "react";
import {UserContext} from "../../context/UserProvider.jsx";
import UserInfo from "../UserInfo/UserInfo.jsx";

const UserList = () => {
  const {userList, setUserList} = useContext(UserContext);

  const handleToggle = (id) => {
    const updatedUserList = userList.map(user => {
      if (user.id === id) {
        return {
          ...user,
          isShown: !user.isShown
        }
      }
      return user;
    })

    setUserList(updatedUserList);
  }

  return (
    <ul>
      {userList.map(user => {
        return <li
          key={user.id}
          onClick={() => handleToggle(user.id)}
          className="user">
            <p>{user.name}</p>
            {user.isShown && <UserInfo userId={user.id}/>}
        </li>
      })}
    </ul>
  )
}
export default UserList
