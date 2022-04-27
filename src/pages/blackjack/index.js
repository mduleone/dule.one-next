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
          {headers.map(header => <Header key={header}>{header}</Header>)}
        </Row>
        {hands.map(([key, hand]) => (
          <Row key={key}>
            <Lead>{key}</Lead>
            {Object.entries(hand).sort(entryKeySort).map(([handKey, {action, surrender}]) => (
              <Hand key={handKey} $action={action}>
                {transformAction[action]}
                {surrender ? '*' : ''}
                <Key>{key}</Key>
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

  @media screen and (min-width: ${rem(768)}) {
    min-width: ${rem(50)};
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
  display: none;
  padding: 0 ${rem(8)};
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
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
  padding: 0 ${rem(8)};
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

  &:hover ~ * ${HandKey},
  &:focus ~ * ${HandKey} {
    display: block;
  }

  &:hover,
  &:focus {
    background-color: teal;
  }
`;

const Row = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  min-width: 100%;

  &:focus-within > ${Lead} {
    background-color: teal;
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

    &:hover ~ ${Lead} {
      background-color: teal;
    }
  }

  @media screen and (min-width: ${rem(768)}) {
    min-width: ${rem(50)};
  }
`;
