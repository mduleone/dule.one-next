import blackjackDataSource from '~/data/blackjack';
import Layout from '~/components/layout';
import BlackjackTable, {
  blackjackDataProps,
} from '~/components/blackjack-table';

const Blackjack = ({ blackjackData }) => (
  <Layout>
    <BlackjackTable blackjackData={blackjackData} />
  </Layout>
);

Blackjack.propTypes = {
  blackjackData: blackjackDataProps,
};

export const getStaticProps = () => ({
  props: {
    blackjackData: blackjackDataSource,
  },
});

export default Blackjack;
