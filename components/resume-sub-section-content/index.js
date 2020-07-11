import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './index.module.scss';

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

  const Tag = href ? 'a' : 'div';
  const linkProps = href ? { target: '_blank', rel: 'noopener noreferrer'} : {};
  return (
    <Tag
      {...linkProps}
      className={cx(styles['subsection-content'], { 'u-no-print': hideForPrint })}
    >
      {screenPrefix && <span className="u-no-print u-mr4">{screenPrefix}</span>}
      {printPrefix && <span className="u-only-print u-mr4">{printPrefix}</span>}
      <span dangerouslySetInnerHTML={{ __html: copy }} />
    </Tag>
  );
};

ContentPiece.propTypes = {
  piece: PropTypes.shape(contentShape),
};

export const subSectionContentShape = [
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.shape(contentShape)),
];

const ResumeSubSectionContent = ({ content }) => {
  if (!content) {
    return null;
  }

  const wrapperClasses = styles['subsection-content-wrapper'];

  if (typeof content === 'string') {
    return (
      <div className={wrapperClasses} dangerouslySetInnerHTML={{ __html: content }} />
    );
  }

  const [singularPiece] = content;

  return content.length === 1
    ? (
      <div className={wrapperClasses}><ContentPiece piece={singularPiece}/></div>
    )
    : (
      <ul className={wrapperClasses}>
        {content.map((piece) => <li key={piece.copy}><ContentPiece piece={piece}/></li>)}
      </ul>
    );
};

ResumeSubSectionContent.propTypes = {
  content: PropTypes.oneOfType(subSectionContentShape),
};

export default ResumeSubSectionContent;
