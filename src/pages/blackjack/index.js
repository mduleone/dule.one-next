import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import blackjack from '../../data/blackjack';
import Layout from '../../components/layout';
import { rem } from '../../util/style/lengths';

const transformAction = {
  split: 'SP',
  double: 'D',
  stand: 'S',
  hit: 'H',
}

const entryKeySort = ([a], [b]) => {
  const parsedIntA = parseInt(a, 10);
  const parsedIntB = parseInt(b, 10);
  if (!Number.isNaN(parsedIntA) && !Number.isNaN(parsedIntB)) {
    return parsedIntB - parsedIntA;
  }

  if (b > a) {
    return 1;
  } else if (b < a) {
    return -1;
  } else {
    return 0;
  }
};

const Blackjack = ({ blackjack }) => {
  const [hoveredPlayerHand, setHoveredPlayerHand] = useState(null);
  const [hoveredDealerCard, setHoveredDealerCard] = useState(null);
  const hands = [
    ...Object.entries(blackjack.pairs).sort(entryKeySort).map(([key, hand]) => [`${key} ${key}`, hand]),
    ...Object.entries(blackjack.hard).sort(entryKeySort),
    ...Object.entries(blackjack.soft).sort(entryKeySort),
  ];
  const headers = Object.entries(hands[0][1]).sort(entryKeySort).map(([el]) => el);

  return (
    <Layout>
      <Table>
        <Row>
          <Legend $action="hit">Hit</Legend>
          <Legend $action="stand">Stand</Legend>
          <Legend $action="split">Split</Legend>
          <Legend $action="double">Double</Legend>
        </Row>
        <Row>
          <Lead />
          {headers.map(header => (
            <Header
              key={header}
              $hovered={hoveredDealerCard === header}
              onMouseEnter={() => {
                setHoveredPlayerHand(null);
                setHoveredDealerCard(header);
              }}
              onMouseLeave={() => {
                setHoveredPlayerHand(null);
                setHoveredDealerCard(null);
              }}
            >
              {header}
            </Header>
          ))}
        </Row>
        <Pairs>Pairs</Pairs>
        <Hard>Hard</Hard>
        <Soft>Soft</Soft>
        {hands.map(([key, hand]) => (
          <Row key={key}>
            <Lead
              $hovered={hoveredPlayerHand === key}
              onMouseEnter={() => {
                setHoveredPlayerHand(key);
                setHoveredDealerCard(null);
              }}
              onMouseLeave={() => {
                setHoveredPlayerHand(null);
                setHoveredDealerCard(null);
              }}
            >
              {key}
            </Lead>
            {Object.entries(hand).sort(entryKeySort).map(([handKey, {action, surrender}]) => (
              <Hand
                key={handKey}
                $action={action}
                onMouseEnter={() => {
                  setHoveredPlayerHand(key);
                  setHoveredDealerCard(handKey);
                }}
                onMouseLeave={() => {
                  setHoveredPlayerHand(null);
                  setHoveredDealerCard(null);
                }}
              >
                {transformAction[action]}
                {surrender ? '*' : ''}
                <Key
                  $columnHovered={hoveredDealerCard === handKey && hoveredPlayerHand === null}
                >
                  {key}
                </Key>
                <HandKey>{handKey}</HandKey>
              </Hand>
            ))}
          </Row>
        ))}
        <Row>
          <ColorlessLegend>* Surrender if allowed</ColorlessLegend>
        </Row>
      </Table>
    </Layout>
  );
};

const cardProps = PropTypes.shape({
  action: PropTypes.oneOf(['hit', 'double', 'split', 'stand']),
  surrender: PropTypes.bool,
});

const handProps = PropTypes.shape({
  A: cardProps,
  10: cardProps,
  9: cardProps,
  8: cardProps,
  7: cardProps,
  6: cardProps,
  5: cardProps,
  4: cardProps,
  3: cardProps,
  2: cardProps,
});

Blackjack.propTypes = {
  blackjack: PropTypes.shape({
    pairs: PropTypes.objectOf(handProps), 
    hard: PropTypes.objectOf(handProps),
    soft: PropTypes.objectOf(handProps),
  }),
};

Blackjack.defaultProps = {};

export const getStaticProps = () => ({
  props: {
    blackjack,
  },
});

export default Blackjack;

const computeActionColor = (action, colors) => {
  switch (action) {
    case 'split':
      return 'cyan';
    case 'hit':
      return 'lime';
    case 'double':
      return 'gold';
    case 'stand':
      return colors.duleoneRed;
    default: 
      // no default
  }
}

const Table = styled.div`
  line-height: 1.15;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Row = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-width: 100%;
`;

const Legend = styled.div`
  font-size: ${rem(14)};
  font-weight: bold;
  min-width: ${rem(30)};
  text-align: center;
  background-color: ${({ theme, $action }) => computeActionColor($action, theme.colors)};
  color: ${({ theme, $action }) => $action === 'stand' ? theme.colors.white : theme.colors.black};
  flex: 1 1 auto;

  @media screen and (min-width: ${rem(768)}) {
    min-width: ${rem(50)};
  }

  &:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  &:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`;

