import React from 'react';
import useUser from '../../hooks/UseUser';
import User from './User';
import Suggestions from './Suggestions';

const Index = () => {
  // const { x } = useUser();
  // console.log('X', x);
  const {
    user: { fullName, username, userId },
  } = useUser();
  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} />
    </div>
  );
};

export default Index;
