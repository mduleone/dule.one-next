import { useEffect, useState } from 'react';
import useRouteChange from '../../hooks/use-route-change';
import track from '../../util/track';

import Google from './google';

const Analytics = ({ children }) => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  const [renderAnalytics,  setRenderAnalytics] = useState(false);
  useRouteChange(() => {
    track('page');
  });

  useEffect(() => {
    const allowAnalytics = window.localStorage.getItem('allowAnalytics');
    
    if (!allowAnalytics) {
      window.localStorage.setItem('allowAnalytics', 'true');
      setRenderAnalytics(true);
      // @todo: add a cookie banner
      return;
    }
    
    if (allowAnalytics === 'true') {
      setRenderAnalytics(true);
    }
  }, []);

  return renderAnalytics && (
    <>
      <Google />
    </>
  );
};

export default Analytics;
