import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import blackjackData from '~/data/blackjack';
import Layout from '~/components/layout';
import PlayingCard from '~/components/playing-card';
import { rem } from '~/util/style/lengths';
import { newShoe, DECK, randomSuit, randomTen } from '~/util/playing-cards';
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
import { getItem, setItem } from '~/util/local-storage';
import Modal from '~/components/modal';
import BlackjackTable, {
  handProps,
  computeActionColor,
} from '~/components/blackjack-table';
import Tooltip from '~/components/tooltip';
import Toggle from '~/components/toggle';

const entryKeySort = ([a], [b]) => {
  const parsedIntA = parseInt(a, 10);
  const parsedIntB = parseInt(b, 10);
  if (!Number.isNaN(parsedIntA) && !Number.isNaN(parsedIntB)) {
    return parsedIntB - parsedIntA;
  }

  if (b > a) {
    return 1;
  }
  if (b < a) {
    return -1;
  }
  return 0;
};

const Training = ({ hands, headers }) => {
  const [streak, setStreak] = useState(0);
  const [statData, setStatData] = useState({
    longestStreak: 0,
    streaks: 0,
    streakTotals: 0,
  });
  const [initiallyLoaded, setInitiallyLoaded] = useState(false);
  const [count, setCount] = useState(0);
  const [shoe, setShoe] = useState(newShoe());
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerCard, setDealerCard] = useState(null);
  const [correctAction, setCorrectAction] = useState('');
  const [showCount, setShowCount] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [wrongAction, setWrongAction] = useState(false);
  const [doublesOnly, setDoublesOnly] = useState(false);
  const [softOnly, setSoftOnly] = useState(false);
  const [resetCountOnLoss, setResetCountOnLoss] = useState(true);
  const [forceReset, setForceReset] = useState(false);
  const [playerAction, setPlayerAction] = useState('');
  const settingsButton = useRef(null);

  const resetHands = () => {
    let tempShoe = [...shoe];

    if (tempShoe.length < DECK.length * 2) {
      tempShoe = newShoe();
    }

    let nextPlayerHand = [];
    do {
      if (doublesOnly) {
        const nextCard = tempShoe.shift();
        let [nextRank] = nextCard.split('');
        if (['T', 'J', 'Q', 'K'].includes(nextRank)) {
          nextRank = randomTen();
        }
        nextPlayerHand = [nextCard, `${nextRank}${randomSuit()}`];
      } else if (softOnly) {
        nextPlayerHand = [`A${randomSuit()}`, tempShoe.shift()];
      } else {
        nextPlayerHand = [tempShoe.shift(), tempShoe.shift()];
      }
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

    if (!initiallyLoaded) {
      const possibleStreak = getItem('bjt-streak');
      const possibleStatData = getItem('bjt-stat-data');

      if (typeof possibleStreak === 'number') {
        setStreak(possibleStreak);
      }
      if (possibleStatData) {
        setStatData(possibleStatData);
      }

      setInitiallyLoaded(true);
    }
  }, [forceReset]);

  useEffect(() => {
    if (showSettings) {
      const onClickOutside = (e) => {
        if (!settingsButton.current.contains(e.target)) {
          e.stopPropagation();
          e.preventDefault();
          setShowSettings(false);
        }
      };

      window.addEventListener('click', onClickOutside);

      return () => window.removeEventListener('click', onClickOutside);
    }

    return () => {};
  }, [showSettings, settingsButton.current]);

  const act = (action) => {
    if (action === correctAction) {
      setStreak((s) => {
        const nextStreak = s + 1;
        setItem('bjt-streak', nextStreak);
        if (nextStreak > statData.longestStreak) {
          setStatData({ ...statData, longestStreak: nextStreak });
          setItem('bjt-stat-data', { ...statData, longestStreak: nextStreak });
        }

        return nextStreak;
      });
      resetHands();
      return;
    }

    setPlayerAction(action);
    setWrongAction(true);
  };

  const clearWrongAction = () => {
    setWrongAction(false);
    setStreak(0);

    const nextLongestStreak =
      streak > statData.longestStreak ? streak : statData.longestStreak;
    const nextStreakData = {
      ...statData,
      longestStreak: nextLongestStreak,
      streaks: statData.streaks + 1,
      streakTotals: statData.streakTotals + streak,
    };
    setItem('bjt-stat-data', nextStreakData);
    setItem('bjt-streak', 0);
    setStatData(nextStreakData);
    if (resetCountOnLoss) {
      setCount(0);
    }
    resetHands();
  };

  const toggleDoublesOnly = () => {
    const nextDoubleOnly = !doublesOnly;
    setDoublesOnly(nextDoubleOnly);
    if (nextDoubleOnly) {
      setSoftOnly(false);
    }
    if (nextDoubleOnly) {
      setForceReset((p) => !p);
    }
  };

  const toggleSoftOnly = () => {
    const nextSoftOnly = !softOnly;
    setSoftOnly(nextSoftOnly);
    if (nextSoftOnly) {
      setDoublesOnly(false);
    }
    if (nextSoftOnly) {
      setForceReset((p) => !p);
    }
  };

  const handValue = getHandValue(playerHand);
  const isPair =
    handValue.hand.length === 2 && handValue.hand[0] === handValue.hand[1];

  return (
    <Layout>
      <HandContainer>
        {initiallyLoaded && (
          <>
            <Info>
              <div>Streak: {streak}</div>
              {showCount && <div>Running Count: {count}</div>}
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
          </>
        )}
        {wrongAction && (
          <>
            <TransparentScreenOverlay
              role="button"
              onClick={clearWrongAction}
            />
            <WrongAction>
              <WrongTitle>Not the play</WrongTitle>
              {streak > 0 && (
                <WrongContent>You had a {streak}-hand long streak</WrongContent>
              )}
              <WrongContent>
                Dealer showed{' '}
                {[dealerCard]
                  .map(getCardValue)
                  .map((c) => (c === 11 ? 'A' : c))
                  .join()}
              </WrongContent>
              <WrongContent>
                Your hand was{' '}
                {playerHand
                  .map(getCardValue)
                  .map((c) => (c === 11 ? 'A' : c))
                  .join('-')}
              </WrongContent>
              <WrongContent>
                You played{' '}
                <Action $action={playerAction}>{playerAction}</Action>
              </WrongContent>
              <WrongContent>
                The correct play was{' '}
                <Action $action={correctAction}>{correctAction}</Action>
              </WrongContent>
              {resetCountOnLoss && (
                <>
                  <WrongContent>The count was {count}</WrongContent>
                  <WrongContent>Resetting the count to 0</WrongContent>
                </>
              )}
              <SettingsButton type="button" onClick={clearWrongAction}>
                Got it
              </SettingsButton>
            </WrongAction>
          </>
        )}
      </HandContainer>
      {initiallyLoaded && (
        <Actions>
          <Hit
            disabled={showSettings || wrongAction}
            type="button"
            onClick={() => act(HIT)}
          >
            Hit
          </Hit>
          <Stand
            disabled={showSettings || wrongAction}
            type="button"
            onClick={() => act(STAND)}
          >
            Stand
          </Stand>
          <Double
            disabled={showSettings || wrongAction}
            type="button"
            onClick={() => act(DOUBLE)}
          >
            Double
          </Double>
          <Split
            disabled={showSettings || !isPair || wrongAction}
            type="button"
            onClick={() => act(SPLIT)}
          >
            Split
          </Split>
        </Actions>
      )}
      <SettingsButtonsContainer>
        <FloatingButtonContainer>
          <FloatingButton onClick={() => setShowStats((p) => !p)} type="button">
            <Icon icon={['fas', 'chart-bar']} />
          </FloatingButton>
        </FloatingButtonContainer>
        <FloatingButtonContainer>
          <FloatingButton onClick={() => setShowChart((p) => !p)} type="button">
            <Icon icon={['fas', 'table']} />
          </FloatingButton>
        </FloatingButtonContainer>
        <FloatingButtonContainer ref={settingsButton}>
          <Tooltip show={showSettings}>
            <SettingsTitle>Settings</SettingsTitle>
            <SettingsRow>
              <div>Doubles only?</div>
              <Toggle
                cbId="doubles-only"
                isOn={doublesOnly}
                onClick={toggleDoublesOnly}
              />
            </SettingsRow>
            <SettingsRow>
              <div>Soft only?</div>
              <Toggle
                cbId="soft-only"
                isOn={softOnly}
                onClick={toggleSoftOnly}
              />
            </SettingsRow>
            <SettingsRow>
              <div>Reset count on loss?</div>
              <Toggle
                cbId="reset-count"
                isOn={resetCountOnLoss}
                onClick={() => setResetCountOnLoss((p) => !p)}
              />
            </SettingsRow>
            <SettingsRow>
              <div>Show count?</div>
              <Toggle
                cbId="show-count"
                isOn={showCount}
                onClick={() => setShowCount((p) => !p)}
              />
            </SettingsRow>
            <SettingsButton type="button" onClick={() => setCount(0)}>
              Reset Count
            </SettingsButton>
            <SettingsButton type="button" onClick={() => setStreak(0)}>
              Reset Streak
            </SettingsButton>
          </Tooltip>
          <FloatingButton
            onClick={() => setShowSettings((p) => !p)}
            type="button"
          >
            <Icon icon={['fas', 'cog']} />
          </FloatingButton>
        </FloatingButtonContainer>
      </SettingsButtonsContainer>
      <Modal isOpen={showStats} onClose={() => setShowStats(false)}>
        <ChartTitle>Statistics</ChartTitle>
        <SettingsRow>
          <div>Longest Streak</div>
          <div>{statData.longestStreak || 0}</div>
        </SettingsRow>
        <SettingsRow>
          <div>Average Streak</div>
          <div>
            {statData.streaks > 0
              ? statData.streakTotals / statData.streaks
              : '--'}
          </div>
        </SettingsRow>
        <SettingsRow>
          <div>Streaks lost</div>
          <div>{statData.streaks}</div>
        </SettingsRow>
      </Modal>
      <Modal isOpen={showChart} onClose={() => setShowChart(false)}>
        <ChartTitle>Basic Strategy</ChartTitle>
        <BlackjackTable hands={hands} headers={headers} />
      </Modal>
    </Layout>
  );
};

