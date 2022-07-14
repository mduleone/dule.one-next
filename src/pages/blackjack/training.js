import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { hitSoft17, standSoft17 } from '~/data/blackjack';
import Layout from '~/components/layout';
import PlayingCard from '~/components/playing-card';
import WrongAction from '~/components/blackjack-training/wrong-action';
import { rem } from '~/util/style/lengths';
import { newShoe, DECK, randomSuit, randomTen } from '~/util/playing-cards';
import {
  getCardRank,
  getCardValue,
  getCorrectActionHitSoft17,
  getCorrectActionStandSoft17,
  getCountValue,
  getHandValue,
  HIT,
  STAND,
  DOUBLE,
  SPLIT,
  getHandKey,
  getDealerKey,
} from '~/util/blackjack';
import { getItem, setItem } from '~/util/local-storage';
import Modal from '~/components/modal';
import BlackjackTable, {
  computeActionColor,
  entryKeySort,
} from '~/components/blackjack-table';
import Tooltip from '~/components/tooltip';
import Toggle from '~/components/toggle';
import { round } from '~/util/number';
import trackRaw from '~/util/track';

const track = (event, data = {}) =>
  trackRaw(`[Blackjack Training] - ${event}`, data);

const defaultStatData = {
  longestStreak: 0,
  streaks: 0,
  streakTotals: 0,
  doublesOnlyTotals: 0,
  doublesOnlyStreaks: 0,
  softOnlyTotals: 0,
  softOnlyStreaks: 0,
  losses: {},
};

const lossesDefault = {
  stand: 0,
  hit: 0,
  double: 0,
  split: 0,
};

const getLossKey = (playerHand, dealerCard, action) =>
  `${playerHand.map(getCardValue).sort().join(',')}:${getCardValue(
    dealerCard,
  )}:${action}`;

const parseLossKey = (lossKey) => {
  const [playerString, dealerString, action] = lossKey.split(':');
  const playerHand = playerString.split(',').map(getCardRank);
  const dealerCard = getCardRank(dealerString);

  return { playerHand, dealerCard, action };
};

