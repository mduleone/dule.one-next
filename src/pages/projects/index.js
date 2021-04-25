import PropTypes from 'prop-types';
import styled from 'styled-components';

import Layout from '../../components/layout';
import projects from '../../data/projects';

export const getStaticProps = () => ({
  props: {
    projects,
  },
});

const Projects = ({ projects }) => (
  <Layout>
    {projects.map(({ title, href, repo, desc }) => (
      <Project key={title}>
        <ProjectTitleContainer>
          <ProjectTitle href={href} target="_blank" rel="noopener noreferrer">
            {title}
          </ProjectTitle>
        </ProjectTitleContainer>
        <p dangerouslySetInnerHTML={{ __html: desc }} />
        {repo && (
          <ProjectRepository>
            <a href={repo} target="_blank" rel="noopener noreferrer">
              Repository
            </a>
          </ProjectRepository>
        )}
      </Project>
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

const Project = styled.div`
  border-radius: 3px;
  box-shadow: 5px 5px 1em ${({ theme }) => theme.colors.shadowColor};
  margin: 1em;
  padding: 1em;

  @media only print {
    page-break-inside: avoid;
  }
`;

const ProjectTitleContainer = styled.p`
  display: block;
  font-size: 25px;
  font-weight: bold;
`;

const ProjectTitle = styled.a`
  position: relative;
  color: ${({ theme }) => theme.colors.duleoneRed};

  &:hover,
  &:focus {
    &::after {
      transform: scaleX(1);
      transition: transform linear 250ms;
      transform-origin: left;
    }
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    transform: scaleX(0);
    background-color: ${({ theme }) => theme.colors.duleoneRed};
    transition: transform linear 250ms;
    transform-origin: right;
  }
`;

const ProjectRepository = styled.p`
  margin-top: 16px;
`;
