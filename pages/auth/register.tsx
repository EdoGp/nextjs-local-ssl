import Link from 'next/link';
import { SyntheticEvent, useEffect, useState } from 'react';
import { postRegister } from '../../adapters/auth';

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('error', error);
  }, [error]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await postRegister({});
  };

  const handleEmailChange = (e): void => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e): void => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
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
            <div>
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="password"
                id="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>

            <input type="submit" value="Register" className="btn" />
            <p>
              Already have an account?
              <Link href="/auth/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
