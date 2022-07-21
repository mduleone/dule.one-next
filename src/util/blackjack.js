import { clamp } from './number';

export const getCountValue = (rank) => {
  if (rank >= 10) {
    return -1;
  }
  if (rank <= 6) {
    return 1;
  }
  return 0;
};

export const getCardValue = (card) => {
  const [rank] = card.split('');

  const numericRank = Number(rank);

  if (!Number.isNaN(numericRank)) {
    return numericRank;
  }

  if (rank.toUpperCase() === 'A') {
    return 11;
  }
  return 10;
};

export const getCardRank = (cardValue) => {
  const numericCard = Number(cardValue);
  if (cardValue < 10) {
    return `${cardValue}`;
  }

  if (numericCard === 10) {
    return 'T';
  }

  return 'A';
};

export const getHandValue = (hand) => {
  const cards = hand.map(getCardValue);

  return {
    total: cards.reduce((s, r) => r + s, 0),
    soft: cards.some((x) => x === 11),
    hand: cards,
  };
};

export const getHandKey = (playerHand) => {
  const { total, soft, hand } = getHandValue(playerHand);
  const [card0, card1] = hand;
  if (hand.length === 2 && card0 === card1) {
    if (total === 22) {
      return 'A A';
    }

    return `${card0} ${card0}`;
  }

  if (soft) {
    return `s${clamp(total, 13, 19)}${total >= 19 ? '+' : ''}`;
  }

  let modifier = '';
  if (total >= 17) {
    modifier = '+';
  } else if (total <= 7) {
    modifier = '-';
  }

  return `h${clamp(total, 7, 17)}${modifier}`;
};

export const getDealerKey = (dealerCard) => {
  const cardValue = getCardValue(dealerCard);

  if (cardValue === 11) {
    return 'A';
  }

  return cardValue;
};

export const HIT = 'hit';
export const STAND = 'stand';
export const DOUBLE = 'double';
export const SPLIT = 'split';

export const getCorrectActionHitSoft17 = (playerHand, dealerCard) => {
  const { total, soft, hand } = getHandValue(playerHand);
  const dealerCardValue = getCardValue(dealerCard);
  if (hand.length === 2 && hand[0] === hand[1]) {
    const pairedCard = total / 2;
    if (
      [8, 11].includes(pairedCard) ||
      (pairedCard === 9 && ![11, 10, 7].includes(dealerCardValue)) ||
      (pairedCard === 7 && dealerCardValue <= 8) ||
      (pairedCard === 4 && dealerCardValue === 5) ||
      ([2, 3, 6].includes(pairedCard) && dealerCardValue <= 7)
    ) {
      return SPLIT;
    }
  }

  if (soft) {
    if (total >= 19) {
      return STAND;
    }

    if (total === 18) {
      if ([11, 8, 7, 2].includes(dealerCardValue)) {
        return STAND;
      }
      if (dealerCardValue <= 6) {
        return DOUBLE;
      }
      return HIT;
    }

    if (total === 17) {
      if (dealerCardValue <= 6) {
        return DOUBLE;
      }
      return HIT;
    }

    if ([4, 5, 6].includes(dealerCardValue)) {
      return DOUBLE;
    }

    return HIT;
  }

  if (total >= 17) {
    return STAND;
  }

  if (total === 16 && dealerCardValue === 10 && hand.length >= 3) {
    return STAND;
  }

  if ([13, 15, 16].includes(total)) {
    if (dealerCardValue <= 6) {
      return STAND;
    }

    return HIT;
  }

  if (total === 14) {
    if (
      dealerCardValue <= 6 ||
      (hand.length === 2 && hand.includes(7) && dealerCardValue === 10)
    ) {
      return STAND;
    }

    return HIT;
  }

  if (total === 12) {
    if ([4, 5, 6].includes(dealerCardValue)) {
      return STAND;
    }

    return HIT;
  }

  if (total === 11) {
    return DOUBLE;
  }

  if (total === 10) {
    if (dealerCardValue >= 10) {
      return HIT;
    }

    return DOUBLE;
  }

  if (total === 9) {
    if (dealerCardValue >= 7 || dealerCardValue === 2) {
      return HIT;
    }

    return DOUBLE;
  }

  if (total === 8) {
    if ([5, 6].includes(dealerCardValue)) {
      if (hand.includes(2)) {
        return HIT;
      }

      return DOUBLE;
    }

    return HIT;
  }

  // total <= 7
  return HIT;
};

export const getCorrectActionStandSoft17 = (playerHand, dealerCard) => {
  const { total, soft, hand } = getHandValue(playerHand);
  const dealerCardValue = getCardValue(dealerCard);
  if (hand.length === 2 && hand[0] === hand[1]) {
    const pairedCard = total / 2;
    if (
      [8, 11].includes(pairedCard) ||
      (pairedCard === 9 && ![11, 10, 7].includes(dealerCardValue)) ||
      (pairedCard === 7 && dealerCardValue <= 8) ||
      (pairedCard === 4 && [5, 6].includes(dealerCardValue)) ||
      ([2, 3, 6].includes(pairedCard) && dealerCardValue <= 7)
    ) {
      return SPLIT;
    }
  }

  if (soft) {
    if (total >= 19) {
      return STAND;
    }

    if (total === 18) {
      if ([11, 8, 7, 2].includes(dealerCardValue)) {
        return STAND;
      }
      if (dealerCardValue <= 6) {
        return DOUBLE;
      }
      return HIT;
    }

    if (total === 17) {
      if (dealerCardValue <= 6) {
        return DOUBLE;
      }
      return HIT;
    }

    if ([15, 16].includes(total)) {
      if ([4, 5, 6].includes(dealerCardValue)) {
        return DOUBLE;
      }

      return HIT;
    }

    if ([5, 6].includes(dealerCardValue)) {
      return DOUBLE;
    }

    return HIT;
  }

  if (total >= 17) {
    return STAND;
  }

  if (total === 16 && dealerCardValue === 10 && hand.length >= 3) {
    return STAND;
  }

  if ([13, 15, 16].includes(total)) {
    if (dealerCardValue <= 6) {
      return STAND;
    }

    return HIT;
  }

  if (total === 14) {
    if (
      dealerCardValue <= 6 ||
      (hand.length === 2 && hand.includes(7) && dealerCardValue === 10)
    ) {
      return STAND;
    }

    return HIT;
  }

  if (total === 12) {
    if ([4, 5, 6].includes(dealerCardValue)) {
      return STAND;
    }

    return HIT;
  }

  if (total === 11) {
    if (dealerCardValue === 11) {
      return HIT;
    }

    return DOUBLE;
  }

  if (total === 10) {
    if (dealerCardValue >= 10) {
      return HIT;
    }

    return DOUBLE;
  }

  if (total === 9) {
    if (dealerCardValue >= 7 || dealerCardValue === 2) {
      return HIT;
    }

    return DOUBLE;
  }

  if (total === 8) {
    if ([5, 6].includes(dealerCardValue)) {
      if (hand.includes(2)) {
        return HIT;
      }

      return DOUBLE;
    }

    return HIT;
  }

  // total <= 7
  return HIT;
};

export const getLossKey = (playerHand, dealerCard, action) =>
  `${playerHand.map(getCardValue).sort().join(',')}:${getCardValue(
    dealerCard,
  )}:${action}`;

export const parseLossKey = (lossKey) => {
  const [playerString, dealerString, action] = lossKey.split(':');
  const playerHand = playerString.split(',').map(getCardRank);
  const dealerCard = getCardRank(dealerString);

  return { playerHand, dealerCard, action };
};
