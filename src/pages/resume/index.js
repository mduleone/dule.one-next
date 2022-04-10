import PropTypes from 'prop-types';
import styled from 'styled-components';

import resume from '../../data/resume';
import Layout from '../../components/layout';
import PrintHelper from '../../components/print-helper';
import ResumeSection, { sectionShape } from '../../components/resume-section';

export const getStaticProps = () => ({
  props: {
    resume,
  },
});

const Resume = ({ resume }) => (
  <Layout>
    <ScreenFlex>
      {resume.map((section) => <ResumeSection key={section.id} section={section} />)}
    </ScreenFlex>
    <PrintHelper />
  </Layout>
);

Resume.propTypes = {
  resume: PropTypes.arrayOf(PropTypes.shape(sectionShape)),
};

Resume.defaultProps = {};

export default Resume;

const ScreenFlex = styled.div`
  @media only screen {
    display: flex;
    flex-direction: column;
  }
`;
