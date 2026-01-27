import { useEffect } from "react";
import { useUsers } from "../../hooks/useUsers.jsx";

const UserList = () => {
  const { users, loading, error, loadUsers } = useUsers();

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Loading error</p>;

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
};

export default UserList
