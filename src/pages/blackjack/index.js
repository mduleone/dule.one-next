import { hitSoft17 } from '~/data/blackjack';
import Layout from '~/components/layout';
import BlackjackTable from '~/components/blackjack-table';

const Blackjack = () => (
  <Layout>
    <BlackjackTable blackjackData={hitSoft17} />
  </Layout>
);

export default Blackjack;
