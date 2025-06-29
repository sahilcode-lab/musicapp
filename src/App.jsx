import { Suspense, lazy, useState, useEffect } from 'react';

const MusicLibrary = lazy(() => import('music_library/MusicLibrary'));

export default function App() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('mockJWT');
    const storedRole = localStorage.getItem('role');
    if (token && storedRole) {
      setRole(storedRole);
    }
  }, []);

  const login = (selectedRole) => {
    const fakeJWT = `mock-jwt-token-${Date.now()}`;
    localStorage.setItem('mockJWT', fakeJWT);
    localStorage.setItem('role', selectedRole);
    setRole(selectedRole);
  };

  const logout = () => {
    localStorage.removeItem('mockJWT');
    localStorage.removeItem('role');
    setRole('');
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Main App</h1>
      {role ? (
        <>
          <p>You are logged in as: <strong>{role}</strong></p>
          <button onClick={logout}>Logout</button>
          <Suspense fallback={<div>Loading Music Library...</div>}>
            <MusicLibrary role={role} />
          </Suspense>
        </>
      ) : (
        <>
          <p>Select a role to log in:</p>
          <button onClick={() => login('admin')}>Login as Admin</button>{' '}
          <button onClick={() => login('user')}>Login as User</button>
        </>
      )}
    </div>
  );
}