const Training = () => {
  const [streak, setStreak] = useState(0);
  const [statData, setStatData] = useState({
    longestStreak: 0,
    lastStreak: 0,
    streaks: 0,
    streakTotals: 0,
    doublesOnlyTotals: 0,
    doublesOnlyStreaks: 0,
    softOnlyTotals: 0,
    softOnlyStreaks: 0,
    losses: {},
  });
  const [initiallyLoaded, setInitiallyLoaded] = useState(false);
  const [count, setCount] = useState(0);
  const [shoe, setShoe] = useState(newShoe());
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerCard, setDealerCard] = useState(null);
  const [correctAction, setCorrectAction] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showCountTooltip, setShowCountTooltip] = useState(false);
  const [wrongAction, setWrongAction] = useState(false);
  const [showShoe, setShowShoe] = useState(true);
  const [showCount, setShowCount] = useState(true);
  const [doublesOnly, setDoublesOnly] = useState(false);
  const [softOnly, setSoftOnly] = useState(false);
  const [dealerHitSoft17, setDealerHitSoft17] = useState(true);
  const [resetCountOnLoss, setResetCountOnLoss] = useState(true);
  const [forceReset, setForceReset] = useState(false);
  const [playerAction, setPlayerAction] = useState('');
  const [lastWrongAction, setLastWrongAction] = useState(null);
  const [showLastWrongAction, setShowLastWrongAction] = useState(null);
  const settingsButton = useRef(null);
  const countTooltipButton = useRef(null);

  const resetHands = () => {
    let tempShoe = [...shoe];

    if (
      (wrongAction && resetCountOnLoss && !(doublesOnly || softOnly)) ||
      tempShoe.length < DECK.length * 2
    ) {
      tempShoe = newShoe();
      setCount(0);
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
    setShoe(tempShoe);
  };

  useEffect(() => {
    track('page load');
  }, []);

  useEffect(() => {
    resetHands();

    if (!initiallyLoaded) {
      const possibleStreak = getItem('bjt-streak');
      const possibleStatData = getItem('bjt-stat-data');
      const possibleSettings = getItem('bjt-settings');

      if (typeof possibleStreak === 'number') {
        setStreak(possibleStreak);
      }
      if (possibleStatData) {
        setStatData({
          ...defaultStatData,
          ...possibleStatData,
        });
      }
      if (possibleSettings) {
        const {
          showShoe: showShoeSetting,
          showCount: showCountSetting,
          doublesOnly: doublesOnlySetting,
          softOnly: softOnlySetting,
          dealerHitSoft17: dealerHitSoft17Setting,
          resetCountOnLoss: resetCountOnLossSetting,
        } = possibleSettings;
        setShowShoe(showShoeSetting);
        setShowCount(showCountSetting);
        setDoublesOnly(doublesOnlySetting);
        setSoftOnly(softOnlySetting);
        setDealerHitSoft17(dealerHitSoft17Setting);
        setResetCountOnLoss(resetCountOnLossSetting);
      }

      setInitiallyLoaded(true);
    }
  }, [forceReset]);

  useEffect(() => {
    if (playerHand && dealerCard) {
      setCorrectAction(
        (dealerHitSoft17
          ? getCorrectActionHitSoft17
          : getCorrectActionStandSoft17)(playerHand, dealerCard),
      );
    }
  }, [dealerHitSoft17, playerHand, dealerCard]);

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

  useEffect(() => {
    if (showCountTooltip) {
      const onClickOutside = (e) => {
        if (!countTooltipButton.current.contains(e.target)) {
          e.stopPropagation();
          e.preventDefault();
          setShowCountTooltip(false);
        }
      };

      window.addEventListener('click', onClickOutside);

      return () => window.removeEventListener('click', onClickOutside);
    }

    return () => {};
  }, [showCountTooltip, countTooltipButton.current]);

  const act = (action) => {
    track('act', { action, correctAction });
    if (action === correctAction) {
      track('correct action');
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
    track('incorrect action');

    setPlayerAction(action);
    setWrongAction(true);
  };

  const clearWrongAction = () => {
    const lossKey = getLossKey(
      playerHand,
      dealerCard,
      dealerHitSoft17 ? HIT : STAND,
    );

    const nextLongestStreak =
      streak > statData.longestStreak ? streak : statData.longestStreak;
    const nextStatData = {
      ...statData,
      longestStreak: nextLongestStreak,
      lastStreak: streak,
      streaks: statData.streaks + 1,
      streakTotals: statData.streakTotals + streak,
      doublesOnlyTotals:
        (statData.doublesOnlyTotals || 0) + (doublesOnly ? streak : 0),
      doublesOnlyStreaks:
        (statData.doublesOnlyStreaks || 0) + (doublesOnly ? 1 : 0),
      softOnlyTotals: (statData.softOnlyTotals || 0) + (softOnly ? streak : 0),
      softOnlyStreaks: (statData.softOnlyStreaks || 0) + (softOnly ? 1 : 0),
      losses: {
        ...statData.losses,
        [lossKey]: {
          ...lossesDefault,
          ...(statData.losses[lossKey] ?? {}),
          [playerAction]:
            ((statData.losses[lossKey] ?? {})[playerAction] ?? 0) + 1,
        },
      },
    };
    setItem('bjt-streak', 0);
    setItem('bjt-stat-data', nextStatData);
    setStatData(nextStatData);

    const lastWrongActionData = {
      dealerHitSoft17,
      streak,
      dealerCard,
      playerHand,
      playerAction,
      correctAction,
      count,
    };
    setLastWrongAction(lastWrongActionData);

    if (resetCountOnLoss) {
      setCount(0);
    }
    resetHands();
    setWrongAction(false);
    setStreak(0);
  };

  const toggleDoublesOnly = () => {
    const nextDoublesOnly = !doublesOnly;
    track(`turn ${nextDoublesOnly ? 'on' : 'off'} pairs only`);
    setDoublesOnly(nextDoublesOnly);
    if (nextDoublesOnly) {
      setSoftOnly(false);
      setShoe(newShoe());
      setForceReset((p) => !p);
    }
    setItem('bjt-settings', {
      doublesOnly: nextDoublesOnly,
      softOnly,
      dealerHitSoft17,
      resetCountOnLoss,
      showCount,
      showShoe,
    });
    setStreak(0);
    setItem('bjt-streak', 0);
  };

  const toggleSoftOnly = () => {
    const nextSoftOnly = !softOnly;
    track(`turn ${nextSoftOnly ? 'on' : 'off'} soft only`);
    setSoftOnly(nextSoftOnly);
    if (nextSoftOnly) {
      setDoublesOnly(false);
      setShoe(newShoe());
      setForceReset((p) => !p);
    }
    setItem('bjt-settings', {
      doublesOnly,
      softOnly: nextSoftOnly,
      dealerHitSoft17,
      resetCountOnLoss,
      showCount,
      showShoe,
    });
    setStreak(0);
    setItem('bjt-streak', 0);
  };

  const toggleDealerHitsSoft17 = () => {
    const next = !dealerHitSoft17;
    setItem('bjt-settings', {
      doublesOnly,
      softOnly,
      dealerHitSoft17: next,
      resetCountOnLoss,
      showCount,
      showShoe,
    });
    track(`set ${next ? 'hit' : 'stand'} on soft 17`);
    setDealerHitSoft17(next);
  };

  const toggleResetCountOnLoss = () => {
    const next = !resetCountOnLoss;
    setItem('bjt-settings', {
      doublesOnly,
      softOnly,
      dealerHitSoft17,
      resetCountOnLoss: next,
      showCount,
      showShoe,
    });
    track(`turn ${next ? 'on' : 'off'} reset count on loss`);
    setResetCountOnLoss(next);
  };

  const toggleShowCount = () => {
    const next = !showCount;
    setItem('bjt-settings', {
      doublesOnly,
      softOnly,
      dealerHitSoft17,
      resetCountOnLoss,
      showCount: next,
      showShoe,
    });
    track(`${next ? 'show' : 'hide'} count`);
    setShowCount(next);
  };

  const toggleShowShoe = () => {
    const next = !showShoe;

    setItem('bjt-settings', {
      doublesOnly,
      softOnly,
      dealerHitSoft17,
      resetCountOnLoss,
      showCount,
      showShoe: next,
    });
    track(`${next ? 'show' : 'hide'} shoe`);
    setShowShoe(next);
  };

  const handValue = getHandValue(playerHand);
  const isPair =
    handValue.hand.length === 2 && handValue.hand[0] === handValue.hand[1];

  const average = statData.streakTotals / statData.streaks;
  const doublesOnlyAverage =
    statData.doublesOnlyTotals / statData.doublesOnlyStreaks;
  const softOnlyAverage = statData.softOnlyTotals / statData.softOnlyStreaks;

  const renderedAverage =
    Math.floor(average) === average ? average : round(average, 0, 5);
  const renderedDoublesAverage =
    Math.floor(doublesOnlyAverage) === doublesOnlyAverage
      ? doublesOnlyAverage
      : round(doublesOnlyAverage, 0, 5);
  const renderedSoftAverage =
    Math.floor(softOnlyAverage) === softOnlyAverage
      ? softOnlyAverage
      : round(softOnlyAverage, 0, 5);

  return (
    <Layout header={false}>
      <HandContainer>
        {initiallyLoaded && (
          <>
            <Info>
              <div>
                Streak: {streak}
                <div>
                  <DealerButton>D</DealerButton> soft 17:{' '}
                  {dealerHitSoft17 ? 'hit' : 'stand'}
                </div>
              </div>
              <RightAlign>
                {showCount && (
                  <div>
                    <QuestionButtonContainer
                      ref={countTooltipButton}
                      onClick={() => setShowCountTooltip((p) => !p)}
                    >
                      <Tooltip show={showCountTooltip} vertical="bottom">
                        <CenterRow>Counting Cards</CenterRow>
                        <CenterRow>Reset to 0 on shuffle</CenterRow>
                        <FlexRow>
                          <div>Tens &amp; Aces</div>
                          <div>- 1</div>
                        </FlexRow>
                        <FlexRow>
                          <div>7 - 9</div>
                          <div>+ 0</div>
                        </FlexRow>
                        <FlexRow>
                          <div>2 - 6</div>
                          <div>+ 1</div>
                        </FlexRow>
                      </Tooltip>
                      <FontAwesomeIcon icon={['far', 'question-circle']} />
                    </QuestionButtonContainer>
                    Running Count: {count}
                  </div>
                )}
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
          />
        )}
      </HandContainer>
      {initiallyLoaded && (
        <Actions>
          <Hit
            disabled={showSettings || wrongAction || showLastWrongAction}
            type="button"
            onClick={() => act(HIT)}
          >
            Hit
          </Hit>
          <Stand
            disabled={showSettings || wrongAction || showLastWrongAction}
            type="button"
            onClick={() => act(STAND)}
          >
            Stand
          </Stand>
          <Double
            disabled={showSettings || wrongAction || showLastWrongAction}
            type="button"
            onClick={() => act(DOUBLE)}
          >
            Double
          </Double>
          <Split
            disabled={
              !isPair || showSettings || wrongAction || showLastWrongAction
            }
            type="button"
            onClick={() => act(SPLIT)}
          >
            Split
          </Split>
        </Actions>
      )}
      <SettingsButtonsContainer $showLastWrongButton={Boolean(lastWrongAction)}>
        {Boolean(lastWrongAction) && (
          <FloatingButtonContainer>
            <FloatingButton
              onClick={() => {
                track('see last wrong action');
                setShowLastWrongAction((p) => !p);
              }}
              type="button"
            >
              <Icon icon={['fas', 'undo']} />
            </FloatingButton>
          </FloatingButtonContainer>
        )}
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
          <Tooltip show={showSettings} horizontal="left" vertical="top">
            <SettingsTitle>Settings</SettingsTitle>
            <FlexRow>
              <ToggleLabel htmlFor="pairs-only">Pairs only?</ToggleLabel>
              <Toggle
                cbId="pairs-only"
                isOn={doublesOnly}
                onClick={toggleDoublesOnly}
              />
            </FlexRow>
            <FlexRow>
              <ToggleLabel htmlFor="soft-only">Soft only?</ToggleLabel>
              <Toggle
                cbId="soft-only"
                isOn={softOnly}
                onClick={toggleSoftOnly}
              />
            </FlexRow>
            <FlexRow>
              <ToggleLabel htmlFor="hit-soft-17">
                Dealer hits soft 17?
              </ToggleLabel>
              <Toggle
                cbId="hit-soft-17"
                isOn={dealerHitSoft17}
                onClick={toggleDealerHitsSoft17}
              />
            </FlexRow>
            <FlexRow>
              <ToggleLabel htmlFor="reset-count">
                Reset count on loss?
              </ToggleLabel>
              <Toggle
                cbId="reset-count"
                isOn={resetCountOnLoss}
                onClick={toggleResetCountOnLoss}
              />
            </FlexRow>
            <FlexRow>
              <ToggleLabel htmlFor="show-count">Show count?</ToggleLabel>
              <Toggle
                cbId="show-count"
                isOn={showCount}
                onClick={toggleShowCount}
              />
            </FlexRow>
            <FlexRow>
              <ToggleLabel htmlFor="show-shoe">Show shoe?</ToggleLabel>
              <Toggle
                cbId="show-shoe"
                isOn={showShoe}
                onClick={toggleShowShoe}
              />
            </FlexRow>
            <SettingsButton
              type="button"
              onClick={() => {
                track('reset count');
                setCount(0);
                setShoe(newShoe());
              }}
            >
              Reset Count
            </SettingsButton>
            <SettingsButton
              type="button"
              onClick={() => {
                track('reset streak');
                setStreak(0);
              }}
            >
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
        <FlexRow>
          <div>Last Streak</div>
          <div>{statData.lastStreak || '--'}</div>
        </FlexRow>
        <FlexRow>
          <div>Longest Streak</div>
          <div>{statData.longestStreak || 0}</div>
        </FlexRow>
        <FlexRow>
          <div>Average Streak</div>
          <div>{statData.streaks > 0 ? renderedAverage : '--'}</div>
        </FlexRow>
        <FlexRow>
          <div>Streaks lost</div>
          <div>{statData.streaks}</div>
        </FlexRow>
        {statData.doublesOnlyStreaks > 0 && (
          <>
            <FlexRow>
              <div>Average Pairs Only Streak</div>
              <div>
                {statData.doublesOnlyStreaks > 0
                  ? renderedDoublesAverage
                  : '--'}
              </div>
            </FlexRow>
            <FlexRow>
              <div>Pairs Only Streaks lost</div>
              <div>{statData.doublesOnlyStreaks}</div>
            </FlexRow>
          </>
        )}
        {statData.softOnlyStreaks > 0 && (
          <>
            <FlexRow>
              <div>Soft Only Average Streak</div>
              <div>
                {statData.softOnlyStreaks > 0 ? renderedSoftAverage : '--'}
              </div>
            </FlexRow>
            <FlexRow>
              <div>Soft Only Streaks lost</div>
              <div>{statData.softOnlyStreaks}</div>
            </FlexRow>
          </>
        )}
        <ChartTitle>Errant Plays</ChartTitle>
        <LossTable>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <Th>
                    Soft 17
                    <br />
                    Action
                  </Th>
                  <Th>
                    Player
                    <br />
                    Hand
                  </Th>
                  <Th>
                    Dealer
                    <br />
                    Shows
                  </Th>
                  <Th>
                    Correct
                    <br />
                    Play
                  </Th>
                  <Th>Incorrect plays</Th>
                </tr>
              </thead>
              <Tbody>
                {Object.entries(statData.losses)
                  .sort(([keyA], [keyB]) => {
                    const { playerHand: playerHandA, dealerCard: dealerA } =
                      parseLossKey(keyA);
                    const { playerHand: playerHandB, dealerCard: dealerB } =
                      parseLossKey(keyB);

                    const handValA = getHandValue(playerHandA);
                    const handValB = getHandValue(playerHandB);

                    if (handValA.total !== handValB.total) {
                      return handValB.total - handValA.total;
                    }

                    const sortedHandA = handValA.hand.sort();
                    const sortedHandB = handValB.hand.sort();

                    if (sortedHandA[0] !== sortedHandB[0]) {
                      return sortedHandA[0] - sortedHandB[0];
                    }

                    if (sortedHandA[1] !== sortedHandB[1]) {
                      return sortedHandA[1] - sortedHandB[1];
                    }

                    return dealerB - dealerA;
                  })
                  .map(([lossKey, lossData]) => {
                    const {
                      playerHand: lossPlayerHand,
                      dealerCard: lossDealerCard,
                      action,
                    } = parseLossKey(lossKey);

                    const correctPlay = (
                      (action || HIT) === HIT
                        ? getCorrectActionHitSoft17
                        : getCorrectActionStandSoft17
                    )(lossPlayerHand, lossDealerCard);
                    const { [correctPlay]: _, ...wrongActions } = lossData;

                    return (
                      <Tr key={lossKey}>
                        <Td>{action || HIT}</Td>
                        <Td>{lossPlayerHand.join('-')}</Td>
                        <Td>{lossDealerCard}</Td>
                        <Td>
                          <Action $action={correctPlay}>{correctPlay}</Action>
                        </Td>
                        <Td>
                          {Object.entries(wrongActions)
                            .sort(entryKeySort)
                            .map(
                              ([key, value]) =>
                                value > 0 && (
                                  <InlineBlock key={key}>
                                    <Action $action={key}>{key}</Action>:{' '}
                                    {value}
                                  </InlineBlock>
                                ),
                            )}
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>
          </TableWrapper>
        </LossTable>
      </Modal>
      <Modal isOpen={showChart} onClose={() => setShowChart(false)}>
        <ChartTitle>
          Basic Strategy - {dealerHitSoft17 ? 'Hit' : 'Stand'} Soft 17
        </ChartTitle>
        <BlackjackTable
          blackjackData={dealerHitSoft17 ? hitSoft17 : standSoft17}
          highlight={
            initiallyLoaded
              ? `${getHandKey(playerHand)}:${getDealerKey(dealerCard)}`
              : null
          }
        />
      </Modal>
    </Layout>
  );
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

const QuestionButtonContainer = styled.button`
  display: inline-block;
  position: relative;
  background: transparent;
  padding: 0;
  margin: 0 ${rem(4)} 0;
  outline: none;
  appearance: none;
  border: none;
  cursor: pointer;
  line-height: 1;
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
`;

const ShoeCount = styled.div`
  margin-top: ${rem(2)};
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

  @media only screen and (min-width: ${({ $showLastWrongButton }) =>
      rem($showLastWrongButton ? 1046 : 1034)}) {
    transform: translateX(
      calc(
        -50% + (${rem(768)} / 2) + ${rem(19 * 2)} + ${({ $showLastWrongButton }) => rem($showLastWrongButton ? 172 : 150)}
      )
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
  height: ${rem(37)};
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

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${rem(4)};
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.screenFont};
`;

const CenterRow = styled(FlexRow)`
  justify-content: center;
`;

const ToggleLabel = styled.label`
  margin-right: ${rem(8)};
`;

const LossTable = styled.div`
  line-height: ${rem(20)};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1 1 auto;
  overflow-y: auto;
`;

const TableWrapper = styled.div`
  min-height: ${rem(180)};
  overflow-y: auto;
  width: 100%;

  @media screen and (min-width: ${rem(768)}) {
    max-height: ${rem(300)};
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.white};

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.softBlack};
  }
`;

const Tbody = styled.tbody`
  width: 100%;
`;

const Tr = styled.tr`
  width: 100%;

  &:nth-child(odd) {
    background-color: #00000088;
    color: ${({ theme }) => theme.colors.white};

    @media (prefers-color-scheme: dark) {
      background-color: #ffffff88;
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;

const Td = styled.td`
  line-height: ${rem(30)};
  text-align: center;
`;

const Action = styled.span`
  background-color: ${({ theme, $action }) =>
    computeActionColor($action, theme.colors)};
  color: ${({ theme, $action }) =>
    $action === STAND ? theme.colors.white : theme.colors.black};
  padding: ${rem(3)};
  border-radius: ${rem(3)};
`;

const InlineBlock = styled.span`
  display: inline-block;
`;
