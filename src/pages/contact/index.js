import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import Layout from '../../components/layout';
import contacts from '../../data/contacts';
import { rem } from '../../util/style/lengths';

export const getStaticProps = () => ({
  props: {
    contacts,
  },
});

const Contact = ({ contacts = [] }) => (
  <Layout>
    <Container>
      {contacts.map(({ href, icon, name }) => (
        <li key={`${icon.join('-')}-${name}`}>
          <ContactItem target="_blank" rel="noopener noreferrer" href={href}>
            <ContactName>{name}</ContactName>
            <Icon icon={icon} />
          </ContactItem>
        </li>
      ))}
    </Container>
  </Layout>
);

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

const Container = styled.ul`
  list-style: none;
`;

const ContactItem = styled.a`
  position: relative;
`;

const ContactName = styled.span`
  margin-left: ${rem(24)};
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.black};
  position: absolute;
  vertical-align: middle;
  width: ${rem(16)};
  left: 0;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.softWhite};
  }
`;
