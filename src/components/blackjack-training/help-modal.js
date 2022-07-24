import styled from 'styled-components';
import PropTypes from 'prop-types';

import useBlackjackTraining from '~/hooks/use-blackjack-training';
import { getHandKey, getDealerKey } from '~/util/blackjack';
import { rem } from '~/util/style/lengths';
import { hitSoft17, standSoft17 } from '~/data/blackjack';
import Modal from '~/components/modal';
import BlackjackTable from '~/components/blackjack-table';

const HelpModal = ({ isOpen, onClose }) => {
  const { playerHand, dealerCard, dealerHitSoft17, trainCount } =
    useBlackjackTraining();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {trainCount ? (
        <>
          <ChartTitle>Counting Strategy</ChartTitle>
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
        </>
      ) : (
        <>
          <ChartTitle>
            Basic Strategy - {dealerHitSoft17 ? 'Hit' : 'Stand'} Soft 17
          </ChartTitle>
          <BlackjackTable
            blackjackData={dealerHitSoft17 ? hitSoft17 : standSoft17}
            highlight={
              playerHand && dealerCard && !trainCount
                ? `${getHandKey(playerHand)}:${getDealerKey(dealerCard)}`
                : null
            }
          />
        </>
      )}
    </Modal>
  );
};

HelpModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default HelpModal;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ $noMb }) => ($noMb ? 0 : rem(4))};
  padding: 0;
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.screenFont};
`;

const CenterRow = styled(FlexRow)`
  justify-content: center;
`;

const ChartTitle = styled.h1`
  font-size: ${rem(24)};
  font-family: ${({ theme }) => theme.fonts.screenFont};
  text-align: center;
`;
