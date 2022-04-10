import PropTypes from 'prop-types';

import Layout from '~/components/layout';
import Project from '~/components/project';
import projectsData from '~/data/projects';

export const getStaticProps = () => ({
  props: {
    projects: projectsData,
  },
});

const Projects = ({ projects }) => (
  <Layout>
    {projects.map((project) => (
      <Project key={project.title} project={project} />
    ))}
  </Layout>
);

Projects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      href: PropTypes.string,
      repo: PropTypes.string,
      desc: PropTypes.string,
      internal: PropTypes.bool,
      images: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
};

Projects.defaultProps = {
  projects: [],
};

export default Projects;
