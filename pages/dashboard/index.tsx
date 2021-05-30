import { useEffect, useState } from 'react';
import { getProfile } from '../../adapters/profile';
import { getAccessTokenFromCookie } from '../../helpers/cookies';

export const DashboardPage = ({ accessToken }) => {
  const [profile, setProfile] = useState({});

  const getProfileData = async () => {
    const profileResponse = await getProfile({ token: accessToken });
    setProfile(profileResponse.data.data);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
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
