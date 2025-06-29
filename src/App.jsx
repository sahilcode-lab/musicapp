import { Suspense, lazy, useState, useEffect } from 'react';

const MusicLibrary = lazy(() => import('music_library/MusicLibrary'));

function App() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    if (savedRole) setRole(savedRole);
  }, []);

  const login = (selectedRole) => {
    localStorage.setItem('role', selectedRole);
    setRole(selectedRole);
  };

  const logout = () => {
    localStorage.removeItem('role');
    setRole('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Main App</h1>

      {role ? (
        <div>
          <p>Logged in as: <strong>{role}</strong></p>
          <button onClick={logout}>Logout</button>

          <Suspense fallback={<div>Loading...</div>}>
            <MusicLibrary role={role} />
          </Suspense>
        </div>
      ) : (
        <div>
          <p>Select a role to log in:</p>
          <button onClick={() => login('admin')}>Login as Admin</button>{' '}
          <button onClick={() => login('user')}>Login as User</button>
        </div>
      )}
    </div>
  );
}

export default App;
