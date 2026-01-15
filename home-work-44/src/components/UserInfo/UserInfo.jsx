import {useContext} from "react";
import {UserContext} from "../../context/UserProvider.jsx";

const UserInfo = ({userId}) => {
  const {userList} = useContext(UserContext);
  const user = userList.filter(user => user.id === userId )[0];

  return (
    <ul>
      <li>UserName: {user.username}</li>
      <li>Email: {user.email}</li>
    </ul>
  )
}
export default UserInfo
