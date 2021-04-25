import PropTypes from 'prop-types';
import cx from 'classnames';
import styled from 'styled-components';

import ResumeSubSectionContent, { subSectionContentShape } from '../resume-sub-section-content';

export const subSectionShape = {
  id: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  displayName: PropTypes.string,
  date: PropTypes.string,
  printHalfWidth: PropTypes.bool,
  hideForPrint: PropTypes.bool,
  positions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
  })),
  content: PropTypes.oneOfType(subSectionContentShape),
};

const ResumeSubSection = ({ subsection }) => {
  const positions = subsection.positions && (
    (Array.isArray(subsection.positions) && subsection.positions.length > 1)
      ? subsection.positions.map((position) => (
        <div key={`${position.title}-${position.date}`}>
          <PositionTitle multi dangerouslySetInnerHTML={{ __html: position.title }} />
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
          )
        }
        <SubSectionDate block={subsection.printHalfWidth}>{subsection.date}</SubSectionDate>
        {positions}
        <ResumeSubSectionContent content={subsection.content} />
      </div>
    </SubSection>
  );
};

ResumeSubSection.propTypes = {
  subsection: PropTypes.shape(subSectionShape).isRequired,
};

export default ResumeSubSection;

const SubSection = styled.div`
  margin-bottom: 0.75em;

  @media only print {
    page-break-inside: avoid;

    &.print-half {
      width: 50% !important;
      display: inline-block;

      & + & {
        display: inline-block;
        vertical-align: top;
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
  font-size: 19px;
  margin: 0;
  display: inline-block;

  @media only print {
    font-size: 13pt;
  }
`;

const SubSectionDate = styled.time`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.duleoneRed};
  display: block;

  @media (min-width: 590px) {
    float: ${({ block }) => block ? 'none' : 'right'};
    vertical-align: top;
  }

  @media only print {
    font-size: 9pt;
    float: ${({ block }) => block ? 'none' : 'right'};
  }
`;

const PositionTitle = styled.h4`
  display: ${({ multi }) => multi ? 'inline-block' : 'block'};
  font-style: italic;
  font-weight: normal;
  font-size: 19px;
  margin: 0;
  vertical-align: top;

  @media only print {
    font-size: 13pt;
  }
`;
