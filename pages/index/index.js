import styled from 'styled-components';

import Layout from '../../components/layout';
import Name from '../../components/name';

const Home = () => {
  return (
    <Layout>
      <NameContainer>
        <Name imageWidth={160} />
      </NameContainer>
      <About>
        <AboutLine>Software Engineer.</AboutLine>
        <AboutLine>Mathematician.</AboutLine>
        <AboutLine>Problem Solver.</AboutLine>
      </About>
      <CoatOfArms alt="DuLeone Coat of Arms" src="/images/duleone.jpg" />
    </Layout>
  )
}

export default Home;

const NameContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const About = styled.div`
  padding-top: 48px;
  width: 100%;
  margin: auto;
  text-align: center;
`;

const AboutLine = styled.span`
  &:nth-child(n+1) {
    display: block;

    @media only screen and (min-width: 520px) {
      display: inline-block;
      margin-left: 4px;
    }
  }
`;

const CoatOfArms = styled.img`
  display: block;
  margin: 48px auto 0;
  max-width: 540px;
  width: 100%;
`;
