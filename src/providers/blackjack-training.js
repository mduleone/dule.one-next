import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Context from '~/components/context/blackjack-training';
import {
  newShoe,
  DECK,
  randomSuit,
  randomTen,
  shuffle,
} from '~/util/playing-cards';
import {
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
  getLossKey,
} from '~/util/blackjack';
import { getItem, setItem } from '~/util/local-storage';
import trackRaw from '~/util/track';

const track = (event, data = {}) =>
  trackRaw(`[Blackjack Training] - ${event}`, data);

const defaultStatData = {
  longestStreak: 0,
  lastStreak: 0,
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

const BlackjackTrainingProvider = ({ children }) => {
  const [streak, setStreak] = useState(0);
  const [statData, setStatData] = useState(defaultStatData);
  const [initiallyLoaded, setInitiallyLoaded] = useState(false);
  const [count, setCount] = useState(0);
  const [shoe, setShoe] = useState(newShoe());
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerCard, setDealerCard] = useState(null);
  const [correctAction, setCorrectAction] = useState('');
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
  const [showSettings, setShowSettings] = useState(false);
  const [showLastWrongAction, setShowLastWrongAction] = useState(false);

  const handValue = getHandValue(playerHand);
  const isPair =
    handValue.hand.length === 2 && handValue.hand[0] === handValue.hand[1];

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
      if (getHandValue(nextPlayerHand).total === 21) {
        if (softOnly) {
          tempShoe.unshift(nextPlayerHand[1]);
        } else {
          tempShoe.unshift(...nextPlayerHand);
        }
        tempShoe = shuffle(tempShoe);
      }
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

  const act = (action) => {
    track('act', { action, correctAction });
    if (action === correctAction) {
      track('correct action');
      setStreak((s) => {
        const nextStreak = s + 1;
        setItem('bjt-streak', nextStreak);
        if (nextStreak > statData.longestStreak) {
          setStatData({ ...statData, longestStreak: nextStreak });
          setItem('bjt-stat-data', {
            ...statData,
            longestStreak: nextStreak,
          });
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

  useEffect(() => {
    track('page load');
  }, []);

  useEffect(() => {
    const keypressListener = (e) => {
      if (['h', 'H'].includes(e.key)) {
        act(HIT);
      } else if (['s', 'S'].includes(e.key)) {
        act(STAND);
      } else if (['d', 'D'].includes(e.key)) {
        act(DOUBLE);
      } else if (['p', 'P'].includes(e.key) && isPair) {
        act(SPLIT);
      }
    };

    window.addEventListener('keypress', keypressListener);

    return () => window.removeEventListener('keypress', keypressListener);
  }, [act]);

  useEffect(() => {
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
        if (doublesOnlySetting || softOnlySetting) {
          setForceReset((p) => !p);
        }
      }

      setInitiallyLoaded(true);
    }

    resetHands();
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
      playerHandKey: getHandKey(playerHand),
      dealerCardKey: getDealerKey(dealerCard),
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
      softOnly: nextDoublesOnly ? false : softOnly,
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
      doublesOnly: nextSoftOnly ? false : doublesOnly,
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

  const resetCount = () => {
    track('reset count');
    setCount(0);
    setShoe(newShoe());
  };

  const resetStreak = () => {
    track('reset streak');
    setStreak(0);
  };

  const value = {
    streak,
    statData,
    initiallyLoaded,
    count,
    shoe,
    playerHand,
    dealerCard,
    correctAction,
    wrongAction,
    showShoe,
    showCount,
    doublesOnly,
    softOnly,
    dealerHitSoft17,
    resetCountOnLoss,
    playerAction,
    lastWrongAction,
    isPair,
    act,
    clearWrongAction,
    toggleDoublesOnly,
    toggleSoftOnly,
    toggleDealerHitsSoft17,
    toggleResetCountOnLoss,
    toggleShowCount,
    toggleShowShoe,
    resetCount,
    resetStreak,
    track,
    showSettings,
    setShowSettings,
    showLastWrongAction,
    setShowLastWrongAction,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

BlackjackTrainingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlackjackTrainingProvider;
