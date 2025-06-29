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
        <div>
          <p>You are logged in as: <strong>{role}</strong></p>
          <button onClick={logout} style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}>
            Logout
          </button>

          <Suspense fallback={<div>Loading Music Library...</div>}>
            <MusicLibrary role={role} />
          </Suspense>
        </div>
      ) : (
        <div>
          <p>Select your role to log in:</p>
          <button onClick={() => login('admin')} style={{ padding: '0.5rem 1rem', margin: '0 1rem' }}>
            Login as Admin
          </button>
          <button onClick={() => login('user')} style={{ padding: '0.5rem 1rem' }}>
            Login as User
          </button>
        </div>
      )}
    </div>
  );
}
