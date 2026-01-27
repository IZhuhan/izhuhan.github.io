import { useState } from "react";
import { getUsers } from "../api/requests";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { users, loading, error, loadUsers };
};
