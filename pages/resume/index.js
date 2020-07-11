import PropTypes from 'prop-types';

import resume from '../../data/resume.json';
import Layout from '../../components/layout';
import ResumeSection, { sectionShape } from '../../components/resume-section';

export const getStaticProps = async () => {
  return {
    props: {
      resume,
    },
  };
};

const Resume = ({ resume }) => {
  return (
    <Layout>
      {resume.map((section) => <ResumeSection key={section.id} section={section} />)}
    </Layout>
  );
};

Resume.propTypes = {
  resume: PropTypes.arrayOf(PropTypes.shape(sectionShape)),
};

Resume.defaultProps = {};

export default Resume;
