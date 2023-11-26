import React, { useState, useEffect } from 'react';

function UserList({ onSelectionChange }) {
  const [users, setUsers] = useState([]);
  const [checked, setChecked] = useState({});

  const apiUrlusers = 'https://infallible-tereshkova-717266.netlify.app/.netlify/functions/server/users';

  useEffect(() => {
    fetch(apiUrlusers)
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const handleCheck = (event) => {
    const newChecked = { ...checked, [event.target.name]: event.target.checked };
    setChecked(newChecked);

    const selectedUsers = [];
    for (let UserId in newChecked) {
      if (newChecked[UserId]) {
        selectedUsers.push(UserId);
      }
    }

    // Pour le composant parent
    onSelectionChange(selectedUsers);
  };

  return (
    <div style={{ overflow: 'auto', height: '500px', width: '250px' }} className='border-4'>
      <ul className='text-black'>
        {users.map(user => (
          <li key={user.id}>
            <input
              type="checkbox"
              checked={checked[user.id] || false}
              onChange={handleCheck}
              name={user.id.toString()}
              className='mr-2'
            />
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;