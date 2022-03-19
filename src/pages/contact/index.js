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
        <ContactListItem key={`${icon.join('-')}-${name}`}>
          <ContactItem target="_blank" rel="noopener noreferrer" href={href}>
            <ContactName>{name}</ContactName>
            <Icon icon={icon} />
          </ContactItem>
        </ContactListItem>
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
  padding: 0;
`;

const ContactListItem = styled.li`
  margin-bottom: ${rem(24)};
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.black};
  position: absolute;
  vertical-align: middle;
  width: ${rem(16)};
  left: ${rem(24)};

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.softWhite};
  }
`;

const ContactItem = styled.a`
  position: relative;
  display: block;
  border: ${rem(1.5)} ${({ theme }) => theme.colors.black} solid;
  border-radius: ${rem(6)};
  padding: ${rem(16)} ${rem(24)};
  margin: 0 auto;
  transition: all 0.25s;

  :focus,
  :hover {
    background-color: ${({ theme }) => theme.colors.duleoneRed};
    color: ${({ theme }) => theme.colors.white};
    border: ${rem(1.5)} ${({ theme }) => theme.colors.black} solid;

    & ${Icon} {
      color: ${({ theme }) => theme.colors.softWhite};
    }

    @media (prefers-color-scheme: dark) {
      border: ${rem(1.5)} ${({ theme }) => theme.colors.softWhite} solid;
    }
  }

  @media (prefers-color-scheme: dark) {
    border-color: ${({ theme }) => theme.colors.softWhite};
  }
`;

const ContactName = styled.span`
  margin-left: ${rem(32)};
`;
