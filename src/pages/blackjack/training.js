import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import styled from 'styled-components';

import Layout from '~/components/layout';
import { getItem } from '~/util/local-storage';
import { rem } from '~/util/style/lengths';

const Blackjack = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const possibleStreak = getItem('bjt-streak');
      const possibleStatData = getItem('bjt-stat-data');
      const possibleSettings = getItem('bjt-settings');
      const toEncode = JSON.stringify({
        streak: possibleStreak,
        statData: possibleStatData,
        settings: possibleSettings,
      });
      const isCount =
        window.location.search.includes('?count') ||
        window.location.search.includes('&count');

      window.location = `https://www.trainblackjack.com/?${
        isCount ? 'count&' : ''
      }transfer=${window.btoa(toEncode)}`;
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Layout>
      <Container>
        <div>This project moved to a new location. Redirecting...</div>
        <FontAwesomeIcon pulse icon={['fas', 'spinner']} size="3x" />
      </Container>
    </Layout>
  );
};

export default Blackjack;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${rem(16)};
  color: ${({ theme }) => theme.colors.black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.softWhite};
  }
`;
