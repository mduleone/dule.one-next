import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import useBlackjackTraining from '~/hooks/use-blackjack-training';
import { getHandKey, getDealerKey } from '~/util/blackjack';
import { rem } from '~/util/style/lengths';
import { hitSoft17, standSoft17 } from '~/data/blackjack';
import Modal from '~/components/modal';
import Tooltip from '~/components/tooltip';
import Toggle from '~/components/toggle';
import BlackjackTable from '~/components/blackjack-table';
import StatisticsModal from '~/components/blackjack-training/statistics-modal';
import InfoModal from '~/components/blackjack-training/info-modal';

const FloatingButtons = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const settingsButton = useRef(null);

  const {
    statData,
    initiallyLoaded,
    playerHand,
    dealerCard,
    lastWrongAction,
    track,
    showShoe,
    showCount,
    doublesOnly,
    softOnly,
    dealerHitSoft17,
    resetCountOnLoss,
    toggleDoublesOnly,
    toggleSoftOnly,
    toggleDealerHitsSoft17,
    toggleResetCountOnLoss,
    toggleShowCount,
    toggleShowShoe,
    resetCount,
    resetStreak,
    setShowLastWrongAction,
    showSettings,
    setShowSettings,
  } = useBlackjackTraining();

  useEffect(() => {
    if (showSettings) {
      const onClickOutside = (e) => {
        if (!settingsButton.current.contains(e.target)) {
          e.stopPropagation();
          e.preventDefault();
          setShowSettings(false);
        }
      };

      window.addEventListener('click', onClickOutside);

      return () => window.removeEventListener('click', onClickOutside);
    }

    return () => {};
  }, [showSettings, settingsButton.current]);

  return (
    <>
      <FloatingButtonsContainer $showLastWrongButton={Boolean(lastWrongAction)}>
        {Boolean(lastWrongAction) && (
          <FloatingButtonContainer>
            <FloatingButton
              onClick={() => {
                track('see last wrong action');
                setShowLastWrongAction((p) => !p);
              }}
              type="button"
              aria-label="show last wrong action"
            >
              <Icon icon={['fas', 'undo']} />
            </FloatingButton>
          </FloatingButtonContainer>
        )}
        <FloatingButtonContainer>
          <FloatingButton
            onClick={() => setShowInfo((p) => !p)}
            type="button"
            aria-label="show info modal"
          >
            <Icon icon={['fas', 'info-circle']} />
          </FloatingButton>
        </FloatingButtonContainer>
        <FloatingButtonContainer>
          <FloatingButton
            onClick={() => setShowStats((p) => !p)}
            type="button"
            aria-label="show statistics"
          >
            <Icon icon={['fas', 'chart-bar']} />
          </FloatingButton>
        </FloatingButtonContainer>
        <FloatingButtonContainer>
          <FloatingButton
            onClick={() => setShowChart((p) => !p)}
            type="button"
            aria-label="action table"
          >
            <Icon icon={['fas', 'table']} />
          </FloatingButton>
        </FloatingButtonContainer>
        <FloatingButtonContainer ref={settingsButton}>
          <FloatingButton
            onClick={() => setShowSettings((p) => !p)}
            type="button"
            aria-label="open settings"
          >
            <Icon icon={['fas', 'cog']} />
          </FloatingButton>
          <Tooltip show={showSettings} horizontal="left" vertical="top">
            <SettingsTitle>Settings</SettingsTitle>
            <FlexRow>
              <ToggleLabel htmlFor="pairs-only">Pairs only?</ToggleLabel>
              <Toggle
                cbId="pairs-only"
                isOn={doublesOnly}
                onClick={toggleDoublesOnly}
              />
            </FlexRow>
            <FlexRow>
              <ToggleLabel htmlFor="soft-only">Soft only?</ToggleLabel>
              <Toggle
                cbId="soft-only"
                isOn={softOnly}
                onClick={toggleSoftOnly}
              />
            </FlexRow>
            <FlexRow>
              <ToggleLabel htmlFor="hit-soft-17">
                Dealer hits soft 17?
              </ToggleLabel>
              <Toggle
                cbId="hit-soft-17"
                isOn={dealerHitSoft17}
                onClick={toggleDealerHitsSoft17}
              />
            </FlexRow>
            <FlexRow>
              <ToggleLabel htmlFor="reset-count">
                Reset count on loss?
              </ToggleLabel>
              <Toggle
                cbId="reset-count"
                isOn={resetCountOnLoss}
                onClick={toggleResetCountOnLoss}
              />
            </FlexRow>
            <FlexRow>
              <ToggleLabel htmlFor="show-count">Show count?</ToggleLabel>
              <Toggle
                cbId="show-count"
                isOn={showCount}
                onClick={toggleShowCount}
              />
            </FlexRow>
            <FlexRow>
              <ToggleLabel htmlFor="show-shoe">Show shoe?</ToggleLabel>
              <Toggle
                cbId="show-shoe"
                isOn={showShoe}
                onClick={toggleShowShoe}
              />
            </FlexRow>
            <SettingsButton type="button" onClick={resetCount}>
              Reset Count
            </SettingsButton>
            <SettingsButton type="button" onClick={resetStreak}>
              Reset Streak
            </SettingsButton>
          </Tooltip>
        </FloatingButtonContainer>
      </FloatingButtonsContainer>
      <InfoModal showInfo={showInfo} onClose={() => setShowInfo(false)} />
      <StatisticsModal
        showStats={showStats}
        onClose={() => setShowStats(false)}
        statData={statData}
      />
      <Modal isOpen={showChart} onClose={() => setShowChart(false)}>
        <ChartTitle>
          Basic Strategy - {dealerHitSoft17 ? 'Hit' : 'Stand'} Soft 17
        </ChartTitle>
        <BlackjackTable
          blackjackData={dealerHitSoft17 ? hitSoft17 : standSoft17}
          highlight={
            initiallyLoaded
              ? `${getHandKey(playerHand)}:${getDealerKey(dealerCard)}`
              : null
          }
        />
      </Modal>
    </>
  );
};

