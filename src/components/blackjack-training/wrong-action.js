import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

import { computeActionColor } from '~/components/blackjack-table';
import { getCardValue } from '~/util/blackjack';
import { rem } from '~/util/style/lengths';
import {
  hitSoft17Explanations,
  standSoft17Explanations,
} from '~/data/blackjack';

const WrongAction = ({
  lastWrongAction = false,
  clearWrongAction,
  streak,
  dealerCard,
  playerHand,
  playerAction,
  correctAction,
  resetCountOnLoss,
  count,
  dealerHitSoft17,
  playerHandKey,
  dealerCardKey,
}) => {
  const explanationObject = dealerHitSoft17
    ? hitSoft17Explanations
    : standSoft17Explanations;
  const settingsButtonRef = useRef(null);

  useEffect(() => {
    if (settingsButtonRef.current) {
      settingsButtonRef.current.focus();
    }
  }, [settingsButtonRef.current]);

  return (
    <>
      <TransparentScreenOverlay role="button" onClick={clearWrongAction} />
      <Container>
        <WrongTitle>
          {lastWrongAction ? 'Last wrong play' : 'Not the play'}
        </WrongTitle>
        <WrongContent>
          Dealer {dealerHitSoft17 ? 'hits' : 'stands on'} soft 17
        </WrongContent>
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
        {playerHandKey && dealerCardKey && (
          <WrongContent>
            {explanationObject[playerHandKey][dealerCardKey]}
          </WrongContent>
        )}
        <WrongContent>The count was {count}</WrongContent>
        {resetCountOnLoss && (
          <>
            <WrongContent>Resetting the count to 0</WrongContent>
          </>
        )}
        <SettingsButton
          ref={settingsButtonRef}
          type="button"
          onClick={clearWrongAction}
        >
          Got it
        </SettingsButton>
      </Container>
    </>
  );
};

export default WrongAction;

WrongAction.propTypes = {
  lastWrongAction: PropTypes.bool,
  clearWrongAction: PropTypes.func.isRequired,
  streak: PropTypes.number.isRequired,
  dealerCard: PropTypes.string.isRequired,
  playerHand: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerAction: PropTypes.string.isRequired,
  correctAction: PropTypes.string.isRequired,
  resetCountOnLoss: PropTypes.bool,
  count: PropTypes.number.isRequired,
  dealerHitSoft17: PropTypes.bool.isRequired,
  playerHandKey: PropTypes.string,
  dealerCardKey: PropTypes.string,
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
  z-index: 900;

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
