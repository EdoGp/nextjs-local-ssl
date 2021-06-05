import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import ApiClient from '../../adapters/api/ApiClient';
import { authLogout } from '../../redux';

type Props = {
  accessToken: string;
};

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

  const testCall = async () => {
    const apiResponse = await ApiClient.getInstance().getRequest(
      'auth/profile',
    );
    console.log({ data: apiResponse.data });
  };

  return (
    <div>
      <h2>User Profile</h2>
      <button onClick={logOut}>Log Out</button>
      <Link href="/">Home</Link>
      <button onClick={testCall}>Test Call</button>
      <pre>{/* <code>{JSON.stringify(profile, null, 2)}</code> */}</pre>
    </div>
  );
};

export default DashboardPage;
