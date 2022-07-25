import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import styled from 'styled-components';

import Layout from '~/components/layout';
import { rem } from '~/util/style/lengths';

const Blackjack = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location = 'https://www.trainblackjack.com/blackjack-card';
    }, 3000);
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
  color: ${({ theme }) => theme.colors.duleoneRed};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.inverseDuleoneRed};
  }
`;
