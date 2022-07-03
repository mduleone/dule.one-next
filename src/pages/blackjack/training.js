import { useState, useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Layout from '~/components/layout';
import PlayingCard from '~/components/playing-card';
import { rem } from '~/util/style/lengths';
import { newShoe, DECK } from '~/util/playing-cards';
import {
  getHandValue,
  getCountValue,
  getCardValue,
  getCorrectAction,
  HIT,
  STAND,
  DOUBLE,
  SPLIT,
} from '~/util/blackjack';

const Training = () => {
  // @TODO: use local storage to track streak
  const [streak, setStreak] = useState(0);
  const [count, setCount] = useState(0);
  const [shoe, setShoe] = useState(newShoe());
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerCard, setDealerCard] = useState(null);
  const [correctAction, setCorrectAction] = useState('');
  const [showCount, setShowCount] = useState(true);

  const resetHands = () => {
    let tempShoe = [...shoe];

    if (tempShoe.length < DECK.length * 2) {
      tempShoe = newShoe();
    }

    let nextPlayerHand = [];
    do {
      nextPlayerHand = [];
      nextPlayerHand = [tempShoe.shift(), tempShoe.shift()];
    } while (getHandValue(nextPlayerHand).total === 21);

    const nextDealerCard = tempShoe.shift();

    const countChange = [nextDealerCard, ...nextPlayerHand].reduce(
      (sum, card) => sum + getCountValue(getCardValue(card)),
      0,
    );
    setPlayerHand(nextPlayerHand);
    setDealerCard(nextDealerCard);
    setCount((c) => c + countChange);
    setCorrectAction(getCorrectAction(nextPlayerHand, nextDealerCard));
    setShoe(tempShoe);
  };

  useEffect(() => {
    resetHands();
  }, []);

  const act = (action) => {
    if (action === correctAction) {
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
      setCount(0);
      // @TODO: do this better
      // eslint-disable-next-line no-alert
      window.alert(
        `Wrong! Correct play was: ${correctAction}; resetting count`,
      );
    }

    resetHands();
  };

  const resetCount = () => {
    const countChange = [dealerCard, ...playerHand].reduce(
      (sum, card) => sum + getCountValue(getCardValue(card)),
      0,
    );
    setCount(countChange);
    // @TODO: do this better
    // eslint-disable-next-line no-alert
    window.alert(`Resetting count to current hand: ${countChange}`);
  };

  const handValue = getHandValue(playerHand);
  const isPair =
    handValue.hand.length === 2 && handValue.hand[0] === handValue.hand[1];

  return (
    <Layout>
      <Info>
        <div>Streak: {streak}</div>
        {showCount && <div>Count: {count}</div>}
      </Info>
      <HandLabel>Dealer Shows</HandLabel>
      <Hand>
        <CardContainer>
          <PlayingCard card={dealerCard} />
        </CardContainer>
      </Hand>
      <HandLabel>Player Hand</HandLabel>
      <Hand>
        {playerHand.map((card, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <CardContainer key={`card-${idx}`}>
            <PlayingCard card={card} />
          </CardContainer>
        ))}
      </Hand>
      <Buttons>
        <Hit type="button" onClick={() => act(HIT)}>
          Hit
        </Hit>
        <Stand type="button" onClick={() => act(STAND)}>
          Stand
        </Stand>
        <Double type="button" onClick={() => act(DOUBLE)}>
          Double
        </Double>
        <Split disabled={!isPair} type="button" onClick={() => act(SPLIT)}>
          Split
        </Split>
      </Buttons>
      {/* @TODO: put these behind a settings button */}
      <Buttons>
        <Button type="button" onClick={() => setShowCount((p) => !p)}>
          Toggle Count
        </Button>
        <Button type="button" onClick={resetCount}>
          Reset Count
        </Button>
        {/* @TODO: put chart in a modal */}
        <Link href="/blackjack" passHref>
          <Button as="a">Chart</Button>
        </Link>
      </Buttons>
    </Layout>
  );
};

export const getStaticProps = () => ({
  props: {},
});

export default Training;

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

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: ${rem(12)};
`;

const Button = styled.button`
  color: ${({ theme }) => theme.colors.black};
  border-radius: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  font-size: ${rem(16)};
  width: ${rem(75)};
  height: ${rem(75)};
  font-family: ${({ theme }) => theme.fonts.screenFont};
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.softWhite};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  :disabled {
    opacity: 40%;
    cursor: not-allowed;
  }

  @media screen and (min-width: ${rem(768)}) {
    font-size: ${rem(19)};
    width: ${rem(100)};
    height: ${rem(100)};
  }
`;

const Stand = styled(Button)`
  background-color: ${({ theme }) => theme.colors.duleoneRed};
  color: ${({ theme }) => theme.colors.white};
`;

const Hit = styled(Button)`
  background-color: lime;
`;

const Split = styled(Button)`
  background-color: cyan;
`;

const Double = styled(Button)`
  background-color: gold;
`;
