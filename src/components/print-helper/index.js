import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PrintHelper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <Container>
      {isOpen && <Mask onClick={close} aria-role="button" />}
      <Button onClick={toggleOpen} type="button">
        <span>
          <Icon icon={['fas', 'print']} />
          <PrintCopy>
            Print
          </PrintCopy>
        </span>
      </Button>
      {isOpen && (
        <PopUp>
          Do you want to print my resume? Need a PDF version?
          <br /><br />
          <PrintButton onClick={() => window.print()}>Simply print this page! (click here)</PrintButton>
          <br /><br />
          I've found the best version prints from Google Chrome on macOS.
          <Triangle xmlns="http://www.w3.org/2000/svg" viewBox="0,0,80,80">
            <defs>
              <filter id="shadow">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="darkslategray"/>
              </filter>
            </defs>
            <polygon points="0,0 40,40 80,0" style={{ filter: 'url(#shadow)' }} />
          </Triangle>
        </PopUp>
      )}
    </Container>
  );
};

export default PrintHelper;

const Container = styled.div`
  position: fixed;
  right: 1em;
  bottom: 3em;

  @media only screen and (min-width: 768px) {
    bottom: 5em;
  }

  @media only print {
    display: none;
  }
`;

const PrintCopy = styled.span`
  display: none;
  margin-left: 8px;

  @media only screen and (min-width: 768px) {
    display: inline;
  }
`;

const PopUp = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  bottom: calc(100% + 20px);
  box-shadow: 0 0 5px ${({ theme }) => theme.colors.shadowColor};
  min-width: 210px;
  position: absolute;
  right: 0;
  padding: 0.5em;
  text-align: center;
`;

const Mask = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Triangle = styled.svg`
  position: absolute;
  bottom: initial;
  top: calc(100% - 1px);
  right: 3px;
  width: 30px;
  height: 30px;

  & > polygon {
    fill: #fff;
    stroke: #fff;
    stroke-width: 2px;
  }
`;

const PrintButton = styled.button`
  appearance: none;
  -webkit-appearance: none;
  border-width: 0;
  border-radius: 0;
  background-color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: 100%;
  display: inline;
  padding: 3px;
  margin: 0;
  box-shadow: 0 0 3px ${({ theme }) => theme.colors.shadowColor};
  border-radius: 6px;
  cursor: pointer;
`;

const Button = styled.button`
  appearance: button;
  -webkit-appearance: button;
  border-color: ${({ theme }) => theme.colors.shadowColor};
  border-width: 1px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  cursor: pointer;
  max-width: 100px;
  animation: bounce 5s infinite;
  padding: 8px;

  @keyframes bounce {
    0%, 10%, 100% {
      transform: translateY(0);
    }

    5% {
      transform: translateY(1px);
    }

    1%, 4% {
      transform: translateY(-3px);
    }

    2%, 3% {
      transform: translateY(-5px);
    }

    6%, 9% {
      transform: translateY(-1px);
    }

    8%, 7% {
      transform: translateY(-2px);
    }
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.duleoneRed};
  display: inline;
`;
