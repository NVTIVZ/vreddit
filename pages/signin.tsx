import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../hooks/use-auth';

const Signin = () => {
  const auth = useAuth();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      Sign in
      <form
        onSubmit={(e) => {
          e.preventDefault();
          auth.signin(user, password);
          console.log(user, password);
        }}
      >
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <Link href="/">Home</Link>
    </div>
  );
};

export default Signin;
