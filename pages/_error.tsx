import Router from 'next/router';

export const _error = () => {
  useEffect(() => {
    Router.push('/');
  }, []);

  return <div>Error Page.....</div>;
};

export default _error;
