import useBlackjackTraining from '~/hooks/use-blackjack-training';
import PlayPractice from '~/components/blackjack-training/play-practice';
import CountingPractice from '~/components/blackjack-training/counting-practice';

const GameBoard = () => {
  const { trainCount } = useBlackjackTraining();

  return trainCount ? <CountingPractice /> : <PlayPractice />;
};

export default GameBoard;
