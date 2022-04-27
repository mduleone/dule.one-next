const blackjack = {
  pairs: {
    A: {
      A: {
        action: 'split',
        surrender: false,
      },
      10: {
        action: 'split',
        surrender: false,
      },
      9: {
        action: 'split',
        surrender: false,
      },
      8: {
        action: 'split',
        surrender: false,
      },
      7: {
        action: 'split',
        surrender: false,
      },
      6: {
        action: 'split',
        surrender: false,
      },
      5: {
        action: 'split',
        surrender: false,
      },
      4: {
        action: 'split',
        surrender: false,
      },
      3: {
        action: 'split',
        surrender: false,
      },
      2: {
        action: 'split',
        surrender: false,
      },
    },
    10: {
      A: {
        action: 'stand',
        surrender: false,
      },
      10: {
        action: 'stand',
        surrender: false,
      },
      9: {
        action: 'stand',
        surrender: false,
      },
      8: {
        action: 'stand',
        surrender: false,
      },
      7: {
        action: 'stand',
        surrender: false,
      },
      6: {
        action: 'stand',
        surrender: false,
      },
      5: {
        action: 'stand',
        surrender: false,
      },
      4: {
        action: 'stand',
        surrender: false,
      },
      3: {
        action: 'stand',
        surrender: false,
      },
      2: {
        action: 'stand',
        surrender: false,
      },
    },
    9: {
      A: {
        action: 'stand',
        surrender: false,
      },
      10: {
        action: 'stand',
        surrender: false,
      },
      9: {
        action: 'split',
        surrender: false,
      },
      8: {
        action: 'split',
        surrender: false,
      },
      7: {
        action: 'stand',
        surrender: false,
      },
      6: {
        action: 'split',
        surrender: false,
      },
      5: {
        action: 'split',
        surrender: false,
      },
      4: {
        action: 'split',
        surrender: false,
      },
      3: {
        action: 'split',
        surrender: false,
      },
      2: {
        action: 'split',
        surrender: false,
      },
    },
    8: {
      A: {
        action: 'split',
        surrender: false,
      },
      10: {
        action: 'split',
        surrender: false,
      },
      9: {
        action: 'split',
        surrender: false,
      },
      8: {
        action: 'split',
        surrender: false,
      },
      7: {
        action: 'split',
        surrender: false,
      },
      6: {
        action: 'split',
        surrender: false,
      },
      5: {
        action: 'split',
        surrender: false,
      },
      4: {
        action: 'split',
        surrender: false,
      },
      3: {
        action: 'split',
        surrender: false,
      },
      2: {
        action: 'split',
        surrender: false,
      },
    },
    7: {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'split',
        surrender: false,
      },
      6: {
        action: 'split',
        surrender: false,
      },
      5: {
        action: 'split',
        surrender: false,
      },
      4: {
        action: 'split',
        surrender: false,
      },
      3: {
        action: 'split',
        surrender: false,
      },
      2: {
        action: 'split',
        surrender: false,
      },
    },
    6: {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'hit',
        surrender: false,
      },
      6: {
        action: 'hit',
        surrender: false,
      },
      5: {
        action: 'hit',
        surrender: false,
      },
      4: {
        action: 'hit',
        surrender: false,
      },
      3: {
        action: 'hit',
        surrender: false,
      },
      2: {
        action: 'hit',
        surrender: false,
      },
    },
    5: {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'double',
        surrender: false,
      },
      8: {
        action: 'double',
        surrender: false,
      },
      7: {
        action: 'double',
        surrender: false,
      },
      6: {
        action: 'double',
        surrender: false,
      },
      5: {
        action: 'double',
        surrender: false,
      },
      4: {
        action: 'double',
        surrender: false,
      },
      3: {
        action: 'double',
        surrender: false,
      },
      2: {
        action: 'double',
        surrender: false,
      },
    },
    4: {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'hit',
        surrender: false,
      },
      6: {
        action: 'split',
        surrender: false,
      },
      5: {
        action: 'split',
        surrender: false,
      },
      4: {
        action: 'hit',
        surrender: false,
      },
      3: {
        action: 'hit',
        surrender: false,
      },
      2: {
        action: 'hit',
        surrender: false,
      },
    },
    3: {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'split',
        surrender: false,
      },
      6: {
        action: 'split',
        surrender: false,
      },
      5: {
        action: 'split',
        surrender: false,
      },
      4: {
        action: 'split',
        surrender: false,
      },
      3: {
        action: 'split',
        surrender: false,
      },
      2: {
        action: 'split',
        surrender: false,
      },
    },
    2: {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'split',
        surrender: false,
      },
      6: {
        action: 'split',
        surrender: false,
      },
      5: {
        action: 'split',
        surrender: false,
      },
      4: {
        action: 'split',
        surrender: false,
      },
      3: {
        action: 'split',
        surrender: false,
      },
      2: {
        action: 'split',
        surrender: false,
      },},
  },
  hard: {
    '17 +': {
      A: {
        action: 'stand',
        surrender: false,
      },
      10: {
        action: 'stand',
        surrender: false,
      },
      9: {
        action: 'stand',
        surrender: false,
      },
      8: {
        action: 'stand',
        surrender: false,
      },
      7: {
        action: 'stand',
        surrender: false,
      },
      6: {
        action: 'stand',
        surrender: false,
      },
      5: {
        action: 'stand',
        surrender: false,
      },
      4: {
        action: 'stand',
        surrender: false,
      },
      3: {
        action: 'stand',
        surrender: false,
      },
      2: {
        action: 'stand',
        surrender: false,
      },
    },
    16: {
      A: {
        action: 'hit',
        surrender: true,
      },
      10: {
        action: 'hit',
        surrender: true,
      },
      9: {
        action: 'hit',
        surrender: true,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'hit',
        surrender: false,
      },
      6: {
        action: 'stand',
        surrender: false,
      },
      5: {
        action: 'stand',
        surrender: false,
      },
      4: {
        action: 'stand',
        surrender: false,
      },
      3: {
        action: 'stand',
        surrender: false,
      },
      2: {
        action: 'stand',
        surrender: false,
      },
    },
    15: {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: true,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'hit',
        surrender: false,
      },
      6: {
        action: 'stand',
        surrender: false,
      },
      5: {
        action: 'stand',
        surrender: false,
      },
      4: {
        action: 'stand',
        surrender: false,
      },
      3: {
        action: 'stand',
        surrender: false,
      },
      2: {
        action: 'stand',
        surrender: false,
      },
    },
    14: {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'hit',
        surrender: false,
      },
      6: {
        action: 'stand',
        surrender: false,
      },
      5: {
        action: 'stand',
        surrender: false,
      },
      4: {
        action: 'stand',
        surrender: false,
      },
      3: {
        action: 'stand',
        surrender: false,
      },
      2: {
        action: 'stand',
        surrender: false,
      },
    },
    13: {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'hit',
        surrender: false,
      },
      6: {
        action: 'stand',
        surrender: false,
      },
      5: {
        action: 'stand',
        surrender: false,
      },
      4: {
        action: 'stand',
        surrender: false,
      },
      3: {
        action: 'stand',
        surrender: false,
      },
      2: {
        action: 'stand',
        surrender: false,
      },
    },
    12: {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'hit',
        surrender: false,
      },
      6: {
        action: 'stand',
        surrender: false,
      },
      5: {
        action: 'stand',
        surrender: false,
      },
      4: {
        action: 'stand',
        surrender: false,
      },
      3: {
        action: 'hit',
        surrender: false,
      },
      2: {
        action: 'hit',
        surrender: false,
      },
    },
    11: {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'double',
        surrender: false,
      },
      9: {
        action: 'double',
        surrender: false,
      },
      8: {
        action: 'double',
        surrender: false,
      },
      7: {
        action: 'double',
        surrender: false,
      },
      6: {
        action: 'double',
        surrender: false,
      },
      5: {
        action: 'double',
        surrender: false,
      },
      4: {
        action: 'double',
        surrender: false,
      },
      3: {
        action: 'double',
        surrender: false,
      },
      2: {
        action: 'double',
        surrender: false,
      },
    },
    10: {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'double',
        surrender: false,
      },
      8: {
        action: 'double',
        surrender: false,
      },
      7: {
        action: 'double',
        surrender: false,
      },
      6: {
        action: 'double',
        surrender: false,
      },
      5: {
        action: 'double',
        surrender: false,
      },
      4: {
        action: 'double',
        surrender: false,
      },
      3: {
        action: 'double',
        surrender: false,
      },
      2: {
        action: 'double',
        surrender: false,
      },
    },
    9: {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'hit',
        surrender: false,
      },
      6: {
        action: 'double',
        surrender: false,
      },
      5: {
        action: 'double',
        surrender: false,
      },
      4: {
        action: 'double',
        surrender: false,
      },
      3: {
        action: 'double',
        surrender: false,
      },
      2: {
        action: 'hit',
        surrender: false,
      },
    },
    '8 -': {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'hit',
        surrender: false,
      },
      6: {
        action: 'hit',
        surrender: false,
      },
      5: {
        action: 'hit',
        surrender: false,
      },
      4: {
        action: 'hit',
        surrender: false,
      },
      3: {
        action: 'hit',
        surrender: false,
      },
      2: {
        action: 'hit',
        surrender: false,
      },
    },
  },
  soft: {
    'A - 9': {
      A: {
        action: 'stand',
        surrender: false,
      },
      10: {
        action: 'stand',
        surrender: false,
      },
      9: {
        action: 'stand',
        surrender: false,
      },
      8: {
        action: 'stand',
        surrender: false,
      },
      7: {
        action: 'stand',
        surrender: false,
      },
      6: {
        action: 'double',
        surrender: false,
      },
      5: {
        action: 'double',
        surrender: false,
      },
      4: {
        action: 'double',
        surrender: false,
      },
      3: {
        action: 'double',
        surrender: false,
      },
      2: {
        action: 'double',
        surrender: false,
      },
    },
    'A - 8': {
      A: {
        action: 'stand',
        surrender: false,
      },
      10: {
        action: 'stand',
        surrender: false,
      },
      9: {
        action: 'stand',
        surrender: false,
      },
      8: {
        action: 'stand',
        surrender: false,
      },
      7: {
        action: 'stand',
        surrender: false,
      },
      6: {
        action: 'double',
        surrender: false,
      },
      5: {
        action: 'double',
        surrender: false,
      },
      4: {
        action: 'double',
        surrender: false,
      },
      3: {
        action: 'double',
        surrender: false,
      },
      2: {
        action: 'double',
        surrender: false,
      },
    },
    'A - 7': {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'stand',
        surrender: false,
      },
      7: {
        action: 'stand',
        surrender: false,
      },
      6: {
        action: 'double',
        surrender: false,
      },
      5: {
        action: 'double',
        surrender: false,
      },
      4: {
        action: 'double',
        surrender: false,
      },
      3: {
        action: 'double',
        surrender: false,
      },
      2: {
        action: 'double',
        surrender: false,
      },
    },
    'A - 6': {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'hit',
        surrender: false,
      },
      6: {
        action: 'double',
        surrender: false,
      },
      5: {
        action: 'double',
        surrender: false,
      },
      4: {
        action: 'double',
        surrender: false,
      },
      3: {
        action: 'double',
        surrender: false,
      },
      2: {
        action: 'hit',
        surrender: false,
      },
    },
    'A - 5': {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'hit',
        surrender: false,
      },
      6: {
        action: 'double',
        surrender: false,
      },
      5: {
        action: 'double',
        surrender: false,
      },
      4: {
        action: 'double',
        surrender: false,
      },
      3: {
        action: 'hit',
        surrender: false,
      },
      2: {
        action: 'hit',
        surrender: false,
      },
    },
    'A - 4': {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'hit',
        surrender: false,
      },
      6: {
        action: 'double',
        surrender: false,
      },
      5: {
        action: 'double',
        surrender: false,
      },
      4: {
        action: 'double',
        surrender: false,
      },
      3: {
        action: 'hit',
        surrender: false,
      },
      2: {
        action: 'hit',
        surrender: false,
      },
    },
    'A - 3': {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'hit',
        surrender: false,
      },
      6: {
        action: 'double',
        surrender: false,
      },
      5: {
        action: 'double',
        surrender: false,
      },
      4: {
        action: 'hit',
        surrender: false,
      },
      3: {
        action: 'hit',
        surrender: false,
      },
      2: {
        action: 'hit',
        surrender: false,
      },
    },
    'A - 2': {
      A: {
        action: 'hit',
        surrender: false,
      },
      10: {
        action: 'hit',
        surrender: false,
      },
      9: {
        action: 'hit',
        surrender: false,
      },
      8: {
        action: 'hit',
        surrender: false,
      },
      7: {
        action: 'hit',
        surrender: false,
      },
      6: {
        action: 'double',
        surrender: false,
      },
      5: {
        action: 'double',
        surrender: false,
      },
      4: {
        action: 'hit',
        surrender: false,
      },
      3: {
        action: 'hit',
        surrender: false,
      },
      2: {
        action: 'hit',
        surrender: false,
      },
    },
  },
};

export default blackjack;