// import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { useEffect, useMemo, useState } from 'react';

import PlayingCard from '~/components/playing-card';
import CountQuiz from '~/components/blackjack-training/count-quiz';
import useBlackjackTraining from '~/hooks/use-blackjack-training';
import useInterval from '~/hooks/use-interval';
import useWindowResize from '~/hooks/use-window-resize';
import { rem } from '~/util/style/lengths';
import { randNaturalNumber } from '~/util/number';

const CountingPractice = () => {
  const [playedCards, setPlayedCards] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [sinceLastQuiz, setSinceLastQuiz] = useState(0);
  const [sinceLastWrong, setSinceLastWrong] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const { shoe, dealCard, countInterval, quizInterval, showSettings, track } =
    useBlackjackTraining();
  const { width } = useWindowResize();

  const offsetMultiplier = useMemo(() => {
    if (width < 326) {
      return 0.1;
    }
    if (width < 430) {
      return 0.25;
    }
    if (width < 768) {
      return 0.5;
    }
    return 1;
  }, [width]);

  const dealNextCard = () => {
    const nextCard = dealCard();
    const len = shoe.length;
    setPlayedCards((p) => [
      ...p,
      {
        key: len,
        card: nextCard,
        rotation: randNaturalNumber(40) - 20,
        offset: randNaturalNumber(200) - 100,
      },
    ]);
    setSinceLastQuiz((c) => c + 1);
  };

  useEffect(() => {
    if (sinceLastQuiz >= Number(quizInterval)) {
      setIsRunning(false);
      setTimeout(() => setShowQuiz(true), countInterval);
    }
  }, [sinceLastQuiz, quizInterval, countInterval]);

  useInterval(
    dealNextCard,
    isRunning && countInterval > 0 ? countInterval : null,
  );

  const toggleTraining = () => {
    const next = !isRunning;

    if (next) {
      dealNextCard();
    }
    if (!next && quizInterval === Infinity) {
      setShowQuiz(true);
    }

    track(`${next ? 'start' : 'pause'} count training session`);
    setIsRunning(next);
  };

  const clearQuiz = () => {
    setSinceLastQuiz(0);
    setShowQuiz(false);
  };

  return (
    <>
      <HandContainer>
        <Hand>
          <StaticCardContainer>
            <PlayingCard card="joker" />
          </StaticCardContainer>
          {playedCards.slice(-10).map(({ card, rotation, offset, key }) => (
            <CardContainer
              key={key}
              $rotation={rotation}
              $interval={countInterval}
              $offset={offset * offsetMultiplier}
            >
              <PlayingCard card={card} />
            </CardContainer>
          ))}
          {showQuiz && (
            <CountQuiz
              clearQuiz={clearQuiz}
              sinceLastWrong={sinceLastWrong}
              setSinceLastWrong={setSinceLastWrong}
              sinceLastQuiz={sinceLastQuiz}
              setSinceLastQuiz={setSinceLastQuiz}
            />
          )}
        </Hand>
      </HandContainer>
      <ActionButton
        type="button"
        onClick={toggleTraining}
        disabled={showSettings || showQuiz}
      >
        {isRunning ? 'Pause' : 'Start/resume'} training round
      </ActionButton>
    </>
  );
};

CountingPractice.propTypes = {};

export default CountingPractice;

const HandContainer = styled.div`
  margin-top: ${rem(50)};
  text-align: center;
`;

const Hand = styled.div`
  position: relative;
  min-height: ${rem(350)};

  @media screen and (min-width: ${rem(326)}) {
    min-height: ${rem(420)};
  }

  @media screen and (min-width: ${rem(768)}) {
    min-height: ${rem(450)};
  }
`;

const rotationKeyframes = ({ $rotation, $offset }) => keyframes`
  from {
    transform: translateX(calc(-50% + ${rem($offset)})) rotate(${$rotation}deg);
  }

  to {
    transform: translateX(-50%) rotate(0);
  }
`;

const StaticCardContainer = styled.div`
  position: absolute;
  top: 0;
  width: ${rem(175)};
  display: inline-block;
  transform: translateX(-50%);

  @media screen and (min-width: ${rem(400)}) {
    width: ${rem(225)};
  }

  @media screen and (min-width: ${rem(768)}) {
    width: ${rem(300)};
  }
`;

const CardContainer = styled(StaticCardContainer)`
  transform: ${({ $rotation, $offset }) =>
    `translateX(calc(-50% + ${rem($offset)})) rotate(${$rotation}deg)`};
  animation: ${rotationKeyframes}
    ${({ $interval }) => Math.floor((3 / 2) * $interval)}ms linear
    ${({ $interval }) => 4 * $interval}ms forwards;
`;

const ActionButton = styled.button`
  background-color: ${({ theme }) => theme.colors.softWhite};
  color: ${({ theme }) => theme.colors.softBlack};
  display: block;
  font-size: ${rem(16)};
  font-family: ${({ theme }) => theme.fonts.screenFont};
  font-weight: bold;
  text-align: center;
  border-radius: ${rem(6)};
  cursor: pointer;
  outline: none;
  border: none;
  margin: 0 auto;
  padding: ${rem(8)};

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

  @media screen and (min-width: ${rem(400)}) {
    width: 100%;
    margin-top: ${rem(20)};
    height: ${rem(100)};
  }

  @media screen and (min-width: ${rem(768)}) {
    margin-top: ${rem(30)};
    font-size: ${rem(19)};
    height: ${rem(100)};
  }

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.softBlack};
  }
`;
