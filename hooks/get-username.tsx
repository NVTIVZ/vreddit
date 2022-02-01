import { useEffect, useState } from 'react';
import { db } from '../firebase';

export const GetUsername = (id: string | undefined) => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await db.collection('users').doc(id).get();
      const formatData = response.data();
      setUsername(formatData?.name);
    };
    getUser();
  }, [id]);
  return username;
};
