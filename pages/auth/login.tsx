import Link from 'next/link';
import { useRouter } from 'next/router';
import { SyntheticEvent, useState } from 'react';
import { postInternalLogin } from '../../adapters/auth';

export const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('test');
  const [error, setError] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await postInternalLogin({ username, password });
      router.push('/dashboard');
      // set response to context / redux
      // redirect on success with redux
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleEmailChange = (e): void => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e): void => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div>
        <h1>Log in</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type="text"
                id="email"
                value={username}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <input type="submit" value="Login" className="btn" />
            <p>
              Don't have an account?
              <Link href="/auth/register">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