Training.propTypes = {
  hands: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, handProps])),
  ),
  headers: PropTypes.arrayOf(PropTypes.string),
};

export const getStaticProps = () => {
  const hands = [
    ...Object.entries(blackjackData.pairs)
      .sort(entryKeySort)
      .map(([key, hand]) => [`${key} ${key}`, hand]),
    ...Object.entries(blackjackData.hard).sort(entryKeySort),
    ...Object.entries(blackjackData.soft).sort(entryKeySort),
  ];
  const headers = Object.entries(hands[0][1])
    .filter(([key]) => key !== 'key')
    .sort(entryKeySort)
    .map(([el]) => el);

  return {
    props: {
      hands,
      headers,
    },
  };
};
export default Training;

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

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WrongAction = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: ${rem(6)};
  border: ${rem(1)} solid ${({ theme }) => theme.colors.softBlack};
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${rem(16)};
  display: flex;
  flex-direction: column;
  z-index: 901;

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.softBlack};
    border-color: ${({ theme }) => theme.colors.softWhite};
  }
`;

const WrongTitle = styled.h1`
  color: ${({ theme }) => theme.colors.duleoneRed};
  text-align: center;
`;

const Action = styled.span`
  background-color: ${({ theme, $action }) =>
    computeActionColor($action, theme.colors)};
  color: ${({ theme, $action }) =>
    $action === 'stand' ? theme.colors.white : theme.colors.black};
  padding: ${rem(3)};
  border-radius: ${rem(3)};
