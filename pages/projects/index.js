import PropTypes from 'prop-types';

import Layout from '../../components/layout';
import projects from '../../data/projects';
import styles from './index.module.scss';

export const getStaticProps = () => ({
  props: {
    projects,
  },
});

const Projects = ({ projects }) => (
  <Layout>
    {projects.map(({ title, href, repo, desc }) => (
      <div className={styles['project']}>
        <p className={styles['project-title']}>
          <a href={href} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </p>
        <p className={styles['project-description']} dangerouslySetInnerHTML={{ __html: desc }} />
        {repo && (
          <p className={styles['project-repository']}>
            <a href={repo}>
              Repository
            </a>
          </p>
        )}
      </div>
    ))}
  </Layout>
);

Projects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string,
    repo: PropTypes.string,
    desc: PropTypes.string,
  })),
};

Projects.defaultProps = {
  projects: [],
};


export default Projects;
