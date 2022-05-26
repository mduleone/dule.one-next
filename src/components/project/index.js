import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';

import { rem } from '~/util/style/lengths';

const Project = ({
  project: { title, href, repo, desc, internal, images = [] },
}) => {
  let ExternalLinkTag = 'span';
  let projectLinkProps = {};
  if (!internal && href) {
    ExternalLinkTag = 'a';
    projectLinkProps = {
      href,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }

  return (
    <ProjectContainer>
      <ProjectTitleContainer>
        {internal ? (
          <Link href={href} passHref>
            <ProjectTitle>{title}</ProjectTitle>
          </Link>
        ) : (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <ProjectTitle as={ExternalLinkTag} {...projectLinkProps}>
            {title}
          </ProjectTitle>
        )}
      </ProjectTitleContainer>
      {images.length > 0 && (
        <ImagesContainer>
          {images.map(
            (src, i) =>
              internal ? (
                <Link key={src} href={href}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a>
                    <Image
                      src={src}
                      alt={`Screenshot of ${title}${i > 0 ? `-${i}` : ''}`}
                    />
                  </a>
                </Link>
              ) : (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <a key={src} {...projectLinkProps}>
                  <Image
                    src={src}
                    alt={`Screenshot of ${title}${i > 0 ? `-${i}` : ''}`}
                  />
                </a>
              ),
            // eslint-disable-next-line function-paren-newline
          )}
        </ImagesContainer>
      )}
      {/* eslint-disable-next-line react/no-danger */}
      <p dangerouslySetInnerHTML={{ __html: desc }} />
      {repo && (
        <ProjectRepository>
          <a href={repo} target="_blank" rel="noopener noreferrer">
            Repository
          </a>
        </ProjectRepository>
      )}
    </ProjectContainer>
  );
};

Project.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string,
    href: PropTypes.string,
    repo: PropTypes.string,
    desc: PropTypes.string,
    internal: PropTypes.bool,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Project;

const ProjectContainer = styled.div`
  border-radius: ${rem(3)};
  box-shadow: ${rem(5)} ${rem(5)} ${rem(19)}
    ${({ theme }) => theme.colors.shadowColor};
  margin: ${rem(19)};
  padding: ${rem(19)};

  @media (prefers-color-scheme: dark) {
    box-shadow: ${rem(5)} ${rem(5)} ${rem(19)}
      ${({ theme }) => theme.colors.inverseShadowColor};
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
  font-size: ${rem(25)};
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
    height: ${rem(2)};
    transform: scaleX(0);
    background-color: ${({ theme }) => theme.colors.duleoneRed};
    transition: transform linear 250ms;
    transform-origin: right;

    @media (prefers-color-scheme: dark) {
      background-color: ${({ theme }) => theme.colors.inverseDuleoneRed};
    }
  }
`;

const ImagesContainer = styled.div`
  display: flex;
  max-height: ${rem(332)};
  max-width: 100%;
  overflow-x: scroll;
  margin: ${rem(16)} 0;
  padding: ${rem(16)} 0;
`;

const Image = styled.img`
  max-height: ${rem(300)};
  width: auto;
  object-fit: contain;
  display: block;
  box-shadow: 0 0 ${rem(14)} ${({ theme }) => theme.colors.shadowColor};
  border-radius: ${rem(3)};
  margin: 0 ${rem(16)};

  a:not(:first-child) & {
    margin-left: 0;
  }

  @media (prefers-color-scheme: dark) {
    box-shadow: 0 0 ${rem(14)} ${({ theme }) => theme.colors.inverseShadowColor};
  }
`;

const ProjectRepository = styled.p`
  margin-top: ${rem(16)};
`;
