import styled from 'styled-components';

import useBlackjackTraining from '~/hooks/use-blackjack-training';
import PlayingCard from '~/components/playing-card';
import WrongAction from '~/components/blackjack-training/wrong-action';
import ActionButtons from '~/components/blackjack-training/action-buttons';
import { rem } from '~/util/style/lengths';
import { getHandKey, getDealerKey } from '~/util/blackjack';

const PlayPractice = () => {
  const {
    streak,
    count,
    playerHand,
    dealerCard,
    correctAction,
    wrongAction,
    dealerHitSoft17,
    resetCountOnLoss,
    playerAction,
    lastWrongAction,
    clearWrongAction,
    setShowLastWrongAction,
    showLastWrongAction,
  } = useBlackjackTraining();

  return (
    playerHand &&
    dealerCard && (
      <>
        <HandContainer>
          <HandLabel>Dealer Shows</HandLabel>
          <Hand>
            <CardContainer>
              <PlayingCard card={dealerCard} />
            </CardContainer>
          </Hand>
          <HandLabel>Player Hand</HandLabel>
          <Hand>
            {playerHand.map((card, idx) => (
              <CardContainer key={`card-${idx ? 'second' : 'first'}`}>
                <PlayingCard card={card} />
              </CardContainer>
            ))}
          </Hand>
          {wrongAction && (
            <WrongAction
              dealerHitSoft17={dealerHitSoft17}
              clearWrongAction={clearWrongAction}
              streak={streak}
              dealerCard={dealerCard}
              playerHand={playerHand}
              playerAction={playerAction}
              correctAction={correctAction}
              resetCountOnLoss={resetCountOnLoss}
              count={count}
              playerHandKey={getHandKey(playerHand)}
              dealerCardKey={getDealerKey(dealerCard)}
            />
          )}
          {showLastWrongAction && (
            <WrongAction
              lastWrongAction
              dealerHitSoft17={lastWrongAction.dealerHitSoft17}
              clearWrongAction={() => setShowLastWrongAction(false)}
              streak={lastWrongAction.streak}
              dealerCard={lastWrongAction.dealerCard}
              playerHand={lastWrongAction.playerHand}
              playerAction={lastWrongAction.playerAction}
              correctAction={lastWrongAction.correctAction}
              count={lastWrongAction.count}
              playerHandKey={lastWrongAction.playerHandKey}
              dealerCardKey={lastWrongAction.dealerCardKey}
            />
          )}
        </HandContainer>
        <ActionButtons />
      </>
    )
  );
};

PlayPractice.propTypes = {};

export default PlayPractice;

const HandContainer = styled.div`
  position: relative;
`;

const Hand = styled.div`
  display: flex;
  justify-content: center;
`;

const HandLabel = styled.div`
  text-align: center;
`;

const CardContainer = styled.div`
  width: ${rem(125)};
  display: inline-block;

  & + & {
    margin-left: ${rem(12)};
  }

  @media screen and (min-width: ${rem(768)}) {
    width: ${rem(150)};
  }
`;
