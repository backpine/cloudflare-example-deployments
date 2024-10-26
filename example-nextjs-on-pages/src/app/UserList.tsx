'use client';

import { useState } from 'react';

export default function UserList({ initialUsers }: { initialUsers: { name: string | null }[] }) {
  const [users, setUsers] = useState<{ name: string | null }[]>(initialUsers);
  const [user, setUser] = useState<any>(null);

  const hanldClick = () => {
    // hit the /api/add-user endpoint with the user name and override the users state with the data
    fetch('/api/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: user }),
    })
      .then((response) => response.json())
      .then((data) => {
        // dirty non-type-safe way to update the state
        // obviously you'd do this differently in a real app
        setUsers(data as { name: string }[]);
      });
      setUser(null);
  };


  return (
    <>
        <div className="h-64 overflow-y-auto">
        {users.map((user, index) => (
            <div key={index} className="bg-zinc-800 mb-2 p-4 rounded-lg border-2 border-zinc-700">
            <p>{user.name}</p>
            </div>
        ))}
        </div>
        <input className='bg-zinc-800 p-2 rounded-lg border-2 border-zinc-700' 
        onChange={(e) => setUser(e.target.value)} placeholder='Enter a name' />
        <button className='bg-zinc-800 p-2 rounded-lg border-2 border-zinc-700' 
        onClick={hanldClick}>Add User</button>

    </>
  );
}