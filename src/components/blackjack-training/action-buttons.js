import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { HIT, STAND, DOUBLE, SPLIT } from '~/util/blackjack';
import useBlackjackTraining from '~/hooks/use-blackjack-training';
import { rem } from '~/util/style/lengths';

const ActionButtons = () => {
  const { showLastWrongAction, showSettings, act, isPair, wrongAction } =
    useBlackjackTraining();

  return (
    <Actions>
      <Hit
        disabled={showSettings || wrongAction || showLastWrongAction}
        type="button"
        onClick={() => act(HIT)}
      >
        Hit
        <DesktopDiv>
          <KeyboardIcon icon={['far', 'keyboard']} /> H
        </DesktopDiv>
      </Hit>
      <Stand
        disabled={showSettings || wrongAction || showLastWrongAction}
        type="button"
        onClick={() => act(STAND)}
      >
        Stand
        <DesktopDiv>
          <KeyboardIcon icon={['far', 'keyboard']} /> S
        </DesktopDiv>
      </Stand>
      <Double
        disabled={showSettings || wrongAction || showLastWrongAction}
        type="button"
        onClick={() => act(DOUBLE)}
      >
        Double
        <DesktopDiv>
          <KeyboardIcon icon={['far', 'keyboard']} /> D
        </DesktopDiv>
      </Double>
      <Split
        disabled={!isPair || showSettings || wrongAction || showLastWrongAction}
        type="button"
        onClick={() => act(SPLIT)}
      >
        Split
        <DesktopDiv>
          <KeyboardIcon icon={['far', 'keyboard']} /> P
        </DesktopDiv>
      </Split>
    </Actions>
  );
};

export default ActionButtons;

ActionButtons.propTypes = {};

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

  :focus {
    box-shadow: 0 0 ${rem(1)} ${rem(3)} rgba(59, 153, 252, 0.7);
    box-shadow: 0 0 0 ${rem(3)} activeborder; /* Blink, Chrome */
    box-shadow: 0 0 0 ${rem(3)} -moz-mac-focusring; /* Firefox */
    outline: -webkit-focus-ring-color auto ${rem(1)};
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

const DesktopDiv = styled.div`
  font-size: ${rem(16)};
  justify-content: center;
  align-items: center;
  display: none;

  @media screen and (min-width: ${rem(768)}) {
    display: flex;
  }
`;

const KeyboardIcon = styled(FontAwesomeIcon)`
  margin-right: ${rem(6)};
`;
