import styled from 'styled-components';
import PropTypes from 'prop-types';

import Modal from '~/components/modal';
import { rem } from '~/util/style/lengths';
import { computeActionColor, entryKeySort } from '~/components/blackjack-table';
import {
  getCorrectActionHitSoft17,
  getCorrectActionStandSoft17,
  getHandValue,
  HIT,
  STAND,
  SPLIT,
  DOUBLE,
  parseLossKey,
} from '~/util/blackjack';
import { round } from '~/util/number';

const StatisticsModal = ({ showStats, onClose, statData }) => {
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
    <Modal isOpen={showStats} onClose={onClose}>
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
              {statData.doublesOnlyStreaks > 0 ? renderedDoublesAverage : '--'}
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
                                  <Action $action={key}>{key}</Action>: {value}
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
  );
};

StatisticsModal.propTypes = {
  showStats: PropTypes.bool.isRequired,
  statData: PropTypes.shape({
    longestStreak: PropTypes.number,
    lastStreak: PropTypes.number,
    streaks: PropTypes.number,
    streakTotals: PropTypes.number,
    doublesOnlyTotals: PropTypes.number,
    doublesOnlyStreaks: PropTypes.number,
    softOnlyTotals: PropTypes.number,
    softOnlyStreaks: PropTypes.number,
    losses: PropTypes.objectOf(
      PropTypes.shape({
        [HIT]: PropTypes.number,
        [STAND]: PropTypes.number,
        [SPLIT]: PropTypes.number,
        [DOUBLE]: PropTypes.number,
      }),
    ),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default StatisticsModal;

const ChartTitle = styled.h1`
  font-size: ${rem(24)};
  font-family: ${({ theme }) => theme.fonts.screenFont};
  text-align: center;
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
