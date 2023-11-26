
import React, { useEffect, useState } from 'react';
import cake from '../assets/cake.svg'

function UserAverage({ selectedUsers }) {
  const [averageAge, setAverageAge] = useState(null);
  const [error, setError] = useState(null);

  const apiUrl = `https://infallible-tereshkova-717266.netlify.app/.netlify/functions/server/average?ids=${selectedUsers.join(',')}`;

  useEffect(() => {
    if (selectedUsers.includes('100')) {
      setError("Jecho Thompson n'a pas d'année de naissance.");
      setAverageAge(null);
    } else if (selectedUsers.length > 0) {
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            const currentYear = new Date().getFullYear();
            const birthYear = Math.round(data.average);
            const age = currentYear - birthYear;
            setAverageAge(age + " ans");
            setError(null);
          }
        })
        .catch(error => setError('Erreur: ' + error.message));
    } else {
      setAverageAge(null);
      setError(null);
    }
  }, [selectedUsers, apiUrl]);

  return (
    <div>
      <img src={cake} alt='cake' className=' w-28 h-28 my-2 mx-auto' />
      <h2 className='text-center text-black'>Âge moyen des utilisateurs sélectionnés</h2>
      {averageAge !== null && <p className='text-black font-extrabold mx-28'>{averageAge}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default UserAverage;