FloatingButtons.propTypes = {};

export default FloatingButtons;

const SettingsTitle = styled.h1`
  margin-top: 0;
  font-size: ${rem(20)};
  font-family: ${({ theme }) => theme.fonts.screenFont};
  text-align: center;
`;

const FloatingButtonsContainer = styled.div`
  position: fixed;
  right: ${rem(19)};
  bottom: ${rem(19 + 23.75)};
  z-index: 900;

  @media only screen and (min-width: ${rem(1144)}) {
    transform: translateX(
      calc(
        -50% + ${({ $showLastWrongButton }) => rem(768 / 2 + 19 * 2 + ($showLastWrongButton ? 239 : 217))}
      )
    );
    right: 50%;
  }

  @media only print {
    display: none;
  }
`;

const FloatingButtonContainer = styled.span`
  display: inline-block;

  & + & {
    margin-left: ${rem(8)};
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.duleoneRed};
  display: inline;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.inverseDuleoneRed};
  }
`;

const FloatingButton = styled.button`
  appearance: button;
  /* stylelint-disable-next-line property-no-vendor-prefix */
  -webkit-appearance: button;
  border-color: ${({ theme }) => theme.colors.shadowColor};
  border-width: ${rem(1)};
  border-radius: ${rem(6)};
  background-color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  cursor: pointer;
  height: ${rem(37)};
  padding: ${rem(8)};

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.softBlack};
    color: ${({ theme }) => theme.colors.softWhite};
    border-color: ${({ theme }) => theme.colors.inverseShadowColor};
  }
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

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${rem(4)};
  text-align: left;
  font-family: ${({ theme }) => theme.fonts.screenFont};
`;

const ToggleLabel = styled.label`
  margin-right: ${rem(8)};
`;

const ChartTitle = styled.h1`
  font-size: ${rem(24)};
  font-family: ${({ theme }) => theme.fonts.screenFont};
  text-align: center;
`;
