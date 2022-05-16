import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { rem } from '~/util/style/lengths';

const contentShape = {
  screenPrefix: PropTypes.string,
  printPrefix: PropTypes.string,
  href: PropTypes.string,
  hideForPrint: PropTypes.bool,
  copy: PropTypes.string,
};

const ContentPiece = ({ piece }) => {
  const { screenPrefix, printPrefix, href, hideForPrint, copy } = piece;

  const linkProps = href
    ? {
        as: 'a',
        href,
        target: '_blank',
        rel: 'noopener noreferrer',
      }
    : {};
  return (
    <Content
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...linkProps}
      $hideForPrint={hideForPrint}
    >
      {screenPrefix && <ScreenPrefix>{screenPrefix}</ScreenPrefix>}
      {printPrefix && <PrintPrefix>{printPrefix}</PrintPrefix>}
      {/* eslint-disable-next-line react/no-danger */}
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
    ${({ $hideForPrint }) =>
      $hideForPrint &&
      css`
        display: none !important;
        visibility: hidden !important;
      `}
  }
`;

const ScreenPrefix = styled.span`
  margin-right: ${rem(4)};

  @media only print {
    display: none !important;
    visibility: hidden !important;
  }
`;

const PrintPrefix = styled.span`
  display: none !important;
  visibility: hidden !important;

  @media only print {
    margin-right: ${rem(4)};
    display: inline-block !important;
    visibility: visible !important;
  }
`;

const ResumeSubSectionContent = ({ content, hideForPrint }) => {
  if (!content) {
    return null;
  }

  if (typeof content === 'string') {
    return (
      <SubSectionContent
        $hideForPrint={hideForPrint}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  const [singularPiece] = content;

  return content.length === 1 ? (
    <SubSectionContent $hideForPrint={hideForPrint}>
      <ContentPiece piece={singularPiece} />
    </SubSectionContent>
  ) : (
    <SubSectionContent $hideForPrint={hideForPrint} as="ul">
      {content.map((piece) => (
        <li key={piece.copy}>
          <ContentPiece piece={piece} />
        </li>
      ))}
    </SubSectionContent>
  );
};

ResumeSubSectionContent.propTypes = {
  content: PropTypes.oneOfType(subSectionContentShape),
  hideForPrint: PropTypes.bool,
};

export default ResumeSubSectionContent;

const SubSectionContent = styled.div`
  margin-top: ${rem(4)};

  & sup {
    font-size: smaller;
  }

  @media only print {
    ${({ $hideForPrint }) =>
      $hideForPrint &&
      css`
        display: none !important;
        visibility: hidden !important;
      `}
  }
`;
