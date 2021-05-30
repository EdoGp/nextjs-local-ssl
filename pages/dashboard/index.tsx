import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../adapters/profile';
import { getAccessTokenFromCookie } from '../../helpers/cookies';
import { authLogout } from '../../redux';

export const DashboardPage = ({ accessToken }) => {
  const [profile, setProfile] = useState({});
  const router = useRouter();
  const dispatch = useDispatch();
  const authState = useSelector((state) => {
    return state.authStore;
  });

  useEffect(() => {
    if (!authState.isLoggedIn) {
      router.push('/auth/login');
    }
  }, [authState]);

  const getProfileData = async () => {
    const profileResponse = await getProfile({ token: accessToken });
    setProfile(profileResponse.data.data);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const logOut = () => {
    console.log('test');
    dispatch(authLogout());
  };

  return (
    <div>
      <h2>User Profile</h2>
      <button onClick={logOut}>Log Out</button>
      <pre>
        <code>{JSON.stringify(profile, null, 2)}</code>
      </pre>
    </div>
  );
};

export const getServerSideProps = async ({ req }) => {
  const accessToken = getAccessTokenFromCookie(req);

  return {
    props: {
      accessToken,
    },
  };
};

export default DashboardPage;
