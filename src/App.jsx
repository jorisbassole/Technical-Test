
import React, { useState } from 'react';

import UserAverage from './components/UserAverage';
import UserList from './components/UserList';

function App() {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleUserChange = (newSelectedUsers) => {
    setSelectedUsers(newSelectedUsers);
  };

  
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-4xl my-10 text-black'>AVERAGE AGE CALCULATOR</h1>

      <div className='flex flex-row justify-center items-center'>
        <div>
          <UserList onSelectionChange={handleUserChange} />
        </div>

        <div className='mx-20'>
          <UserAverage selectedUsers={selectedUsers} />
        </div>
      </div>
    </div>
  );
}

export default App;
