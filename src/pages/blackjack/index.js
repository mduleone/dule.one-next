import PropTypes from 'prop-types';

import blackjackData from '~/data/blackjack';
import Layout from '~/components/layout';
import BlackjackTable, { handProps } from '~/components/blackjack-table';

const entryKeySort = ([a], [b]) => {
  const parsedIntA = parseInt(a, 10);
  const parsedIntB = parseInt(b, 10);
  if (!Number.isNaN(parsedIntA) && !Number.isNaN(parsedIntB)) {
    return parsedIntB - parsedIntA;
  }

  if (b > a) {
    return 1;
  }
  if (b < a) {
    return -1;
  }
  return 0;
};

const Blackjack = ({ hands, headers }) => (
  <Layout>
    <BlackjackTable hands={hands} headers={headers} />
  </Layout>
);

Blackjack.propTypes = {
  hands: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, handProps])),
  ),
  headers: PropTypes.arrayOf(PropTypes.string),
};

export const getStaticProps = () => {
  const hands = [
    ...Object.entries(blackjackData.pairs)
      .sort(entryKeySort)
      .map(([key, hand]) => [`${key} ${key}`, hand]),
    ...Object.entries(blackjackData.hard).sort(entryKeySort),
    ...Object.entries(blackjackData.soft).sort(entryKeySort),
  ];
  const headers = Object.entries(hands[0][1])
    .filter(([key]) => key !== 'key')
    .sort(entryKeySort)
    .map(([el]) => el);

  return {
    props: {
      hands,
      headers,
    },
  };
};

export default Blackjack;
