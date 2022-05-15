import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

import Layout from '~/components/layout';
import projectsData from '~/data/projects';
import { rem } from '~/util/style/lengths';

export const getStaticProps = () => ({
  props: {
    projects: projectsData,
  },
});

const Projects = ({ projects }) => (
  <Layout>
    {projects.map(({
      title, href, repo, desc, internal,
    }) => {
      const titleProps = internal
        ? {}
        : {
          target: '_blank',
          rel: 'noopener noreferrer',
        };

      return (
        <Project key={title}>
          <ProjectTitleContainer>
            <Link href={href} passHref>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              <ProjectTitle {...titleProps}>
                {title}
              </ProjectTitle>
            </Link>
          </ProjectTitleContainer>
          {/* eslint-disable-next-line react/no-danger */}
          <p dangerouslySetInnerHTML={{ __html: desc }} />
          {repo && (
            <ProjectRepository>
              <a href={repo} target="_blank" rel="noopener noreferrer">
                Repository
              </a>
            </ProjectRepository>
          )}
        </Project>
      );
    })}
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
  border-radius: ${rem(3)};
  box-shadow: ${rem(5)} ${rem(5)} ${rem(19)} ${({ theme }) => theme.colors.shadowColor};
  margin:  ${rem(19)};
  padding:  ${rem(19)};

  @media (prefers-color-scheme: dark) {
    box-shadow: ${rem(5)} ${rem(5)} ${rem(19)} ${({ theme }) => theme.colors.inverseShadowColor};
  }

  :last-of-type {
    margin-bottom: ${rem(47.75)};
  }

  @media only print {
    :last-of-type {
      margin-bottom: ${rem(19)};
    }

    page-break-inside: avoid;
  }
`;

const ProjectTitleContainer = styled.p`
  display: block;
  font-size:  ${rem(25)};
  font-weight: bold;
`;

const ProjectTitle = styled.a`
  position: relative;
  color: ${({ theme }) => theme.colors.duleoneRed};

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.inverseDuleoneRed};
  }

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
    height:  ${rem(2)};
    transform: scaleX(0);
    background-color: ${({ theme }) => theme.colors.duleoneRed};
    transition: transform linear 250ms;
    transform-origin: right;

    @media (prefers-color-scheme: dark) {
      background-color: ${({ theme }) => theme.colors.inverseDuleoneRed};
    }
  }
`;

const ProjectRepository = styled.p`
  margin-top:  ${rem(16)};
`;
