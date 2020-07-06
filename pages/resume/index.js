import cx from 'classnames';
import PropTypes from 'prop-types';

import resume from '../../data/resume.json';
import Layout from '../../components/layout';

import styles from './index.module.scss';

export const getStaticProps = async () => {
  return {
    props: {
      resume,
    },
  };
};

const subSectionContentShape = [
  PropTypes.string,
  PropTypes.arrayOf(PropTypes.shape({
    screenPrefix: PropTypes.string,
    printPrefix: PropTypes.string,
    href: PropTypes.string,
    hideForPrint: PropTypes.bool,
    copy: PropTypes.string,
  })),
];

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

const ResumeSubSectionContent = ({ content }) => {
  if (!content) {
    return null;
  }

  if (typeof content === 'string') {
    return (
     <div className={styles['subsection-content-wrapper']} dangerouslySetInnerHTML={{ __html: content }} />
    );
  }

  const [singularPiece] = content;

  return content.length === 1
    ? (
      <div className={styles['subsection-content-wrapper']}><ContentPiece piece={singularPiece}/></div>
    )
    : (
      <ul className={styles['subsection-content-wrapper']}>
        {content.map((piece) => <li key={piece.copy}><ContentPiece piece={piece}/></li>)}
      </ul>
    );
};

ResumeSubSectionContent.propTypes = {
  content: PropTypes.oneOfType(subSectionContentShape),
};

const subSectionShape = {
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
        <div>
          <h4 className={cx('u-inline-block', styles['subsection-position-title'])} dangerouslySetInnerHTML={{ __html: position.title }} />
          <time className={styles['subsection-date']}>{position.date}</time>
        </div>
      ))
      : (
        <h4
          className={styles['subsection-position-title']}
          dangerouslySetInnerHTML={{ __html: subsection.positions[0].title }}
        />
      )
  );

  return (
    <div className={cx(styles.subsection, { 'u-print-half': subsection.printHalfWidth, 'u-no-print': subsection.hideForPrint })}>
      <div className={styles['subsection-heading']}>
        {subsection.href
          ? (
            <a href={subsection.href} target="_blank" rel="noopener noreferrer">
              <h3
                dangerouslySetInnerHTML={{ __html: subsection.displayName }}
                className={styles['subsection-title']}
              />
            </a>
          )
          : (
            <h3
              dangerouslySetInnerHTML={{ __html: subsection.displayName }}
              className={styles['subsection-title']}
            />
          )
        }
        <time className={cx(styles['subsection-date'], { [styles['subsection-date-block']]: subsection.printHalfWidth })}>{subsection.date}</time>
        {positions}
        <ResumeSubSectionContent content={subsection.content} />
      </div>
    </div>
  );
};

ResumeSubSection.propTypes = {
  subsection: PropTypes.shape(subSectionShape).isRequired,
};

const sectionShape = {
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
};

const ResumeSection = ({ section }) => {
  const sectionContent = Array.isArray(section.content)
    ? section.content.map((content) => {
      return (
        <div>
          {content.screenPrefix && (<span className="u-no-print u-mr4">{content.screenPrefix}</span>)}
          <span dangerouslySetInnerHTML={content.copy} />
        </div>
      )
    })
    : (
      <div dangerouslySetInnerHTML={{ __html: section.content }} />
    );

  return (
    <div className={cx(styles.section, { 'u-no-print': section.hideForPrint })}>
      <h2 className={styles['section-title']}>
        {section.printPrefix && (
          <span className="u-only-print u-mr4 u-inline-block">
            {section.printPrefix}
          </span>
        )}
        {section.title}
      </h2>
      {sectionContent}
      {(section.subSections && section.subSections.length > 0) && (
        section.subSections.map((subsection) => <ResumeSubSection subsection={subsection} />)
      )}
    </div>
  )
};

ResumeSection.propTypes = {
  section: PropTypes.shape(sectionShape).isRequired,
};

const Resume = ({ resume }) => {
  return (
    <Layout>
      <div className={styles.container}>
        {resume.map((section) => <ResumeSection key={section.id} section={section} />)}
      </div>
    </Layout>
  );
};

Resume.propTypes = {
  resume: PropTypes.arrayOf(PropTypes.shape(sectionShape)),
};

Resume.defaultProps = {};

export default Resume;
