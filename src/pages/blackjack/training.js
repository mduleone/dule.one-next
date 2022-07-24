import styled from 'styled-components';

import Layout from '~/components/layout';
import { rem } from '~/util/style/lengths';
import { DECK } from '~/util/playing-cards';
import { round } from '~/util/number';
import useBlackjackTraining from '~/hooks/use-blackjack-training';
import FloatingButtons from '~/components/blackjack-training/floating-buttons';
import ShowCount from '~/components/blackjack-training/show-count';
import PlayPractice from '~/components/blackjack-training/play-practice';
import CountingPractice from '~/components/blackjack-training/counting-practice';
import SplashScreen from '~/components/blackjack-training/splash-screen';

const Training = () => {
  const {
    streak,
    shoe,
    showShoe,
    doublesOnly,
    softOnly,
    dealerHitSoft17,
    trainCount,
  } = useBlackjackTraining();

  return (
    <Layout header={false}>
      <Relative>
        <Info $forceRight={trainCount}>
          {!trainCount && (
            <div>
              Streak: {streak}
              <div>
                <DealerButton>D</DealerButton> soft 17:{' '}
                {dealerHitSoft17 ? 'hit' : 'stand'}
              </div>
            </div>
          )}
          <RightAlign>
            <ShowCount />
            {!(doublesOnly || softOnly) && showShoe && (
              <ShoeCount>
                Shoe: {shoe.length}{' '}
                <InlineBlock>
                  ({round(shoe.length / DECK.length, 0, 2)} decks)
                </InlineBlock>
              </ShoeCount>
            )}
          </RightAlign>
        </Info>
        {trainCount ? <CountingPractice /> : <PlayPractice />}
        <SplashScreen />
      </Relative>
      <FloatingButtons />
    </Layout>
  );
};

export default Training;

const Relative = styled.div`
  position: relative;
`;

const Info = styled.div`
  display: flex;
  justify-content: ${({ $forceRight }) =>
    $forceRight ? 'flex-end' : 'space-between'};
  margin-bottom: ${rem(8)};
`;

const DealerButton = styled.span`
  display: inline-flex;
  padding: ${rem(2)} ${rem(4)};
  border-radius: 100%;
  border: ${({ theme }) => theme.colors.black} ${rem(2)} solid;
  font-weight: bold;
  line-height: 1;
  align-items: center;
  justify-content: center;

  @media (prefers-color-scheme: dark) {
    border-color: ${({ theme }) => theme.colors.white};
  }
`;

const RightAlign = styled.div`
  text-align: right;
  min-height: ${rem(52)};
`;

const ShoeCount = styled.div`
  margin-top: ${rem(2)};
`;

const InlineBlock = styled.span`
  display: inline-block;
`;
