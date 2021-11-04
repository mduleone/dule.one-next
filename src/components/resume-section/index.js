import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  margin: 0.75em 0;
  text-align: left;

  @media only screen and (min-width: 590px) {
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
    font-size: 12pt;
    display: ${({ $hideForPrint }) => $hideForPrint ? 'none' : 'inherit'};
    visibility: ${({ $hideForPrint }) => $hideForPrint ? 'hidden' : 'inherit'};
    margin-top: ${({ $noPrintTopMargin }) => $noPrintTopMargin ? 0 : '0.75em'};
    margin-bottom: ${({ $noPrintBottomMargin }) => $noPrintBottomMargin ? 0 : '0.75em'};

    &:first-child {
      margin-top: 0.75em;
    }
  }
`;

const SectionTitle = styled.h2`
  background-color: ${({ theme }) => theme.colors.duleoneRed};
  border-radius: 3px;
  color: ${({ theme }) => theme.colors.white};
  display: block;
  font-size: 19px;
  font-weight: normal;
  margin: 0 0 8px 0;
  padding: 4px 8px;

  @media only print {
    font-size: 14pt;
    color: inherit;
    background-color: inherit;
    font-weight: bold;
    border-radius: 0;
    padding: 0;
    margin: 0;
  }
`;

const PrintPrefix = styled.span`
  @media only screen {
    display: none;
    visibility: hidden;
  }

  @media only print {
    margin-right: 4px;
    display: inline-block;
    visibility: visible;
  }
`;
