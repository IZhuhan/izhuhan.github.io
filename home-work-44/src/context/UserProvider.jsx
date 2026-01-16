import {createContext, useState} from "react";

export const UserContext = createContext(null);
UserContext.displayName = "UserContext";

const UserProvider = ({children}) => {
  const [userList, setUserList] = useState([
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      isShown: false
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      isShown: false
    },
    {
      id: 3,
      name: "Clementine Bauch",
      username: "Samantha",
      email: "Nathan@yesenia.net",
      isShown: false
    }
  ]);

  return (
    <UserContext.Provider value={{userList, setUserList}}>
      {children}
    </UserContext.Provider>
  )
}
export default UserProvider