const ColorlessLegend = styled.div`
  font-size: ${rem(14)};
  font-weight: bold;
  min-width: ${rem(30)};
  text-align: center;
  flex: 1 1 auto;

  @media screen and (min-width: ${rem(768)}) {
    min-width: ${rem(50)};
  }
`;

const Header = styled.div`
  font-size: ${rem(14)};
  font-weight: bold;
  min-width: ${rem(30)};
  text-align: center;
  background-color: ${({ $hovered }) => $hovered ? 'teal' : 'inherit'};
  color: ${({ $hovered, theme }) => $hovered ? theme.colors.white : 'inherit'};

  @media screen and (min-width: ${rem(768)}) {
    min-width: ${rem(50)};
  }
`;

const Pairs = styled.div`
  text-align: center;
  width: ${rem(219.4)};
  position: absolute;
  transform: rotate(-90deg) translate(-239.32px, -69px);
  transform-origin: left;
  border-left: ${({ theme }) => theme.colors.black} ${rem(1)} solid;
  border-right: ${({ theme }) => theme.colors.black} ${rem(1)} solid;

  @media screen and (min-width: ${rem(768)}) {
    transform: rotate(-90deg) translate(-239.32px, -169px);
  }

  @media (prefers-color-scheme: dark) {
    border-color: ${({ theme }) => theme.colors.white};
  }
`;

const Hard = styled.div`
  text-align: center;
  width: ${rem(219.4)};
  position: absolute;
  transform: rotate(-90deg) translate(-457.72px, -69px);
  transform-origin: left;
  border-left: ${({ theme }) => theme.colors.black} ${rem(1)} solid;
  border-right: ${({ theme }) => theme.colors.black} ${rem(1)} solid;

  @media screen and (min-width: ${rem(768)}) {
    transform: rotate(-90deg) translate(-457.72px, -169px);
  }

  @media (prefers-color-scheme: dark) {
    border-color: ${({ theme }) => theme.colors.white};
  }
`;

const Soft = styled.div`
  text-align: center;
  width: ${rem(175.72)};
  position: absolute;
  transform: rotate(-90deg) translate(-632.36px, -90px);
  transform-origin: left;
  border-left: ${({ theme }) => theme.colors.black} ${rem(1)} solid;
  border-right: ${({ theme }) => theme.colors.black} ${rem(1)} solid;

  @media screen and (min-width: ${rem(768)}) {
    transform: rotate(-90deg) translate(-632.36px, -190px);
  }

  @media (prefers-color-scheme: dark) {
    border-color: ${({ theme }) => theme.colors.white};
  }
`;

const Key = styled.div`
  position: absolute;
  font-size: ${rem(12)};
  line-height: 1.1;
  letter-spacing: -${rem(1)};
  border-radius: ${rem(100)};
  color: ${({ theme }) => theme.colors.softBlack};
  background-color: ${({ theme }) => theme.colors.softWhite};
  display: ${({ $columnHovered }) => $columnHovered ? 'block' : 'none'};
  padding: 0 ${rem(4)};
  left: 0;
  bottom: 0;
  transform: translate(-50%, 50%);
  z-index: 1;
  white-space: nowrap;
`;
  
const HandKey = styled.div`
  position: absolute;
  font-size: ${rem(12)};
  line-height: 1.1;
  letter-spacing: -${rem(1)};
  border-radius: ${rem(100)};
  color: ${({ theme }) => theme.colors.softBlack};
  background-color: ${({ theme }) => theme.colors.softWhite};
  display: none;
  padding: 0 ${rem(4)};
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  z-index: 1;
  white-space: nowrap;
`;

const Lead = styled.div`
  font-size: ${rem(14)};
  font-weight: bold;
  white-space: nowrap;
  align-self: flex-end;
  min-width: ${rem(40)};
  width: ${rem(40)};
  border: none;
  text-align: right;
  padding-right: ${rem(8)};
  letter-spacing: -${rem(1)};
  background-color: ${({$hovered }) => $hovered ? 'teal' : 'inherit'};
  color: ${({ $hovered, theme }) => $hovered ? theme.colors.white : 'inherit'};

  &:hover ~ * ${HandKey},
  &:focus ~ * ${HandKey} {
    display: block;
  }
`;

const Hand = styled.div`
  border: none;
  padding: 0;
  background-color: ${({ theme, $action }) => computeActionColor($action, theme.colors)};
  text-align: center;
  min-width: ${rem(30)};
  vertical-align: middle;
  color: ${({ theme, $action }) => $action === 'stand' ? theme.colors.white : theme.colors.black};
  position: relative;

  &:hover,
  &:focus {
    ${HandKey},
    ${Key} {
      display: block;
    }
  }

  @media screen and (min-width: ${rem(768)}) {
    min-width: ${rem(50)};
  }
`;
