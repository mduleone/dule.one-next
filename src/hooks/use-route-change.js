import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useRouteChange = (callback) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on('routeChangeComplete', callback);

    return () => {
      router.events.off('routeChangeComplete', callback);
    };
  }, [callback]);
};

export default useRouteChange;
