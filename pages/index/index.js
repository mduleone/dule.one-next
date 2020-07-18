import Layout from '../../components/layout';
import styles from './index.module.scss';

const Home = () => {
  return (
    <Layout>
      <div className={styles.about}>
        <span className={styles.line}>Software Engineer.</span>
        <span className={styles.line}>Mathematician.</span>
        <span className={styles.line}>Problem Solver.</span>
      </div>
      <div>
        <img alt="DuLeone Coat of Arms" src="/images/duleone.jpg" className={styles.coa} />
      </div>
    </Layout>
  )
}

export default Home;
