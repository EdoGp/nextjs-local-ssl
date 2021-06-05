import Link from 'next/link';
import { useRouter } from 'next/router';
import { SyntheticEvent, useEffect, useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { authLogin } from '../../redux';

export const LoginPage = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state: RootStateOrAny) => {
    return state.authStore;
  });
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('test');

  useEffect(() => {
    if (authState.isLoggedIn) {
      router.push('/dashboard');
    }
  }, [authState]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(authLogin({ username, password }));
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
              <Link href="/auth/signup">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
