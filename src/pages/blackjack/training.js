import styled from 'styled-components';

import Layout from '~/components/layout';
import FloatingButtons from '~/components/blackjack-training/floating-buttons';
import GameBoard from '~/components/blackjack-training/game-board';
import Header from '~/components/blackjack-training/header';
import SplashScreen from '~/components/blackjack-training/splash-screen';
import BlackjackTrainingProvider from '~/providers/blackjack-training';

const Training = () => (
  <BlackjackTrainingProvider>
    <Layout header={false}>
      <Relative>
        <Header />
        <GameBoard />
        <SplashScreen />
      </Relative>
      <FloatingButtons />
    </Layout>
  </BlackjackTrainingProvider>
);

export default Training;

const Relative = styled.div`
  position: relative;
`;
