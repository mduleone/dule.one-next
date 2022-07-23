import { useContext } from 'react';

import BlackjackTrainingContext from '~/components/context/blackjack-training';

const useBlackjackTraining = () => {
  const value = useContext(BlackjackTrainingContext);

  return value;
};

export default useBlackjackTraining;
