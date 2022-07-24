import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import FocusTrap from 'focus-trap-react';

import useBlackjackTraining from '~/hooks/use-blackjack-training';
import { rem } from '~/util/style/lengths';

const CountQuiz = ({ clearQuiz }) => {
  const { count } = useBlackjackTraining();
  const [userInput, setUserInput] = useState('');
  const [madeGuess, setMadeGuess] = useState('');
  const quizInputRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (quizInputRef.current) {
      quizInputRef.current.focus();
    }
  }, [quizInputRef.current]);

  const makeGuess = () => {
    setMadeGuess(true);

    if (closeRef.current) {
      setTimeout(() => closeRef.current.focus(), 0);
    }
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter' && userInput !== '') {
      makeGuess();
    }
  };

  return (
    <FocusTrap focusTrapOptions={{ initialFocus: false }}>
      <Container>
        <QuizTitle>What&rsquo;s the count?</QuizTitle>
        <Input
          onKeyPress={onKeyPress}
          disabled={madeGuess}
          ref={quizInputRef}
          type="number"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <QuizContent>
          {madeGuess &&
            (Number(userInput) === count
              ? `That's right! The count was ${count}.`
              : `Not quite! The count was ${count}.`)}
        </QuizContent>
        <Button
          disabled={madeGuess || userInput === ''}
          type="button"
          onClick={makeGuess}
        >
          Guess
        </Button>
        <Button
          ref={closeRef}
          disabled={!madeGuess}
          type="button"
          onClick={clearQuiz}
        >
          Close
        </Button>
      </Container>
    </FocusTrap>
  );
};

export default CountQuiz;

CountQuiz.propTypes = {
  clearQuiz: PropTypes.func.isRequired,
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

const QuizTitle = styled.h1`
  color: ${({ theme }) => theme.colors.duleoneRed};
  text-align: center;
`;

const Button = styled.button`
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
  height: ${rem(60)};

  & + & {
    margin-top: ${rem(16)};
  }

  :disabled {
    opacity: 40%;
    cursor: not-allowed;
  }

  @media screen and (min-width: ${rem(768)}) {
    font-size: ${rem(19)};
  }
`;

const QuizContent = styled.div`
  min-height: ${rem(57)};
  line-height: 1.5;

  :last-of-type {
    flex-grow: 1;
  }

  @media screen and (min-width: ${rem(326)}) {
    min-height: ${rem(28.5)};
  }
`;

const Input = styled.input`
  margin: 0 auto ${rem(8)};
  max-width: ${rem(150)};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.softBlack};
  box-shadow: none;
  padding: ${rem(2)};
  font-size: ${rem(60)};
  border: none;
  border-radius: 0;
  border-bottom: ${rem(2)} ${({ theme }) => theme.colors.softBlack} solid;

  @media screen and (min-width: ${rem(768)}) {
    max-width: ${rem(200)};
    font-size: ${rem(80)};
  }

  @media (prefers-color-scheme: dark) {
    border-color: ${({ theme }) => theme.colors.softWhite};
    background-color: ${({ theme }) => theme.colors.softBlack};
    color: ${({ theme }) => theme.colors.softWhite};
  }

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  [type='number'] {
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -moz-appearance: textfield;
  }
`;
