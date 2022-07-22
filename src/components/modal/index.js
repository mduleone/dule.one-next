import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FocusTrap from 'focus-trap-react';

import ClientOnlyPortal from '~/components/client-only-portal';
import { rem } from '~/util/style/lengths';

const Modal = ({
  isOpen,
  onClose,
  width = 640,
  desktopMaxHeight = null,
  children,
}) => {
  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  if (!isOpen) {
    return null;
  }
  return (
    <ClientOnlyPortal>
      <FocusTrap focusTrapOptions={{ initialFocus: false }}>
        <Container>
          <Overlay onClick={onClose} />
          <Content
            role="dialog"
            aria-modal="true"
            $width={width}
            $maxHeight={desktopMaxHeight}
          >
            {children}
            <CloseButton onClick={onClose}>
              <CloseIcon icon={['fas', 'times']} />
            </CloseButton>
          </Content>
        </Container>
      </FocusTrap>
    </ClientOnlyPortal>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  width: PropTypes.number,
  desktopMaxHeight: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;

const Container = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  position: fixed;
  display: flex;
  z-index: 900;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
`;

const Content = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: ${rem(16)};
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.softBlack};
  }

  @media screen and (min-width: ${rem(768)}) {
    padding: ${rem(48)};
    width: ${({ $width }) => rem($width)};
    height: auto;
    max-height: ${({ $maxHeight }) => ($maxHeight ? rem($maxHeight) : '100vh')};
    border-radius: ${rem(6)};
    margin: 0 auto;
    align-self: center;
    box-shadow: 0 0 ${rem(5)} ${({ theme }) => theme.colors.shadowColor};

    @media (prefers-color-scheme: dark) {
      box-shadow: 0 0 ${rem(5)}
        ${({ theme }) => theme.colors.inverseShadowColor};
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  background-color: transparent;
  outline: none;
  border: none;
  top: ${rem(18)};
  right: ${rem(25)};
  cursor: pointer;

  :focus {
    outline: -webkit-focus-ring-color auto ${rem(1)};
  }
`;

export const CloseIcon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.softBlack};
  font-size: ${rem(24)};
  transition: color 0.1s;

  &:hover {
    color: #000;
  }

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.softWhite};

    &:hover {
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;
