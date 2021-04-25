import PropTypes from 'prop-types';
import styled from 'styled-components';

const contentShape = {
  screenPrefix: PropTypes.string,
  printPrefix: PropTypes.string,
  href: PropTypes.string,
  hideForPrint: PropTypes.bool,
  copy: PropTypes.string,
};

const ContentPiece = ({ piece }) => {
  const {
    screenPrefix,
    printPrefix,
    href,
    hideForPrint,
    copy,
  } = piece;

  const linkProps = href ? { as: 'a', href, target: '_blank', rel: 'noopener noreferrer' } : {};
  return (
    <Content
      {...linkProps}
      hideForPrint={hideForPrint}
    >
      {screenPrefix && <ScreenPrefix>{screenPrefix}</ScreenPrefix>}
      {printPrefix && <PrintPrefix>{printPrefix}</PrintPrefix>}
      <span dangerouslySetInnerHTML={{ __html: copy }} />
    </Content>
  );
};

ContentPiece.propTypes = {
  piece: PropTypes.shape(contentShape),
};

export const subSectionContentShape = [
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.shape(contentShape)),
];

const Content = styled.div`
  @media only print {
    text-align: left;
    ${({ hideForPrint }) => hideForPrint ? `
    display: none !important;
    visibility: hidden !important;
    ` : ''}
  }
`;

const ScreenPrefix = styled.span`
  margin-right: 4px;

  @media only print {
    display: none !important;
    visibility: hidden !important;
  }
`;

const PrintPrefix = styled.span`
  margin-right: 4px;

  @media only screen {
    display: none !important;
    visibility: hidden !important;
  }

  @media only print {
    display: inline-block !important;
    visibility: visible !important;
  }
`;

const ResumeSubSectionContent = ({ content }) => {
  if (!content) {
    return null;
  }

  if (typeof content === 'string') {
    return (
      <SubSectionContent dangerouslySetInnerHTML={{ __html: content }} />
    );
  }

  const [singularPiece] = content;

  return content.length === 1
    ? (
      <SubSectionContent><ContentPiece piece={singularPiece} /></SubSectionContent>
    )
    : (
      <SubSectionContent as="ul">
        {content.map((piece) => <li key={piece.copy}><ContentPiece piece={piece} /></li>)}
      </SubSectionContent>
    );
};

ResumeSubSectionContent.propTypes = {
  content: PropTypes.oneOfType(subSectionContentShape),
};

export default ResumeSubSectionContent;

const SubSectionContent = styled.div`
  margin-top: 4px;
`;