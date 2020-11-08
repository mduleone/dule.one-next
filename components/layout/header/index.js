import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';

import Name from '../../name';

export const navLinks = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Projects',
    href: '/projects',
  },
  {
    name: 'Resume',
    href: '/resume',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

const Header = ({ activeLink }) => {
  return (
    <Container>
      <Link href="/">
        <a>
          <Name header imageWidth={30} />
        </a>
      </Link>
      <Nav>
        <NavList>
          {navLinks.map(({ name, href }) => (
            <NavListItem key={name}>
              <Link href={href}>
                <NavListItemLink active={activeLink.href === href}>
                  {name}
                </NavListItemLink>
              </Link>
            </NavListItem>
          ))}
        </NavList>
      </Nav>
    </Container>
  );
};

Header.propTypes = {
  activeLink: PropTypes.shape({
    name: PropTypes.string,
    href: PropTypes.string,
  }).isRequired,
};

export default Header;

const Container = styled.header`
  background: white;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  font-size: 19px;
  padding: .5em;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  @media only screen and (min-width: 363px) {
    font-size: 25px;
  }

  @media only screen and (min-width: 520px) {
    flex-direction: row;
    font-size: 19px;
  }

  @media only print {
    margin: 0;
    padding: 0;
    position: static;
    display: block;
    border-bottom: 1px solid #ccc;
  }
`;

const Nav = styled.nav`
  width: 100%;

  @media only screen and (min-width: 520px) {
    width: auto;
  }

  @media only print {
    display: none;
    visibility: hidden;
  }
`;

const NavList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-evenly;
`;

const NavListItem = styled.li`
  display: inline-block;
  position: relative;

  @media only screen and (min-width: 363px) {
    margin: 0 0;
  }

  @media only screen and (min-width: 520px) {
    padding: 0 0.5em;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  }

  &:not(:first-child)::after {
    content: none;
    background-color: ${({ theme }) => theme.colors.black};
    border-radius: 50%;
    height: 5px;
    width: 5px;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%, -50%);

    @media only screen and (min-width: 520px) {
      content: '';
    }
  }
`;

const NavListItemLink = styled.a`
  text-decoration: none;
  position: relative;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    transform: scaleX(${({ active }) => active ? 1 : 0});
    background-color: ${({ theme }) => theme.colors.linkColor};
    transition: transform linear 250ms;
    transform-origin: right;
  }

  &:hover,
  &:focus {
    &:after {
      transform: scaleX(1);
      transition: transform linear 250ms;
      transform-origin: left;
    }
  }
`;
