import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled, { css, keyframes } from 'styled-components';
import NextImage from 'next-image-export-optimizer';

import { rem } from '~/util/style/lengths';
import PlayingCard from '~/components/playing-card';

const TIMEOUT = 1000;

const SplashScreen = () => {
  const [hideSplash, setHideSplash] = useState(false);
  const [removeSplash, setRemoveSplash] = useState(false);
  const { isReady } = useRouter();

  useEffect(() => {
    if (isReady) {
      setHideSplash(true);
      setTimeout(() => setRemoveSplash(true), TIMEOUT);
    }
  }, [isReady]);

  return (
    !removeSplash && (
      <SplashContainer $fadeOut={hideSplash}>
        <Header>
          <CoatOfArms>
            <NextImage
              layout="responsive"
              alt="DuLeone Coat of Arms"
              src="/images/duleone.jpg"
              width={1970}
              height={1650}
            />
          </CoatOfArms>
          <Flex>
            <Div>Blackjack</Div>
            <Div>Gameplay & Count</Div>
            <Div>Training</Div>
          </Flex>
          <CoatOfArms>
            <NextImage
              layout="responsive"
              alt="DuLeone Coat of Arms"
              src="/images/duleone.jpg"
              width={1970}
              height={1650}
            />
          </CoatOfArms>
        </Header>
        <BlackjackContainer>
          <CardContainer>
            <PlayingCard card="Jc" />
          </CardContainer>
          <CardContainer>
            <PlayingCard card="Ad" />
          </CardContainer>
        </BlackjackContainer>
      </SplashContainer>
    )
  );
};

export default SplashScreen;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    display: none;
  }
`;

const SplashContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: ${rem(6)};
  border: ${rem(1)} ${({ theme }) => theme.colors.black} solid;
  padding: ${rem(16)};
  ${({ $fadeOut }) =>
    $fadeOut &&
    css`
      animation: ${fadeOut} 250ms linear ${TIMEOUT - 250}ms forwards;
    `};

  @media (prefers-color-scheme: dark) {
    background-color: ${({ theme }) => theme.colors.softBlack};
    border-color: ${({ theme }) => theme.colors.softWhite};
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  width: 100%;

  @media only screen and (min-width: ${rem(768)}) {
    padding-top: ${rem(48)};
  }
`;

const Flex = styled.h2`
  text-align: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Div = styled.div`
  font-size: ${rem(20)};

  @media only screen and (min-width: ${rem(442)}) {
    font-size: ${rem(24)};
  }

  @media only screen and (min-width: ${rem(768)}) {
    font-size: ${rem(30)};
  }
`;

const CoatOfArms = styled.div`
  display: block;
  max-width: ${rem(540)};
  width: 50%;

  img {
    border-radius: 35%;
  }
`;

const BlackjackContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: ${rem(48)} 0;
  transform: translateX(-50%);
  left: 50%;
`;

const CardContainer = styled.div`
  width: ${rem(160)};
  display: inline-block;
  position: relative;
  z-index: 1;
  transform: rotate(0);

  @media only screen and (min-width: ${rem(364)}) {
    width: ${rem(175)};
  }

  @media only screen and (min-width: ${rem(364)}) {
    width: ${rem(225)};
  }

  :last-child {
    position: absolute;
    transform: rotate(-20deg);
    left: 0;
    z-index: 0;
  }
`;
