import PropTypes from 'prop-types';
import cx from 'classnames';
import styled from 'styled-components';

import ResumeSubSectionContent, { subSectionContentShape } from '~/components/resume-sub-section-content';
import { rem } from '~/util/style/lengths';

export const subSectionShape = {
  id: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  displayName: PropTypes.string,
  date: PropTypes.string,
  printHalfWidth: PropTypes.bool,
  hideForPrint: PropTypes.bool,
  hideContentForPrint: PropTypes.bool,
  positions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
  })),
  content: PropTypes.oneOfType(subSectionContentShape),
};

const ResumeSubSection = ({ subsection }) => {
  if (subsection.id === 'spacer') {
    return <SubSectionSpacer />;
  }
  const positions = subsection.positions && (
    (Array.isArray(subsection.positions) && subsection.positions.length > 1)
      ? subsection.positions.map((position) => (
        <div key={`${position.title}-${position.date}`}>
          <PositionTitle $multi dangerouslySetInnerHTML={{ __html: position.title }} />
          <SubSectionDate>{position.date}</SubSectionDate>
        </div>
      ))
      : (
        <PositionTitle dangerouslySetInnerHTML={{ __html: subsection.positions[0].title }} />
      )
  );

  return (
    <SubSection className={cx({ 'print-half': subsection.printHalfWidth, 'no-print': subsection.hideForPrint })}>
      <div>
        {subsection.href
          ? (
            <a href={subsection.href} target="_blank" rel="noopener noreferrer">
              <SubSectionTitle dangerouslySetInnerHTML={{ __html: subsection.displayName }} />
            </a>
          )
          : (
            <SubSectionTitle dangerouslySetInnerHTML={{ __html: subsection.displayName }} />
          )}
        <SubSectionDate $printHalf={subsection.printHalfWidth}>{subsection.date}</SubSectionDate>
        {positions}
        {subsection.content && !subsection.hideContent && (
          <ResumeSubSectionContent hideForPrint={subsection.hideContentForPrint} content={subsection.content} />
        )}
      </div>
    </SubSection>
  );
};

ResumeSubSection.propTypes = {
  subsection: PropTypes.shape(subSectionShape).isRequired,
};

export default ResumeSubSection;

const SubSection = styled.div`
  margin-bottom: ${rem(19 * (3 / 4))};

  &:last-child {
    margin-bottom: 0;
  }

  @media only print {
    page-break-inside: avoid;
    margin-bottom: ${rem(12)};

    &.print-half {
      width: 50% !important;
      display: inline-block;
      max-width: calc(50% - ${rem(8)});

      &:nth-child(odd) {
        vertical-align: top;
        margin-left: ${rem(16)};
      }
    }

    &.no-print {
      display: none !important;
      visibility: hidden !important;
    }
  }
`;

const SubSectionTitle = styled.h3`
  font-weight: bold;
  font-size: ${rem(19)};
  margin: 0;
  display: inline-block;

  @media only print {
    font-size: ${rem(16)};
  }
`;

const SubSectionDate = styled.time`
  font-size: ${rem(16)};
  color: ${({ theme }) => theme.colors.duleoneRed};
  display: block;

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.inverseDuleoneRed};
  }

  @media (min-width: ${rem(590)}) {
    float: right;
    vertical-align: top;
  }

  @media only print {
    font-size: ${rem(12)};
    float: ${({ $printHalf }) => ($printHalf ? 'none' : 'right')};
  }
`;

const PositionTitle = styled.h4`
  display: ${({ $multi }) => ($multi ? 'inline-block' : 'block')};
  font-style: italic;
  font-weight: normal;
  font-size:  ${rem(19)};
  margin: 0;
  vertical-align: top;

  @media only print {
    font-size: ${rem(16)};
  }
`;

const SubSectionSpacer = styled.div`
  display: none;
  visibility: hidden;
`;
