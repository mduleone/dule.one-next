import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Layout from '../../components/layout';
import contacts from '../../data/contacts';

import styles from './index.module.scss';

export const getStaticProps = () => ({
  props: {
    contacts,
  },
});

const Contact = ({ contacts = [] }) => {
  return (
    <Layout>
      <ul className={styles['contact-list']}>
        {contacts.map(({ href, icon, name}) => (
          <li key={`${icon.join('-')}-${name}`}>
            <a target="_blank" rel="noopener noreferrer" href={href}>
              <FontAwesomeIcon className={styles.icon} icon={icon} />
              {' '}
              {name}
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

Contact.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.arrayOf(PropTypes.string),
    href: PropTypes.string,
    name: PropTypes.string,
  })),
};

Contact.defaultProps = {
  contacts: [],
};

export default Contact;
