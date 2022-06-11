import styled from 'styled-components';
import NextImage from 'next-image-export-optimizer';

import Layout from '~/components/layout';
import Name from '~/components/name';
import { rem } from '~/util/style/lengths';

const Home = () => (
  <Layout>
    <NameContainer>
      <Name imageWidth={160} />
    </NameContainer>
    <About>
      <AboutLine>Software Engineer.</AboutLine>
      <AboutLine>Mathematician.</AboutLine>
      <AboutLine>Problem Solver.</AboutLine>
    </About>
    <CoatOfArms>
      <NextImage
        layout="responsive"
        alt="DuLeone Coat of Arms"
        src="/images/duleone-big.jpg"
        width={1970}
        height={1650}
      />
    </CoatOfArms>
  </Layout>
);

export default Home;

const NameContainer = styled.div`
  display: none;
  justify-content: center;

  @media only screen and (min-width: ${rem(768)}) {
    display: flex;
  }
`;

const About = styled.div`
  padding-top: ${rem(48)};
  width: 100%;
  margin: auto;
  text-align: center;
`;

const AboutLine = styled.span`
  &:nth-child(n + 1) {
    display: block;

    @media only screen and (min-width: ${rem(590)}) {
      display: inline-block;
      margin-left: ${rem(4)};
    }
  }
`;

const CoatOfArms = styled.div`
  display: block;
  margin: ${rem(48)} auto 0;
  max-width: ${rem(540)};
  width: 100%;

  img {
    border-radius: 35%;
  }

  @media only screen and (min-width: ${rem(768)}) {
    margin: ${rem(32)} auto 0;
  }
`;
