import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rem } from '../../util/style/lengths';

import ResumeSubSection, { subSectionShape } from '../resume-sub-section';

export const sectionShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
    }),
  ]),
  subSections: PropTypes.arrayOf(PropTypes.shape(subSectionShape)),
  hideForPrint: PropTypes.bool,
  webOrder: PropTypes.number,
};

const ResumeSection = ({ section }) => (
  <Section
    $hideForPrint={section.hideForPrint}
    $noPrintTopMargin={section.noPrintTopMargin}
    $noPrintBottomMargin={section.noPrintBottomMargin}
    $webOrder={section.webOrder}
  >
    <SectionTitle>
      {section.printPrefix && (
        <PrintPrefix>
          {section.printPrefix}
        </PrintPrefix>
      )}
      {section.title}
    </SectionTitle>
    <div dangerouslySetInnerHTML={{ __html: section.content }} />
    {(section.subSections && section.subSections.length > 0) && (
      section.subSections.map((subsection) => <ResumeSubSection key={subsection.id} subsection={subsection} />)
    )}
  </Section>
);

ResumeSection.propTypes = {
  section: PropTypes.shape(sectionShape).isRequired,
};

export default ResumeSection;

const Section = styled.div`
  margin: ${rem(19 * (3/4))} 0;
  text-align: left;

  @media only screen and (min-width: ${rem(590)}) {
    text-align: justify;
  }

  &:first-child {
    margin-top: 0;
  }

  @media only screen {
    order: ${({ $webOrder }) => $webOrder};
  }

  @media only print {
    text-align: justify;
    font-size: ${rem(16)};
    display: ${({ $hideForPrint }) => $hideForPrint ? 'none' : 'inherit'};
    visibility: ${({ $hideForPrint }) => $hideForPrint ? 'hidden' : 'inherit'};
    margin-top: ${({ $noPrintTopMargin }) => $noPrintTopMargin ? 0 : rem(12)};
    margin-right: 0;
    margin-bottom: ${({ $noPrintBottomMargin }) => $noPrintBottomMargin ? 0 : rem(12)};
    margin-left: 0;
    // @TODO: Remove when putting Care/of content back
    break-inside: avoid;

    &:first-child {
      margin-top: ${rem(12)};
    }
  }
`;

const SectionTitle = styled.h2`
  background-color: ${({ theme }) => theme.colors.duleoneRed};
  border-radius: ${rem(3)};
  color: ${({ theme }) => theme.colors.white};
  display: block;
  font-size: ${rem(19)};
  font-weight: normal;
  margin: 0 0 ${rem(8)} 0;
  padding: ${rem(4)} ${rem(8)};

  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.colors.white};
  }

  @media only print {
    font-size: ${rem(56/3)};
    color: inherit;
    background-color: inherit;
    font-weight: bold;
    border-radius: 0;
    padding: 0;
    margin: 0;

    & * {
      font-size: ${rem(56/3)};
    }
  }
`;

const PrintPrefix = styled.span`
  @media only screen {
    display: none;
    visibility: hidden;
  }

  @media only print {
    margin-right: ${rem(4)};
    display: inline-block;
    visibility: visible;
  }
`;