`;

const WrongContent = styled.div`
  line-height: 1.5;

  :last-of-type {
    flex: 1 1 auto;
  }
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: ${rem(4)};
  margin-top: ${rem(12)};
  width: 100%;
`;

const ActionButton = styled.button`
  border-radius: ${rem(6)};
  cursor: pointer;
  outline: none;
  border: none;
  font-size: ${rem(16)};
  width: 100%;
  height: ${rem(75)};
  font-family: ${({ theme }) => theme.fonts.screenFont};
  font-weight: bold;
  text-align: center;

  :disabled {
    opacity: 40%;
    cursor: not-allowed;
  }

  @media screen and (min-width: ${rem(768)}) {
    font-size: ${rem(19)};
    height: ${rem(100)};
  }
`;

const Stand = styled(ActionButton)`
  background-color: ${({ theme }) => theme.colors.duleoneRed};
  color: ${({ theme }) => theme.colors.white};
`;

const Hit = styled(ActionButton)`
  background-color: lime;
  color: ${({ theme }) => theme.colors.black};
`;

const Split = styled(ActionButton)`
  background-color: cyan;
  color: ${({ theme }) => theme.colors.black};
`;

const Double = styled(ActionButton)`
  background-color: gold;
  color: ${({ theme }) => theme.colors.black};
`;

const SettingsButtonsContainer = styled.div`
  position: fixed;
  right: ${rem(19)};
  bottom: ${rem(19 + 23.75)};
  z-index: 900;

  @media only screen and (min-width: ${rem(966)}) {
    transform: translateX(
      calc(-50% + (${rem(768)} / 2) + ${rem(19 * 2)} + ${rem(83)})
    );
    right: 50%;
  }

  @media only print {
    display: none;
  }
`;

const FloatingButtonContainer = styled.span`
  display: inline-block;

  & + & {
    margin-left: ${rem(8)};
  }
`;

const FloatingButton = styled.button`
  appearance: button;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-appearance: button;
  border-color: ${({ theme }) => theme.colors.shadowColor};
  border-width: ${rem(1)};
  border-radius: ${rem(6)};
  background-color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  cursor: pointer;
  max-width: ${rem(100)};
  padding: ${rem(8)};

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.softBlack};
    color: ${({ theme }) => theme.colors.softWhite};
    border-color: ${({ theme }) => theme.colors.inverseShadowColor};
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.duleoneRed};
  display: inline;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.inverseDuleoneRed};
  }
`;

const ChartTitle = styled.h1`
  font-size: ${rem(24)};
  font-family: ${({ theme }) => theme.fonts.screenFont};
  text-align: center;
`;

const TransparentScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 900;
`;

const SettingsTitle = styled.h1`
  margin-top: 0;
  font-size: ${rem(20)};
  font-family: ${({ theme }) => theme.fonts.screenFont};
  text-align: center;
`;

const SettingsButton = styled.button`
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  font-size: ${rem(16)};
  font-family: ${({ theme }) => theme.fonts.screenFont};
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.softWhite};
  border-radius: ${rem(3)};
  display: block;
  text-align: center;
  width: 100%;

  & + & {
    margin-top: ${rem(8)};
  }

  :disabled {
    opacity: 40%;
    cursor: not-allowed;
  }

  @media screen and (min-width: ${rem(768)}) {
    font-size: ${rem(19)};
  }
`;

const SettingsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${rem(4)};
  text-align: left;
`;
