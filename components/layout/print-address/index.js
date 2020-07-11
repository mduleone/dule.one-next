import styles from './index.module.scss';

const PrintAddress = () => (
  <div className={styles['print-address-container']}>
    <div className={styles['print-address']}>
      <div>Jersey City, NJ</div>
      <a href="mailto:matt@duleone.com">matt@duleone.com</a>
    </div>
  </div>
);

export default PrintAddress;
