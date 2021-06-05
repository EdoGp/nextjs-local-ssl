import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../../redux';

export const DashboardPage = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state: RootStateOrAny) => {
    return state.authStore;
  });

  useEffect(() => {
    if (!authState.isLoggedIn) {
      router.push('/auth/login');
    }
  }, [authState]);

  const logOut = (): void => {
    dispatch(authLogout());
  };

  return (
    <div>
      <h2>User Profile</h2>
      <button onClick={logOut}>Log Out</button>
      <Link href="/">Home</Link>
    </div>
  );
};

export default DashboardPage;
