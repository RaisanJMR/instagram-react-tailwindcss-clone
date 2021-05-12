import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../context/User';
import { getUserByUserId } from '../services/firebase';

const UseUser = () => {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);
  useEffect(() => {
    async function getUserObjByUserId() {
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    }
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, []);
  return { user: activeUser };
};

export default UseUser;
