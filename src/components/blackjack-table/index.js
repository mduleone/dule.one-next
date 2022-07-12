import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Tooltip from '~/components/tooltip';
import { rem } from '~/util/style/lengths';

const transformAction = {
  split: 'SP',
  double: 'D',
  stand: 'S',
  hit: 'H',
};

export const entryKeySort = ([a], [b]) => {
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

const BlackjackTable = ({ blackjackData }) => {
  const [hoveredPlayerHand, setHoveredPlayerHand] = useState(null);
  const [hoveredDealerCard, setHoveredDealerCard] = useState(null);

  const { hands, headers } = useMemo(() => {
    const handsArray = [
      ...Object.entries(blackjackData.pairs)
        .sort(entryKeySort)
        .map(([key, hand]) => [`${key} ${key}`, hand]),
      ...Object.entries(blackjackData.hard).sort(entryKeySort),
      ...Object.entries(blackjackData.soft).sort(entryKeySort),
    ];
    const headersArray = Object.entries(handsArray[0][1])
      .filter(([key]) => key !== 'key')
      .sort(entryKeySort)
      .map(([el]) => el);

    return { hands: handsArray, headers: headersArray };
  }, [JSON.stringify(blackjackData)]);

  return (
    <Table>
      <Row>
        <Legend $action="hit">Hit</Legend>
        <Legend $action="stand">Stand</Legend>
        <Legend $action="split">Split</Legend>
        <Legend $action="double">Double</Legend>
      </Row>
      <Row>
        <Lead />
        {headers.map((header) => (
          <Header
            key={header}
            $hovered={hoveredDealerCard === header}
            role="button"
            onClick={() => {
              setHoveredPlayerHand(null);
              setHoveredDealerCard(header);
            }}
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
      {hands.map(([playerHand, { key: handKey, ...hand }]) => (
        <Row key={handKey}>
          <Lead
            $hovered={hoveredPlayerHand === handKey}
            role="button"
            onClick={() => {
              setHoveredPlayerHand(handKey);
              setHoveredDealerCard(null);
            }}
            onMouseEnter={() => {
              setHoveredPlayerHand(handKey);
              setHoveredDealerCard(null);
            }}
            onMouseLeave={() => {
              setHoveredPlayerHand(null);
              setHoveredDealerCard(null);
            }}
          >
            {playerHand}
          </Lead>
          {Object.entries(hand)
            .sort(entryKeySort)
            .map(
              ([
                dealerCard,
                { action, surrender, tooltip, tooltipForceRight },
              ]) => {
                const showPlayerKey =
                  (hoveredDealerCard === null &&
                    hoveredPlayerHand === handKey) ||
                  (hoveredDealerCard === dealerCard &&
                    hoveredPlayerHand === handKey);
                const showDealerKey =
                  (hoveredDealerCard === dealerCard &&
                    hoveredPlayerHand === null) ||
                  (hoveredDealerCard === dealerCard &&
                    hoveredPlayerHand === handKey);

                return (
                  <Hand
                    key={dealerCard}
                    $action={action}
                    role="button"
                    onClick={() => {
                      setHoveredPlayerHand(handKey);
                      setHoveredDealerCard(dealerCard);
                    }}
                    onMouseEnter={() => {
                      setHoveredPlayerHand(handKey);
                      setHoveredDealerCard(dealerCard);
                    }}
                    onMouseLeave={() => {
                      setHoveredPlayerHand(null);
                      setHoveredDealerCard(null);
                    }}
                  >
                    {transformAction[action]}
                    {(surrender || tooltip) && (
                      <Sup>
                        {surrender && '*'}
                        {tooltip && '†'}
                      </Sup>
                    )}
                    <DealerHandValue $show={showDealerKey}>
                      {playerHand}
                    </DealerHandValue>
                    <PlayerHandValue $show={showPlayerKey}>
                      {dealerCard}
                    </PlayerHandValue>
                    {tooltip && (
                      <Tooltip
                        show={showDealerKey && showPlayerKey}
                        // eslint-disable-next-line no-undefined
                        horizontal={tooltipForceRight ? 'left' : undefined}
                      >
                        {tooltip}
                      </Tooltip>
                    )}
                  </Hand>
                );
              },
            )}
        </Row>
      ))}
      <Row>
        <ColorlessLegend>
          <Sup>*</Sup>Surrender if allowed
        </ColorlessLegend>
        <ColorlessLegend>
          <Sup>†</Sup>has special case, tap/hover
        </ColorlessLegend>
      </Row>
    </Table>
  );
};

export const cardProps = PropTypes.shape({
  action: PropTypes.oneOf(['hit', 'double', 'split', 'stand']),
  surrender: PropTypes.bool,
  tooltip: PropTypes.string,
  tooltipForceRight: PropTypes.bool,
});

export const handProps = PropTypes.shape({
  key: PropTypes.string,
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

export const blackjackDataProps = PropTypes.shape({
  pairs: PropTypes.objectOf(handProps),
  hard: PropTypes.objectOf(handProps),
  soft: PropTypes.objectOf(handProps),
});

BlackjackTable.propTypes = {
  blackjackData: blackjackDataProps,
};

export default BlackjackTable;

export const computeActionColor = (action, colors) => {
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
      return 'transparent';
  }
};

const Table = styled.div`
  line-height: ${rem(20)};
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
  background-color: ${({ theme, $action }) =>
    computeActionColor($action, theme.colors)};
  color: ${({ theme, $action }) =>
    $action === 'stand' ? theme.colors.white : theme.colors.black};
  flex: 1 1 auto;

  @media screen and (min-width: ${rem(768)}) {
    min-width: ${rem(50)};
  }

  &:first-child {
    border-top-left-radius: ${rem(3)};
    border-bottom-left-radius: ${rem(3)};
  }

  &:last-child {
    border-top-right-radius: ${rem(3)};
    border-bottom-right-radius: ${rem(3)};
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
  background-color: ${({ $hovered }) => ($hovered ? 'teal' : 'inherit')};
  color: ${({ $hovered, theme }) =>
    $hovered ? theme.colors.white : 'inherit'};
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -moz-tap-highlight-color: rgba(0, 0, 0, 0);

  :focus {
    outline: none;
  }

  @media screen and (min-width: ${rem(768)}) {
    min-width: ${rem(50)};
  }
`;

const HandIdentifiers = styled.div`
  text-align: center;
  position: absolute;
  transform-origin: left;
  border-left: ${({ theme }) => theme.colors.black} ${rem(1)} solid;
  border-right: ${({ theme }) => theme.colors.black} ${rem(1)} solid;
  border-bottom: ${({ theme }) => theme.colors.black} ${rem(1)} solid;

  @media (prefers-color-scheme: dark) {
    border-color: ${({ theme }) => theme.colors.white};
  }
`;

const Pairs = styled(HandIdentifiers)`
  width: ${rem(201)};
  /* stylelint-disable-next-line unit-disallowed-list */
  transform: rotate(-90deg) translate(-230px, -80px);

  @media screen and (min-width: ${rem(768)}) {
    /* stylelint-disable-next-line unit-disallowed-list */
    transform: rotate(-90deg) translate(-230px, -180px);
  }
`;

const Hard = styled(HandIdentifiers)`
  width: ${rem(221)};
  /* stylelint-disable-next-line unit-disallowed-list */
  transform: rotate(-90deg) translate(-450px, -70px);

  @media screen and (min-width: ${rem(768)}) {
    /* stylelint-disable-next-line unit-disallowed-list */
    transform: rotate(-90deg) translate(-450px, -170px);
  }
`;

const Soft = styled(HandIdentifiers)`
  width: ${rem(141)};
  /* stylelint-disable-next-line unit-disallowed-list */
  transform: rotate(-90deg) translate(-590px, -110px);

  @media screen and (min-width: ${rem(768)}) {
    /* stylelint-disable-next-line unit-disallowed-list */
    transform: rotate(-90deg) translate(-590px, -210px);
  }
`;

const BubbleKey = styled.div`
  position: absolute;
  font-size: ${rem(10)};
  line-height: 1.1;
  letter-spacing: -${rem(1)};
  border-radius: ${rem(100)};
  color: ${({ theme }) => theme.colors.softBlack};
  background-color: ${({ theme }) => theme.colors.softWhite};
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  padding: 0 ${rem(4)};
  z-index: 1;
  white-space: nowrap;
`;

const DealerHandValue = styled(BubbleKey)`
  left: 0;
  bottom: 0;
  transform: translate(-50%, 50%);
`;

const PlayerHandValue = styled(BubbleKey)`
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
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
  background-color: ${({ $hovered }) => ($hovered ? 'teal' : 'inherit')};
  color: ${({ $hovered, theme }) =>
    $hovered ? theme.colors.white : 'inherit'};
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -moz-tap-highlight-color: rgba(0, 0, 0, 0);

  :focus {
    outline: none;
  }
`;

const Hand = styled.div`
  border: none;
  padding: 0;
  background-color: ${({ theme, $action }) =>
    computeActionColor($action, theme.colors)};
  text-align: center;
  min-width: ${rem(30)};
  vertical-align: middle;
  font-size: ${rem(16)};
  color: ${({ theme, $action }) =>
    $action === 'stand' ? theme.colors.white : theme.colors.black};
  position: relative;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -moz-tap-highlight-color: rgba(0, 0, 0, 0);

  :focus {
    outline: none;
  }

  @media screen and (min-width: ${rem(768)}) {
    min-width: ${rem(50)};
  }
`;

const Sup = styled.sup`
  font-size: ${rem(12)};
  margin-top: ${rem(-4)};
  display: inline-block;
  vertical-align: top;
`;
