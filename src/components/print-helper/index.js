import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { rem } from '../../util/style/lengths';
import theme from '../../util/theme';
import track from '../../util/track';

const PrintHelper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [didOpen, setDidOpen] = useState(false);
  const [svgDropShadow, setSvgDropShadow] = useState(theme.colors.shadowColor);
  const close = () => {
    track('[resume] close print helper');
    setIsOpen(false);
  }

  const clickButton = () => {
    if (!didOpen) {
      setDidOpen(true);
    }
    setIsOpen((prev) => !prev);
    track('[resume] toggle print helper');
  };

  const clickPrint = () => {
    track('[resume] click print from helper');
    window.print();
  };

  useEffect(() => {
    const listener = () => {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setSvgDropShadow(theme.colors.inverseShadowColor);
      } else {
        setSvgDropShadow(theme.colors.shadowColor);
      }
    }
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listener);

    listener();

    return () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', listener);
  }, []);

  return (
    <>
      {isOpen && <Mask onClick={close} role="button" />}
      <Container>
        <Button onClick={clickButton} type="button" $animate={!didOpen}>
          <span>
            <Icon icon={['fas', 'print']} />
            <DesktopFacingCopy>
              Print
            </DesktopFacingCopy>
          </span>
        </Button>
        {isOpen && (
          <PopUp>
            <Top>
              Do you want to print my resume? Need a PDF?
            </Top>
            <PrintButton onClick={clickPrint}>
              Simply print this page!
              <div>
                (click here)
              </div>
            </PrintButton>
            <Bottom>
              I've found the best version prints from Chrome on macOS.
            </Bottom>
            <Triangle xmlns="http://www.w3.org/2000/svg" viewBox="0,0,80,80">
              <defs>
                <filter id="shadow">
                  <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor={svgDropShadow} />
                </filter>
              </defs>
              <polygon points="0,0 40,40 80,0" style={{ filter: 'url(#shadow)' }} />
            </Triangle>
          </PopUp>
        )}
      </Container>
    </>
  );
};

export default PrintHelper;

const Mask = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Container = styled.div`
  position: fixed;
  right: ${rem(19)};
  bottom: ${rem(19)};

  @media only screen and (min-width: ${rem(966)}) {
    transform: translateX(calc(-50% + ( ${rem(768)} / 2) + ${rem(19 * 2)} + ${rem(83)}));
    right: 50%;
  }

  @media only print {
    display: none;
  }
`;

const DesktopFacingCopy = styled.span`
  display: none;
  margin-left: ${rem(8)};

  @media only screen and (min-width: ${rem(768)}) {
    display: inline;
  }
`;

const PopUp = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${rem(6)};
  bottom: calc(100% + ${rem(20)});
  box-shadow: 0 0 ${rem(5)} ${({ theme }) => theme.colors.shadowColor};
  display: flex;
  min-width: ${rem(500)};
  position: absolute;
  right: 0;
  padding: ${rem(19/2)};
  text-align: center;
  align-items: center;

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.softBlack};
    box-shadow: 0 0 ${rem(5)} ${({ theme }) => theme.colors.inverseShadowColor};
  }

  @media only screen and (min-height: ${rem(400)}) {
    display: block;
    min-width: ${rem(230)};
  }
`;

const Top = styled.p`
margin-bottom: 0;
margin-right: ${rem(16)};

@media only screen and (min-height: ${rem(400)}) {
  margin-bottom: ${rem(16)};
  margin-right: 0;
}
`;

const Bottom = styled.p`
margin-top: 0;
margin-left: ${rem(16)};

@media only screen and (min-height: ${rem(400)}) {
  margin-top: ${rem(16)};
  margin-left: 0;
}
`;

const Triangle = styled.svg`
  position: absolute;
  bottom: initial;
  top: calc(100% - ${rem(1)});
  right: ${rem(3)};
  width: ${rem(30)};
  height: ${rem(30)};

  & > polygon {
    fill: ${({ theme }) => theme.colors.white};
    stroke: ${({ theme }) => theme.colors.white};
    stroke-width: ${rem(2)};

    @media (prefers-color-scheme: dark) {
      fill: ${({ theme }) => theme.colors.softBlack};
      stroke: ${({ theme }) => theme.colors.softBlack};
    }
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: ${({ theme }) => theme.colors.duleoneRed};
  display: inline;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.inverseDuleoneRed};
  }
`;


const PrintButton = styled.button`
  appearance: none;
  -webkit-appearance: none;
  border-width: 0;
  border-radius: 0;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.linkColor};
  font-family: inherit;
  font-size: 100%;
  display: inline;
  padding: ${rem(4)};
  min-width: ${rem(130)};
  margin: 0;
  box-shadow: 0 0 ${rem(3)} ${({ theme }) => theme.colors.shadowColor};
  border-radius: ${rem(6)};
  cursor: pointer;

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.softBlack};
    color: ${({ theme }) => theme.colors.inverseLinkColor};
    box-shadow: 0 0 ${rem(3)} ${({ theme }) => theme.colors.inverseShadowColor};
  }
`;

const Button = styled.button`
  appearance: button;
  -webkit-appearance: button;
  border-color: ${({ theme }) => theme.colors.shadowColor};
  border-width: ${rem(1)};
  border-radius: ${rem(6)};
  background-color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: 100%;
  line-height: 1.15;
  margin: 0;
  cursor: pointer;
  max-width: ${rem(100)};
  animation: bounce 5s;
  animation-iteration-count: ${({ $animate }) => $animate ? 'infinite' : '0'};
  animation-delay: 5s;
  padding: ${rem(8)};

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.softBlack};
    color: ${({ theme }) => theme.colors.softWhite};
    border-color: ${({ theme }) => theme.colors.inverseShadowColor};
  }

  @keyframes bounce {
    0%, 10%, 100% {
      transform: translateY(0);
    }

    5% {
      transform: translateY(${rem(1)});
    }

    1%, 4% {
      transform: translateY(-${rem(3)});
    }

    2%, 3% {
      transform: translateY(-${rem(5)});
    }

    6%, 9% {
      transform: translateY(-${rem(1)});
    }

    8%, 7% {
      transform: translateY(-${rem(2)});
    }
  }
`;
