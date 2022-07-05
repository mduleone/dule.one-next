import styled from 'styled-components';
import PropTypes from 'prop-types';

import { computeActionColor } from '~/components/blackjack-table';
import { getCardValue } from '~/util/blackjack';
import { rem } from '~/util/style/lengths';

const WrongAction = ({
  clearWrongAction,
  streak,
  dealerCard,
  playerHand,
  playerAction,
  correctAction,
  resetCountOnLoss,
  count,
}) => (
  <>
    <TransparentScreenOverlay role="button" onClick={clearWrongAction} />
    <Container>
      <WrongTitle>Not the play</WrongTitle>
      {streak > 0 && (
        <WrongContent>You had a {streak}-hand long streak</WrongContent>
      )}
      <WrongContent>
        Dealer showed{' '}
        {[dealerCard]
          .map(getCardValue)
          .map((c) => (c === 11 ? 'A' : c))
          .join()}
      </WrongContent>
      <WrongContent>
        Your hand was{' '}
        {playerHand
          .map(getCardValue)
          .map((c) => (c === 11 ? 'A' : c))
          .join('-')}
      </WrongContent>
      <WrongContent>
        You played <Action $action={playerAction}>{playerAction}</Action>
      </WrongContent>
      <WrongContent>
        The correct play was{' '}
        <Action $action={correctAction}>{correctAction}</Action>
      </WrongContent>
      {resetCountOnLoss && (
        <>
          <WrongContent>The count was {count}</WrongContent>
          <WrongContent>Resetting the count to 0</WrongContent>
        </>
      )}
      <SettingsButton type="button" onClick={clearWrongAction}>
        Got it
      </SettingsButton>
    </Container>
  </>
);

export default WrongAction;

WrongAction.propTypes = {
  clearWrongAction: PropTypes.func.isRequired,
  streak: PropTypes.number.isRequired,
  dealerCard: PropTypes.shape({}).isRequired,
  playerHand: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  playerAction: PropTypes.string.isRequired,
  correctAction: PropTypes.string.isRequired,
  resetCountOnLoss: PropTypes.bool.isRequired,
  count: PropTypes.number.isRequired,
};

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: ${rem(6)};
  border: ${rem(1)} solid ${({ theme }) => theme.colors.softBlack};
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${rem(16)};
  display: flex;
  flex-direction: column;
  z-index: 901;

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.softBlack};
    border-color: ${({ theme }) => theme.colors.softWhite};
  }
`;

const WrongTitle = styled.h1`
  color: ${({ theme }) => theme.colors.duleoneRed};
  text-align: center;
`;

const Action = styled.span`
  background-color: ${({ theme, $action }) =>
    computeActionColor($action, theme.colors)};
  color: ${({ theme, $action }) =>
    $action === 'stand' ? theme.colors.white : theme.colors.black};
  padding: ${rem(3)};
  border-radius: ${rem(3)};
`;

const WrongContent = styled.div`
  line-height: 1.5;

  :last-of-type {
    flex: 1 1 auto;
  }
`;

const TransparentScreenOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 900;
`;

const SettingsButton = styled.button`
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
  font-size: ${rem(16)};
  font-family: ${({ theme }) => theme.fonts.screenFont};
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.softWhite};
  border-radius: ${rem(3)};
  display: block;
  text-align: center;
  width: 100%;

  & + & {
    margin-top: ${rem(8)};
  }

  :disabled {
    opacity: 40%;
    cursor: not-allowed;
  }

  @media screen and (min-width: ${rem(768)}) {
    font-size: ${rem(19)};
  }
`;
