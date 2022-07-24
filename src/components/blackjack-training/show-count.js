import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Tooltip from '~/components/tooltip';
import { rem } from '~/util/style/lengths';
import useBlackjackTraining from '~/hooks/use-blackjack-training';

const ShowCount = () => {
  const countTooltipButton = useRef(null);
  const [showCountTooltip, setShowCountTooltip] = useState(false);
  const { count, showCount } = useBlackjackTraining();
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

  return (
    showCount && (
      <div>
        <QuestionButtonContainer
          ref={countTooltipButton}
          onClick={() => setShowCountTooltip((p) => !p)}
        >
          <FontAwesomeIcon icon={['far', 'question-circle']} />
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
        </QuestionButtonContainer>
        Running Count: {count}
      </div>
    )
  );
};

export default ShowCount;

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
  border-radius: 100%;

  :focus {
    box-shadow: 0 0 ${rem(1)} ${rem(3)} rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 ${rem(3)} activeborder; /* Blink, Chrome */
    box-shadow: 0 0 0 ${rem(3)} -moz-mac-focusring; /* Firefox */
  }
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 0;
  padding: 0;
  margin-bottom: ${rem(4)};
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.screenFont};
`;

const CenterRow = styled(FlexRow)`
  justify-content: center;
`;
